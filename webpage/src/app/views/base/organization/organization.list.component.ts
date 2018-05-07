// system
import {Component, OnInit, Input} from '@angular/core';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {Router} from '@angular/router';


// service
import {OrganizationService} from './organization.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
import {StorageService} from '../../../providers/storage.service';
// model
import {LoadMsg} from '../../../model/load-msg';
import {Organization} from './model/organization';
import {OrganizationParams} from './model/organization.params';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {Page} from '../page/model/page';
import {OrganizationSource} from './model/organization-source.enum';

@Component({
  templateUrl: 'organization.list.component.html',
  styleUrls: ['../org.hidden.css']
})
export class OrganizationListComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载机构列表');

  private organizations: Organization[] = []; // 表格数据
  private seletedOrg: Organization;  // 表格中选中的机构记录
  private orgParams: OrganizationParams = new OrganizationParams();  // 机构过滤参数
  private pageParams: Page = new Page();
  private buttons: string[] = []; // 权限按钮id数组
  private toasterService: ToasterService;
  private orgType: string; // 机构类型
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private router: Router,
              private organizationService: OrganizationService,
              toasterService: ToasterService,
              private orgService: OrganizationService,
              private messageService: MessageModalService,
              private storageService: StorageService) {
    this.toasterService = toasterService;
    this.buttons = this.storageService.getButtons();
    this.orgType = OrganizationSource.Operate; // 运管
  }


  ngOnInit() {
    // this.initOrgRoot();
    this.orgParams.parentId = 'root';
    this.query();
  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  // 点击机构树查询
  queryOrgList(id) {
    this.orgParams.parentId = id;
    this.query();
  }

  query() {
    this.loadMsgOrgGrid.loaded = false;
    this.orgParams.type = OrganizationSource.Operate;

    this.organizationService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.orgParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.organizations = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgOrgGrid.loaded = true;
        } else {
          this.loadMsgOrgGrid.loaded = false;
          this.loadMsgOrgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgOrgGrid.loaded = false;
        this.loadMsgOrgGrid.message = '机构列表加载失败';
      })
    ;
  }

  recordCheck(organization) {
    this.seletedOrg = organization;
  }

  goUpdate() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.router.navigate(['/base/organization/update', me.seletedOrg.id]);
    }

  }

  delete() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.messageService.confirm('', '确认删除?', function (dialog) {
        me.organizationService.delete(me.seletedOrg.id)
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
    if (!me.seletedOrg) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.seletedOrg.lockup = !me.seletedOrg.lockup;
    me.organizationService.lockup(me.seletedOrg)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
         // me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.seletedOrg.lockup = !me.seletedOrg.lockup;
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.seletedOrg.lockup = !me.seletedOrg.lockup;
      });
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.seletedOrg) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.seletedOrg.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }

}
