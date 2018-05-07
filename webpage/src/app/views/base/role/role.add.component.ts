// system
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// component
import {MenuTreeComponent} from '../permission/menu.tree.component';

// service
import {RoleService} from './role.service';
import {PermissionService} from '../permission/permission.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {LoadMsg} from '../../../model/load-msg';
import {ReturnCode} from '../../../model/returnCode';
import {Role} from './model/role';
import {Result} from '../../../model/result';
import {Permission} from '../permission/model/permission';
import {Menu} from '../permission/model/menu';
import {Organization} from '../organization/model/organization';


@Component({
  templateUrl: 'role.add.component.html',
})
export class RoleAddComponent implements OnInit {
  public form: FormGroup;

  @Input()
  role = new Role();

  menuTree: TreeNode[] = []; // 所有树节点
  selectedNodes: TreeNode[] = []; // 选择的菜单节点

  constructor(private router: Router,
              private roleService: RoleService,
              private permissionService: PermissionService,
              private messageService: MessageModalService,
              public fb: FormBuilder) {
    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      remark: ['']
    });
  }

  ngOnInit(): void {
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

  public doAdd({value, valid}: { value: Role, valid: boolean }) {
    if (!this.selectedNodes || this.selectedNodes.length === 0) {
      this.messageService.alert('', '请选择菜单');
      return;
    }
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
    this.roleService.add(value, permissions)
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
        this.messageService.alert('', '角色新增发生异常');
      })
    ;
  }

  reset(){
    const me = this;
    me.form.reset();
    me.selectedNodes = [];
  }
}

