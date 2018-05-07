// 系统
import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { Router } from '@angular/router';

// model
import { Merchant } from './model/merchant';
import { OrganizationSource } from '../../base/organization/model/organization-source.enum';
import { LoadMsg } from '../../../model/load-msg';
import { MerchantParams } from './model/merchant.params';
import { ReturnCode } from '../../../model/returnCode';
import { Page } from '../page/model/page';

// service
import { OrganizationService } from '../../base/organization/organization.service';
import { MerchantService } from './merchant.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { StorageService } from '../../../providers/storage.service';


@Component({
  templateUrl: 'merchant.component.html',
  styleUrls: ['../org.hidden.css']
})
export class MerchantComponent implements OnInit {
  bsModalRef: BsModalRef;
  @Input('isLoading')
  isLoading: boolean; // 加载标志


  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载会员列表');

  private merchants: Merchant[]; // 表格数据
  private seletedMer: Merchant; // 表格中选中的机构记录
  private start = 0; // 开始页
  private limit = 10; // 每页条数
  private merchantParams: MerchantParams = new MerchantParams(); // 过滤参数
  private pageParams: Page = new Page();
  private buttons: string[] = []; // 权限按钮id数组
  private orgType: string; // 机构类型
  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private router: Router,
    private merchantService: MerchantService,
    private modalService: BsModalService,
    toasterService: ToasterService,
    private orgService: OrganizationService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.toasterService = toasterService;
    this.buttons = this.storageService.getButtons();
    this.orgType = OrganizationSource.Member; // 会员

  }


  ngOnInit() {
    this.query();
  }
  // 点击机构树查询
  queryOrgList(id) {
    this.merchantParams.parentId = id;
    this.query();
  }

  // 分页查询
  getPageData(pageNo) {
    this.start = pageNo - 1;
    this.limit = this.pageParams.pageData;
    this.query();
  }

  query() {
    this.loadMsgOrgGrid.loaded = false;
    this.merchantParams.type = OrganizationSource.Member;
    this.merchantService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.merchantParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.merchants = result.data;
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
        this.loadMsgOrgGrid.message = '会员列表加载失败';
      })
      ;
  }

  recordCheck(merchant) {
    this.seletedMer = merchant;

  }

  goUpdate() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.router.navigate(['/memberbase/merchant/update', me.seletedMer.id]);
    }
  }

  delete(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.messageService.confirm('', '确认删除?', function (dialog) {
        me.merchantService.delete(me.seletedMer.id)
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
    if (!me.seletedMer) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.seletedMer.lockup = !me.seletedMer.lockup;
    me.merchantService.lockup(me.seletedMer)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.seletedMer.lockup = !me.seletedMer.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.seletedMer.lockup = !me.seletedMer.lockup;

      });
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.seletedMer) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.seletedMer.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }

}
