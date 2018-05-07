// 系统
import {Component, OnInit, ElementRef} from '@angular/core';

// service
import {CreditDebtService} from './creditDebt.service';

import {CreditDebt} from './model/creditDebt';
import {ReturnCode} from '../../../model/returnCode';
import {Page} from '../../base/page/model/page';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
import {LoadMsg} from '../../../model/load-msg';

const itemList: any[] = [
  {
    id: '1', title: '券种', code: 'quanzhong', itemFlag: '', child: [
      {cId: '11', name: 'SCP', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: 'CP', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '13', name: 'ABN', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '14', name: 'PRN', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '15', name: 'MTN', type: 'button', col: 'col-xs-1', val: '5'},
      {cId: '16', name: 'PPN', type: 'button', col: 'col-xs-1', val: '6'},
      {cId: '17', name: '企业债', type: 'button', col: 'col-xs-1', val: '7'},
      {cId: '18', name: '公司债', type: 'button', col: 'col-xs-1', val: '8'},
      {cId: '19', name: '其他', type: 'button', col: 'col-xs-1', val: '9'}]
  },

  {
    id: '2', title: '市场', code: 'market', itemFlag: '', child: [
      {cId: '21', name: '银行间', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '交易所', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '柜台市场', type: 'button', col: 'col-xs-1', val: '3'}]
  },
  {
    id: '6', title: '发行人', code: 'issuer', child: [
      {cId: '61', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '7', title: '发行人性质', code: 'publisherType', itemFlag: '', child: [
      {cId: '71', name: '金融机构', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '72', name: '国企', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '73', name: '民企', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '74', name: '央企', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '75', name: '自定义', type: 'button', col: 'col-xs-1', val: '5'}]
  },
  {
    id: '8', title: '债券名称', code: 'name', child: [
      {cId: '81', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '9', title: '发行期限', style: 'special', itemFlag: '', child: [
      {cId: '91', name: '请输入', type: 'input', col: 'col-xs-2', code: 'dateStartStart', val: ''},
      {cId: '94', name: '天', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '3'},
      {cId: '95', name: '年', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '1'},
      {cId: '96', name: '月', type: 'button', col: 'col-xs-1', code: 'dateUnit', val: '2'}]
  },
  {
    id: '4', title: '预测利率', style: 'special', child: [
      {cId: '41', name: '请输入', type: 'input', col: 'col-xs-2', code: 'forecastStart', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', type: 'input', col: 'col-xs-2', code: 'forecastEnd', val: ''},
      {cId: '44', name: '%', type: 'label', col: 'col-xs-1'}]
  },
  {
    id: '5', title: '发行规模', style: 'special', itemFlag: '', child: [
      {cId: '51', name: '请输入', code: 'amountStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '52', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '53', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  }
];

@Component({
  templateUrl: 'creditDebt.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class CreditDebtComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.creditDebt.shelve'; // 信用债按钮权限
  private seletedCreditDebt: CreditDebt; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private creditDebt: CreditDebt[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private creditDebtService: CreditDebtService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(creditDebt: CreditDebt) {
    this.seletedCreditDebt = creditDebt;
    this.productState = creditDebt.state;
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
    this.creditDebtService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.creditDebt = result.data;
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
    if (!me.seletedCreditDebt) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.creditDebtService.updateState(me.seletedCreditDebt.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedCreditDebt = null;
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
