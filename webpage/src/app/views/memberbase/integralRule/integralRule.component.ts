// 系统
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
// model
import { IntegralRule } from './model/integralRule';
import { Page } from '../../base/page/model/page';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
// service
import { IntegralRuleService } from './integralRule.service';
import { StorageService } from '../../../providers/storage.service';

@Component({
  templateUrl: 'integralRule.component.html',
  styleUrls: ['../org.hidden.css']
})
export class IntegralRuleComponent implements OnInit {

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载圈子列表');


  @Output()
  public selectedCirclesChange = new EventEmitter<IntegralRule[]>();

  private integralRules: IntegralRule[]; // 表格数据
  private selectedIntegralRule: IntegralRule; // 选中的记录
  private buttons: string[] = []; // 权限按钮id数组

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private pageParams: Page = new Page();

  constructor(private router: Router,
    private integralRuleService: IntegralRuleService,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();

  }

  ngOnInit() {
    this.query();

  }

  query() {
    this.loadMsgOrgGrid.loaded = false;
    this.integralRuleService.list()
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.integralRules = result.data;
          this.loadMsgOrgGrid.loaded = true;
        } else {
          this.loadMsgOrgGrid.loaded = false;
          this.loadMsgOrgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgOrgGrid.loaded = false;
        this.loadMsgOrgGrid.message = '积分规则列表加载失败';
      })
      ;
  }

  goUpdate() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/memberbase/intergralRule/update', me.selectedIntegralRule.id]);
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedIntegralRule) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedIntegralRule.lockup = !me.selectedIntegralRule.lockup;
    me.integralRuleService.lockup(me.selectedIntegralRule)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedIntegralRule.lockup = !me.selectedIntegralRule.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedIntegralRule.lockup = !me.selectedIntegralRule.lockup;

      });
  }

  recordCheck(integralRule) {
    this.selectedIntegralRule = integralRule;

  }


  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedIntegralRule) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedIntegralRule.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
