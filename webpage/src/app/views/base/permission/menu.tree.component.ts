// system
import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { TreeModule, TreeNode } from 'primeng/primeng';

// service
import { PermissionService } from './permission.service';

// model
import { LoadMsg } from '../../../model/load-msg';
import { ReturnCode } from '../../../model/returnCode';
import { Permission } from '../permission/model/permission';
import { Result } from '../../../model/result';
import { Menu } from './model/menu';

@Component({
    selector: 'app-menu-tree',
    template: `
    <div *ngIf="!loadMenuTree.loaded">
        {{loadMenuTree.message}}
    </div>
    <p-tree
    *ngIf="loadMenuTree.loaded"
    [value]="menuTree"
    selectionMode="checkbox"
    [(selection)]="selectedNodes"
    (onNodeSelect)="nodeChange()"
    (onNodeUnselect)="nodeChange()"
    >
    </p-tree>
    `
})
export class MenuTreeComponent implements OnInit {

    /** 加载信息 */
    loadMenuTree = new LoadMsg(false, '正在加载菜单信息');

    @Input()
    menuTree: TreeNode[] = []; // 菜单树
    @Output()
    menuTreeChange = new EventEmitter<TreeNode[]>();

    @Input()
    selectedNodes: TreeNode[]; // 选择的菜单节点
    @Output()
    selectedNodesChange = new EventEmitter<TreeNode[]>();

    @Output()
    onTreeLoaded = new EventEmitter<TreeNode[]>(); // 机构数数据加载完成事件

    constructor(
        private permissionService: PermissionService
    ) { }

    ngOnInit(): void {
        this.initMenus();
    }

    nodeChange(): void {
        this.selectedNodesChange.emit(this.selectedNodes);
    }

    private initMenus(): void {
        this.permissionService.getPermissions()
            .then(result => {
                const returnCode: ReturnCode = result.returnCode;
                if (returnCode.code === '0000') {
                    const permissions: Permission[] = result.data;
                    for (const permission of permissions) {
                        const menu = this.createPermissionTree(permission);
                        this.menuTree.push(menu);
                    }
                    this.loadMenuTree.loaded = true;

                    // 事件处理
                    this.menuTreeChange.emit(this.menuTree);
                    this.onTreeLoaded.emit();
                } else {
                    this.loadMenuTree.loaded = false;
                    this.loadMenuTree.message = returnCode.message;
                }
            })
            .catch(error => {
                this.loadMenuTree.loaded = false;
                this.loadMenuTree.message = '获取菜单发生异常';
            })
            ;
    }

    private createPermissionTree(permission: Permission): Menu {
        const menu = this.createPermissionNode(permission);
        const children = permission.children;
        if (children) {
            for (const child of children) {
                const childMenu = this.createPermissionTree(child);
                menu.children.push(childMenu);
            }
        }
        return menu;
    }

    private createPermissionNode(permission: Permission): Menu {
        const menu = new Menu();
        menu.label = permission.name;
        menu.data = permission;
        return menu;
    }
}
