// 系统
import {Component, OnInit, ElementRef} from '@angular/core';

// service
import {FinancialDebtService} from './financialDebt.service';

import {FinancialDebt} from './model/financialDebt';
import {ReturnCode} from '../../../model/returnCode';
import {Page} from '../../base/page/model/page';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
import {LoadMsg} from '../../../model/load-msg';


const itemList: any[] = [
  {
    id: '1', title: '发行人类型', code: 'publisherType', itemFlag: '', child: [
      {cId: '11', name: '银行', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '非银行', type: 'button', col: 'col-xs-1', val: '2'}]
  },
  {
    id: '2', title: '券种', code: 'quanzhong', itemFlag: '', child: [
      {cId: '21', name: '普通金融债', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '小微金融债', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '三农金融债', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '绿色金融债', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '25', name: '二级资本债', type: 'button', col: ' col-xs-1', val: '5'},
      {cId: '26', name: '次级债', type: 'button', col: 'col-xs-1', val: '6'},
      {cId: '27', name: '自定义', type: 'button', col: 'col-xs-1', val: '7'}]
  },
  {
    id: '4', title: '利率', style: 'special', child: [
      {cId: '41', name: '请输入', type: 'input', col: 'col-xs-2', code: 'interestrateStart', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', type: 'input', col: 'col-xs-2', code: 'interestrateEnd', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  },
  {
    id: '6', title: '发行方', code: 'issuer', child: [
      {cId: '61', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '7', title: '主体评级', code: 'company', itemFlag: '', child: [
      {cId: '71', name: 'AAA', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '72', name: 'AA+', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '73', name: 'AA', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '74', name: 'AA-', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '75', name: 'A+', type: 'button', col: ' col-xs-1', val: '5'},
      {cId: '76', name: 'A', type: 'button', col: 'col-xs-1', val: '7'},
      {cId: '77', name: 'A-', type: 'button', col: 'col-xs-1', val: '8'},
      {cId: '78', name: 'BBB+', type: 'button', col: 'col-xs-1', val: '9'},
      {cId: '79', name: 'BBB以及下', type: 'button', col: 'col-xs-1', val: '10'}]
  },
  {
    id: '8', title: '债项评级', code: 'obligation', itemFlag: '', child: [
      {cId: '81', name: 'AAA', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '82', name: 'AA+', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '83', name: 'AA', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '84', name: 'AA-', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '85', name: 'A+', type: 'button', col: ' col-xs-1', val: '5'},
      {cId: '86', name: 'A', type: 'button', col: 'col-xs-1', val: '7'},
      {cId: '87', name: 'A-', type: 'button', col: 'col-xs-1', val: '8'},
      {cId: '88', name: 'BBB+', type: 'button', col: 'col-xs-1', val: '9'},
      {cId: '89', name: 'BBB以及下', type: 'button', col: 'col-xs-1', val: '10'}]
  }
];

@Component({
  templateUrl: 'financialDebt.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class FinancialDebtComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.financialDebt.shelve'; // 金融债按钮权限
  private seletedFinancialDebt: FinancialDebt; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private financialDebt: FinancialDebt[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private financialDebtService: FinancialDebtService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(financialDebt: FinancialDebt) {
    this.seletedFinancialDebt = financialDebt;
    this.productState = financialDebt.state;
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
    this.financialDebtService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.financialDebt = result.data;
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
    if (!me.seletedFinancialDebt) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.financialDebtService.updateState(me.seletedFinancialDebt.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedFinancialDebt = null;
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
