// 系统
import { Component,  EventEmitter, OnInit, Input, Output } from '@angular/core';
import {Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
// model
import {IntegralRule} from './model/integralRule';
import {Page} from '../base/page/model/page';
import {Result} from '../../model/result';
import {ReturnCode} from '../../model/returnCode';
import {LoadMsg} from '../../model/load-msg';
import { MessageModalService } from '../../components/app-common/app-modal/message.modal.service';
// service
import {IntegralRuleService} from './integralRule.service';

@Component({
  templateUrl: 'integralRule.component.html'
})
export class IntegralRuleComponent implements OnInit {

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载圈子列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedCirclesChange = new EventEmitter<IntegralRule[]>();

  private integralRules:IntegralRule[]; // 表格数据
  private selectedIntegralRule:IntegralRule; // 选中的记录

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private pageParams:Page = new Page();

  constructor(private router:Router,
              private integralRuleService:IntegralRuleService,
              private modalService:BsModalService,
              private messageService:MessageModalService) {
  }

  ngOnInit() {
    this.query();

  }

  // 分页查询
  // getPageData(pageNo) {
  //   const self = this;
  //   self.start = pageNo - 1; // 当前页
  //   self.limit = self.pageParams.pageData; // 每页条数
  //   self.query();
  // }

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
      me.router.navigate(['/integralRule/update', me.selectedIntegralRule.id]);
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
          me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
      });
  }

  showButton(button:string):boolean {
    if (this.disabledButtons.indexOf(button) === -1) {
      // 如果没有，则显示
      return true;
    } else {
      // 如果有，则不显示
      return false;
    }
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
