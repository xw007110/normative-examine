// system
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { TreeModule, TreeNode } from 'primeng/primeng';


// model
import { LoadMsg } from '../../../model/load-msg';
import { Role } from './model/role';
import { Permission } from '../permission/model/permission';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

// service
import { RoleService } from './role.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

@Component({
  templateUrl: 'role.update.component.html'
})
export class RoleUpdateComponent implements OnInit {

  @Input()
  private role = new Role();

  menuTree: TreeNode[] = []; // 所有树节点
  selectedNodes: TreeNode[] = []; // 选择的菜单节点

  constructor(private router: Router,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private messageService: MessageModalService
  ) {
  }

  ngOnInit() {
  }

  onTreeLoaded(): void {
    // 1.所有菜单加载完成 onTreeLoaded
    // 2.加载角色信息
    const id = this.route.snapshot.paramMap.get('id')
    this.roleService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.role = result.data;
          const permissions: Permission[] = this.role.permissions;
          const listNodes: TreeNode[] = [];
          this.convertNodes2List(this.menuTree, listNodes);

          for (const permission of permissions){
            const node = this.getNode(listNodes, permission.id
            );
            if (node) {
              this.selectedNodes.push(node);
            }
          }
        } else {
          console.log(returnCode.message);
        }
      })
  }

  private initSelectedNode(permissionId: string): void {

  }

  private convertNodes2List(treeNodes: TreeNode[], listNodes: TreeNode[]): void {
      for (const treeNode of treeNodes) {
        listNodes.push(treeNode);
        if (treeNode.children) {
          this.convertNodes2List(treeNode.children, listNodes);
        }
      }
  }

  private getNode(listNodes: TreeNode[], permissionId: string): TreeNode {
    for (const treeNode of listNodes) {
      if (treeNode.data.id === permissionId) {
        return treeNode;
      }
    }
  }

  public doUpdate() {
    const permissions: Permission[] = [];
    // 先将选中的菜单放入 menus
    for (const node of this.selectedNodes) {
      permissions.push(node.data);
    }
    // 判断选中的菜单中，它们的父菜单是否也选中
    // 在没有全选的情况下，selectedNodes不包含父菜单
    for (const node of this.selectedNodes) {
      const parentNode = node.parent;
      if (parentNode) {
        const parentPermission: Permission = parentNode.data;
        let hasParent = false;
        for (const permission of permissions) {
          if (permission.id === parentPermission.id) {
            hasParent = true;
            break;
          }
        }
        if (!hasParent) {
          permissions.push(parentPermission);
        }
      }
    }
    if(!this.role.name) {
      this.messageService.alert('', '角色名称不能为空');
    }else{
      this.roleService.update(this.role, permissions)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.messageService.alert('', returnCode.message);
          this.router.navigate(['/base/role/list']);
        } else {
          this.messageService.alert('', returnCode.message);
        }
      })
      .catch(error => {
        this.messageService.alert('', '角色修改发生异常');
      })
    }
    
  }

  reset(){
    const me = this;
    me.role.name = "";
    me.role.remark = "";
    me.selectedNodes = [];
  }
}

