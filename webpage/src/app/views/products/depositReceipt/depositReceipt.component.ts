// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {DepositReceiptService} from './depositReceipt.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {DepositReceipt} from './model/depositReceipt';

const itemList: any[] = [
  {
    id: '1', title: '市场', code: 'market', itemFlag: '', child: [
      {cId: '11', name: '一级市场', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '二级市场', type: 'button', col: 'col-xs-1', val: '2'}]
  },
  {
    id: '2', title: '发行方式', code: 'distribution', itemFlag: '', child: [
      {cId: '21', name: '招标发行', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '22', name: '报价发行', type: 'button', col: ' col-xs-1', val: '1'}]
  },
  {
    id: '6', title: '票息类型', code: 'coupon', itemFlag: '', child: [
      {cId: '61', name: '零息', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '62', name: '固息', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '63', name: '浮息', type: 'button', col: ' col-xs-1', val: '3'}]
  },
  {
    id: '3', title: '期限', style: 'special', itemFlag: '', child: [
      {cId: '31', name: '1月', type: 'button', col: 'col-xs-1', val: '2,1',
      code: 'dateUnit,dateStart'},
      {cId: '32', name: '3月', type: 'button', col: ' col-xs-1', val: '2,3',
      code: 'dateUnit,dateStart'},
      {cId: '33', name: '6月', type: 'button', col: 'col-xs-1', val: '2,6',
      code: 'dateUnit,dateStart'},
      {cId: '34', name: '9月', type: 'button', col: 'col-xs-1', val: '2,9',
      code: 'dateUnit,dateStart'},
      {cId: '35', name: '1年', type: 'button', col: ' col-xs-1', val: '1,1',
      code: 'dateUnit,dateStart'}]
  },
  {
    id: '4', title: '主体评级', code: 'creditrating', itemFlag: '', child: [
      {cId: '41', name: 'AAA', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '42', name: 'AA+', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '43', name: 'AA', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '44', name: 'AA-', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '45', name: 'A+', type: 'button', col: ' col-xs-1', val: '5'},
      {cId: '46', name: 'A', type: 'button', col: 'col-xs-1', val: '7'},
      {cId: '47', name: 'A-', type: 'button', col: 'col-xs-1', val: '8'}]
  },
  {
    id: '4', title: '参考收益率', style: 'special', child: [
      {cId: '41', name: '请输入', type: 'input', col: 'col-xs-2', code: 'interestrateStart', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', type: 'input', col: 'col-xs-2', code: 'interestrateEnd', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  }
];

@Component({
  templateUrl: 'depositReceipt.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class DepositReceiptComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.depositReceipt.shelve'; // 按钮权限
  private seletedDepositReceipt: DepositReceipt; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private depositReceipt: DepositReceipt[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private depositReceiptService: DepositReceiptService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(depositReceipt: DepositReceipt) {
    this.seletedDepositReceipt = depositReceipt;
    this.productState = depositReceipt.state;
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
    this.depositReceiptService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.depositReceipt = result.data;
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
    if (!me.seletedDepositReceipt) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.depositReceiptService.updateState(me.seletedDepositReceipt.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedDepositReceipt = null;
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
