// system
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TreeModule, TreeNode } from 'primeng/primeng';

// component

// service
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { StorageService } from '../../../providers/storage.service';

// model
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { Role } from './model/role';
import { RoleParams } from './model/role.params';
import { RoleService } from './role.service';
import { Page } from '../page/model/page';

@Component({
  selector: 'app-role-list',
  templateUrl: 'role.list.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class RoleListComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgRoleGrid = new LoadMsg(false, '正在加载角色列表');

  ''
  private roleParam: RoleParams = new RoleParams(); // 过滤条件

  @Input()
  private selectedRole: Role; // 选择的角色
  private roles: Role[]; // 角色列表
  private pageParams: Page = new Page();
  private buttons: string[] = []; // 权限按钮id数组

  constructor(private router: Router,
    private roleService: RoleService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();

  }

  ngOnInit() {
    this.query();
  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.selectedRole = null; // 清空选中项
    this.roleService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.roleParam)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.roles = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
        } else {
          console.log(returnCode.message);
        }
      })
  }

  recordCheck(role) {
    this.selectedRole = role;
  }

  goUpdate() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.router.navigate(['/base/role/update', me.selectedRole.id]);
    }
  }

  delete(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.messageService.confirm('', '确认删除?', function (dialog) {
        me.roleService.delete(me.selectedRole.id)
          .then(result => {
            dialog.close();
            if (result.returnCode.code === '0000') {
              me.messageService.alert('', '删除成功');
              me.query();
            } else {
              me.messageService.alert('', result.returnCode.message);
            }
          })
          .catch(error => {
            dialog.close();
            me.messageService.alert('', '删除发生异常');
          });
      });
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedRole) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedRole.lockup = !me.selectedRole.lockup;
    me.roleService.lockup(me.selectedRole)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedRole.lockup = !me.selectedRole.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedRole.lockup = !me.selectedRole.lockup;

      });
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedRole) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedRole.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
