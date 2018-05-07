// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

// model
import { Member } from './model/member';
import { MemberParams } from './model/member.params';
import { Page } from '../page/model/page';
import { ReturnCode } from '../../../model/returnCode';
import { OrganizationSource } from '../../base/organization/model/organization-source.enum';
import { LoadMsg } from '../../../model/load-msg';

// service
import { MemberService } from './member.service';
import { OrganizationService } from '../../base/organization/organization.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { StorageService } from '../../../providers/storage.service';


@Component({
  templateUrl: 'member.component.html',
  styleUrls: ['../org.hidden.css']
})
export class MemberComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgTree = new LoadMsg(false, '正在加载会员信息');
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载会员列表');

  @Input()
  private members: Member[]; // 表格数据
  private memberParams: MemberParams = new MemberParams(); // 过滤参数
  private buttons: string[] = []; // 权限按钮id数组
  private seletedMember: Member; // 选中的会员
  private pageParams: Page = new Page();
  private orgType: string; // 机构类型
  constructor(private router: Router,
    private memberService: MemberService,
    private orgService: OrganizationService,
    private messageService: MessageModalService,
    private storageService: StorageService,
    private modalService: BsModalService,
  ) {
    this.buttons = this.storageService.getButtons();
    this.orgType = OrganizationSource.Member; // 会员
  }

  ngOnInit() {
    this.query();
  }

  // 点击机构树查询
  queryOrgList(id) {
    this.memberParams.organizationId = id;
    this.query();
  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.seletedMember = null; // 将选中的对象清空
    this.loadMsgOrgGrid.loaded = false;
    this.memberService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.memberParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.members = result.data;
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

  recordCheck(member) {
    this.seletedMember = member;
  }

  public authenticate(): void {
    if (!this.seletedMember) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    this.router.navigate(['/memberbase/member/authenticate', this.seletedMember.id]);
  }


  forbidden(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.seletedMember.forbidden = !me.seletedMember.forbidden;
      me.memberService.forbidden(me.seletedMember)
        .then(result => {

          if (result.returnCode.code === '0000') {

            me.messageService.alert('', '操作成功');
            //me.query();
          } else {
            me.seletedMember.forbidden = !me.seletedMember.forbidden;
            me.messageService.alert('', result.returnCode.message);
          }
        })
        .catch(error => {
          me.seletedMember.forbidden = !me.seletedMember.forbidden;
          me.messageService.alert('', '操作发生异常');
        });
    }

  }
  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.seletedMember) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.seletedMember.lockup = !me.seletedMember.lockup;
    me.memberService.lockup(me.seletedMember)
      .then(result => {
        if (result.returnCode.code === '0000') {

          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.seletedMember.lockup = !me.seletedMember.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.seletedMember.lockup = !me.seletedMember.lockup;

      });
  }

  goModifyMobile() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/memberbase/member/modifyMobile', me.seletedMember.id]);
    }
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.seletedMember) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.seletedMember.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
