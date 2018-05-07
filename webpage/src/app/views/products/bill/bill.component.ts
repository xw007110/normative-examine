// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {BillService} from './bill.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {Bill} from './model/bill';

const itemList: any[] = [
  {
    id: '1', title: '交易种类', code: 'kinds', itemFlag: '', child: [
      {cId: '11', name: '买断式', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '回购式', type: 'button', col: 'col-xs-1', val: '2'}]
  },

  {
    id: '2', title: '票据类型', code: 'type', itemFlag: '', child: [
      {cId: '21', name: '电银', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '电商', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '纸银', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '纸商', type: 'button', col: 'col-xs-1', val: '4'}]
  },
  {
    id: '3', title: '剩余期限', style: 'special', itemFlag: '', child: [
      {cId: '34', name: '请输入', type: 'input', col: 'col-xs-2', code: 'deadlineStart', val: ''},
      {cId: '35', name: '-', type: 'span'},
      {cId: '36', name: '请输入', type: 'input', col: 'col-xs-2', code: 'deadlineEnd', val: ''},
      {cId: '37', name: '天', type: 'button', col: 'col-xs-1', code: 'deadlineUnit', val: '3'},
      {cId: '38', name: '年', type: 'button', col: 'col-xs-1', code: 'deadlineUnit', val: '1'},
      {cId: '39', name: '月', type: 'button', col: 'col-xs-1', code: 'deadlineUnit', val: '2'}]
  },
  {
    id: '4', title: '利率', style: 'special', child: [
      {cId: '41', name: '请输入', code: 'interestrateStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', code: 'interestrateEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  },
  {
    id: '5', title: '金额', style: 'special', itemFlag: '', child: [
      {cId: '51', name: '请输入', code: 'amountStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '52', name: '-', type: 'span'},
      {cId: '53', name: '请输入', code: 'amountEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '52', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '53', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  },
  {
    id: '6', title: '承兑行', code: 'acceptances', itemFlag: '', child: [
      {cId: '21', name: '国股', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '城商', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '三农', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '其他', type: 'button', col: 'col-xs-1', val: '4'}]
  }
];

@Component({
  templateUrl: 'bill.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class BillComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.bill.shelve'; // 按钮权限
  private seletedBill: Bill; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private bill: Bill[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private billService: BillService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(bill: Bill) {
    this.seletedBill = bill;
    this.productState = bill.state;
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
    this.billService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.bill = result.data;
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
    if (!me.seletedBill) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.billService.updateState(me.seletedBill.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedBill = null;
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
