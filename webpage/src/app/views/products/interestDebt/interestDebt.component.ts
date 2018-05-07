// 系统
import {Component, OnInit, ElementRef} from '@angular/core';

// service
import {InterestDebtService} from './interestDebt.service';

import {InterestDebt} from './model/interestDebt';
import {ReturnCode} from '../../../model/returnCode';
import {Page} from '../../base/page/model/page';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
import {LoadMsg} from '../../../model/load-msg';

const itemList: any[] = [
  {
    id: '1', title: '债券名称', code: 'name', itemFlag: '', child: [
      {cId: '11', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '5', title: '债券代码', code: 'code', itemFlag: '', child: [
      {cId: '51', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '2', title: '券种', code: 'quanzhong', itemFlag: '', child: [
      {cId: '21', name: '国债', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '国开债', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '农发债', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '口行债', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '25', name: '央票', type: 'button', col: ' col-xs-1', val: '5'},
      {cId: '26', name: '地方政府债', type: 'button', col: 'col-xs-1', val: '6'}]
  },
  {
    id: '3', title: '发行期限', style: 'special', itemFlag: '', child: [
      {cId: '31', name: '请输入', type: 'input', col: 'col-xs-2', code: 'dateStart', val: ''},
      {cId: '32', name: '天', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '3'},
      {cId: '33', name: '年', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '1'},
      {cId: '34', name: '月', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '2'}]
  },
  {
    id: '7', title: '发行规模', style: 'special', itemFlag: '', child: [
      {cId: '71', name: '请输入', code: 'amountStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '72', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '73', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  },
  {
    id: '4', title: '票面利率', style: 'special', child: [
      {cId: '41', name: '请输入', code: 'couponRateStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', code: 'couponRateEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  },
];

@Component({
  templateUrl: 'interestDebt.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class InterestDebtComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.interestDebt.shelve'; // 利率债按钮权限
  private seletedInterestDebt: InterestDebt; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private interestDebt: InterestDebt[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private interestDebtService: InterestDebtService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(interestDebt: InterestDebt) {
    this.seletedInterestDebt = interestDebt;
    this.productState = interestDebt.state;
  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  // 条件查询
  getByParam(param) {
    this.param = param;
    this.query();
  }

  query() {
    this.isLoading = true;
    this.interestDebtService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.interestDebt = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgGrid.loaded = true;
        } else {
          this.loadMsgGrid.loaded = false;
          this.loadMsgGrid.message = returnCode.message;
        }
        this.isLoading = false;
      }).catch(error => {
      this.loadMsgGrid.loaded = false;
      this.loadMsgGrid.message = '机构列表加载失败';
      this.isLoading = false;
    })
  }


  updateState(productState: string): void {
    const me = this;
    // 操作判断
    if (!me.seletedInterestDebt) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.interestDebtService.updateState(me.seletedInterestDebt.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedInterestDebt = null;
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

  toogle(toggleFlag: boolean) {
    this.toggleFlag = toggleFlag;
  }
}
