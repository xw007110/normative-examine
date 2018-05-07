// system
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

// component
import { RoleSelectModalComponent } from '../../zjModal/roleSelectModal/roleSelectModal.component';

// service
import { AdminService } from './admin.service';
import { RoleService } from '../role/role.service';
import { OrganizationService } from '../organization/organization.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { StorageService } from '../../../providers/storage.service';

// model
import { LoadMsg } from '../../../model/load-msg';
import { ReturnCode } from '../../../model/returnCode';
import { Admin } from './model/admin';
import { AdminParams } from './model/admin.params';
import { Page } from '../page/model/page';
import { RoleParams } from '../role/model/role.params';
import { OrganizationSource } from '../organization/model/organization-source.enum';


@Component({
  templateUrl: 'admin.list.component.html',
  styleUrls: ['../org.hidden.css']
})
export class AdminListComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志


  /** 加载信息 */
  private loadMsgAdminGrid = new LoadMsg(false, '正在加载用户列表');

  /** 人员表格 */
  private adminParams: AdminParams = new AdminParams(); // 人员过滤条件
  private seletedAdmin: Admin; // 选中的人员列表
  private admins: Admin[]; // 人员列表
  private pageParams: Page = new Page(); // 分页信息
  private buttons: string[] = []; // 权限按钮id数组
  private orgType: string; // 机构类型
  constructor(private router: Router,
    private adminService: AdminService,
    private roleService: RoleService,
    private orgService: OrganizationService,
    private messageService: MessageModalService,
    private modalService: BsModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
    this.orgType = OrganizationSource.Operate; // 运管
  }

  ngOnInit() {
    this.query();
  }

  // 点击机构树查询
  queryOrgList(id) {
    this.adminParams.organizationId = id;
    this.query();
  }

  query() {
    this.seletedAdmin = null; // 清空选中项
    this.loadMsgAdminGrid.loaded = false;
    this.adminService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.adminParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.admins = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgAdminGrid.loaded = true;
        } else {
          this.loadMsgAdminGrid.message = returnCode.message;
          this.loadMsgAdminGrid.loaded = false;
        }
      })
      .catch(error => {
        this.loadMsgAdminGrid.loaded = false;
        this.loadMsgAdminGrid.message = '用户列表查询失败';
      });

  }

  recordCheck(admin) {
    this.seletedAdmin = admin;
  }

  goResetPwd() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/base/admin/updatePwd', me.seletedAdmin.id]);
    }
  }


  delete(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.messageService.confirm('', '确认删除?', function (dialog) {
        me.adminService.delete(me.seletedAdmin.id)
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

  authorization(): void {
    const me = this;
    if (me.judge()) {
      const bsModalRef: BsModalRef = this.modalService.show(RoleSelectModalComponent, { class: 'modal-lg' });
      const componet: RoleSelectModalComponent = bsModalRef.content;
      // 获取所有角色,组织复选框状态
      const roleRarams = new RoleParams();
      this.roleService.list(roleRarams)
        .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            const allRoles = result.data; // 所有角色
            // 获取用户已有的角色
            this.adminService.getRoles(this.seletedAdmin.id, false)
              .then(selectedResult => {
                const selectedReturnCode: ReturnCode = selectedResult.returnCode;
                if (selectedReturnCode.code === '0000') {
                  const selectedRoles = selectedResult.data; // 已有的角色
                  // 从所有角色中，
                  for (const role of allRoles) {
                    // 先将复选框设置为不选中
                    role.checked = false;
                    for (const selectedRole of selectedRoles) {
                      if (role.id === selectedRole.id) {
                        role.checked = true;
                        // 将已有的角色绑定到app-role-all的selectedRoles上
                        componet.selectedRoles.push(role);
                        break;
                      }
                    }
                  }
                }
                // 将所有的角色绑定到app-role-all的allRoles上
                componet.allRoles = allRoles;
              });
          }
        })
        .catch(error => {
        })
        ;

      componet.action.ok = function () {
        const roles = componet.selectedRoles;
        if (!roles || roles.length === 0) {
          me.messageService.alert('', '请至少选择一个角色');
        } else {
          for (let i = 0; i < roles.length; i++) {
            if (!roles[i].lockup) {
              me.messageService.alert('', roles[i].name + ' 未锁定,请前往角色模块进行锁定！');
              return;
            }
          }
          me.adminService.authorization(me.seletedAdmin, roles)
            .then(result => {
              componet.close();
              const returnCode: ReturnCode = result.returnCode;
              if (returnCode.code === '0000') {
                me.messageService.alert('', '授权成功');
              } else {
                me.messageService.alert('', returnCode.message);
              }
            })
            .catch(error => {
              componet.close();
              me.messageService.alert('', '授权异常');
            })
            ;
        }
      }
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.seletedAdmin) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.seletedAdmin.lockup = !me.seletedAdmin.lockup;
    me.adminService.lockup(me.seletedAdmin)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.seletedAdmin.lockup = !me.seletedAdmin.lockup;
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.seletedAdmin.lockup = !me.seletedAdmin.lockup;

      });
  }

  forbidden(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.seletedAdmin.forbidden = !me.seletedAdmin.forbidden;
      me.adminService.forbidden(me.seletedAdmin)
        .then(result => {

          if (result.returnCode.code === '0000') {

            me.messageService.alert('', '操作成功');
            //me.query();
          } else {
            me.seletedAdmin.forbidden = !me.seletedAdmin.forbidden;
            me.messageService.alert('', result.returnCode.message);
          }
        })
        .catch(error => {
          me.messageService.alert('', '操作发生异常');
        });
    }

  }

  goUpdate() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.router.navigate(['/base/admin/update', me.seletedAdmin.id]);
    }
  }
  // 操作判断
  judge() {
    const me = this;
    if (!me.seletedAdmin) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.seletedAdmin.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
