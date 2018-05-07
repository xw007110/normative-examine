// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Page} from '../base/page/model/page';
import {LoadMsg} from '../../model/load-msg';

import {Order} from './model/order';
import {OrderService} from './order.service';
import {ReturnCode} from '../../model/returnCode';

import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {BsModalService} from 'ngx-bootstrap/modal';
import {OrderParam} from './model/orderParam';
import {MessageModalService} from '../../components/app-common/app-modal/message.modal.service';
import {StorageService} from '../../providers/storage.service';

// component
import {MemberSelectModalComponent} from '../zjModal/memberSelectModal/memberSelectModal.component';
@Component({
  templateUrl: 'order.component.html',
  styleUrls: ['../base/org.hidden.css']
})
export class OrderComponent implements OnInit {

  private orders: Order[]; // 订单列表

  isLoading: Boolean = false; // 加载标志

  buyFlag: String = ''; // 买卖双方类型

  username: string; // 选择的用户名
  userId: string; // 选择的用户id
  private buttons: string[] = []; // 权限按钮id数组

  private orderParam = new OrderParam(); // 订单查询参数对象
  // 分页
  private pageParams: Page = new Page();
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private modalService: BsModalService,
              private messageService: MessageModalService,
              private storageService: StorageService) {
                this.buttons = this.storageService.getButtons();

  }

  ngOnInit() {
    this.query();
  }

  public query() {
    this.isLoading = true;
    this.orderService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.orderParam)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.orders = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgGrid.loaded = true;
        } else {
          this.loadMsgGrid.loaded = false;
          this.loadMsgGrid.message = returnCode.message;
        }
        this.isLoading = false;
      })
      .catch(error => {
        this.loadMsgGrid.loaded = false;
        this.loadMsgGrid.message = '订单列表加载失败';
        this.isLoading = false;
      })
  }

  public selectMember() {
    const bsModalRef: BsModalRef = this.modalService.show(MemberSelectModalComponent, {class: 'modal-lg'});
    const me = this;
    const content: MemberSelectModalComponent = bsModalRef.content;
    const action = content.action;
    action.ok = function () {
      const members = content.selectedMembers;
      if (members.length > 0) {
        me.userId = members[0].id; // 会员id
        me.username = members[0].username;
        me.buyFlag = '0';  // 选中会员默认查询资金方和资产方数据
        me.changeBuyer();
        content.message = '';
        bsModalRef.hide();
      } else {
        content.message = '请选择一条人员信息';
      }
    }
  }

  public changeBuyer() {
    const me = this;
    if (!me.username) {
      me.messageService.alert('', '请先选择会员');
      me.buyFlag = '';
      return;
    }
    if (me.buyFlag === '0') { // 全部
      me.orderParam.assetsOrMoneyId = me.userId; // 会员id
    } else if (me.buyFlag === '1') { // 资金方
      me.orderParam.memberMoneyId = me.userId;
      me.orderParam.memberAssetsId = '';
      me.orderParam.assetsOrMoneyId = '';
    } else if (me.buyFlag === '2') { // 资产方
      me.orderParam.memberAssetsId = '';
      me.orderParam.memberMoneyId = me.userId
      me.orderParam.assetsOrMoneyId = '';
    }else if (me.buyFlag === '3') { // 资金方或资产方
      me.orderParam.memberAssetsId = '';
      me.orderParam.memberMoneyId = '';
      me.orderParam.assetsOrMoneyId = me.userId;
    } else {
      me.orderParam.memberAssetsId = '';
      me.orderParam.memberMoneyId = '';
      me.orderParam.assetsOrMoneyId = '';
    }
  }

  public reset() {
    this.username = '';
    this.buyFlag = '';
    this.orderParam.memberAssetsId = '';
    this.orderParam.memberMoneyId = '';
    this.orderParam.assetsOrMoneyId = '';
  }
}
