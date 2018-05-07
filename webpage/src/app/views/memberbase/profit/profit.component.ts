// 系统
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
// model
import { Profit } from './model/profit';
import { Page } from '../../base/page/model/page';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
// service
import { ProfitService } from './profit.service';
import { StorageService } from '../../../providers/storage.service';

@Component({
  templateUrl: 'profit.component.html',
  styleUrls: ['../org.hidden.css']
})
export class ProfitComponent implements OnInit {

  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载权益列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedCirclesChange = new EventEmitter<Profit[]>();

  private profits: Profit[]; // 表格数据
  private selectedProfit: Profit; // 选中的记录
  private buttons: string[] = []; // 权限按钮id数组

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private pageParams: Page = new Page();

  constructor(private router: Router,
    private profitService: ProfitService,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
  }

  ngOnInit() {
    this.query();

  }

  query() {
    this.loadMsgGrid.loaded = false;
    this.profitService.list()
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.profits = result.data;
          this.loadMsgGrid.loaded = true;
        } else {
          this.loadMsgGrid.loaded = false;
          this.loadMsgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgGrid.loaded = false;
        this.loadMsgGrid.message = '权益列表加载失败';
      })
      ;
  }

  goUpdate() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/memberbase/profit/update', me.selectedProfit.id]);
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedProfit) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedProfit.lockup = !me.selectedProfit.lockup;
    me.profitService.lockup(me.selectedProfit)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedProfit.lockup = !me.selectedProfit.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedProfit.lockup = !me.selectedProfit.lockup;

      });
  }

  showButton(button: string): boolean {
    if (this.disabledButtons.indexOf(button) === -1) {
      // 如果没有，则显示
      return true;
    } else {
      // 如果有，则不显示
      return false;
    }
  }

  recordCheck(profit) {
    this.selectedProfit = profit;

  }


  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedProfit) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedProfit.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
