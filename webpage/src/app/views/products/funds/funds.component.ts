// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {FundsService} from './funds.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {Funds} from './model/funds';

const itemList: any[] = [
  {
    id: '1', title: '基金名称', code: 'name', child: [
      {cId: '11', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '2', title: '产品类别', code: 'category', itemFlag: '', child: [
      {cId: '21', name: '货币基金', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '纯债公募基金', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '定制型公募基金', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '纯债增强收益型基金', type: 'button', col: 'col-xs-1', val: '4'}]
  },
  {
    id: '3', title: '产品期限', style: 'special', itemClick: '36', itemFlag: '', itemHiddenFlag: '', child: [
      {
        cId: '33', name: '3月', type: 'button', col: 'col-xs-1', val: '2,3,3',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '34', name: '6月', type: 'button', col: 'col-xs-1', val: '2,6,6',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '35', name: '12月', type: 'button', col: 'col-xs-1', val: '2,12,12',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {cId: '36', name: '自定义', type: 'button', col: 'col-xs-1', val: ',,', code: 'dateUnit,dateStart,dateEnd'},
      {cId: '37', name: '请输入', type: 'input', col: 'col-sm-2 padding-5', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '38', name: '-', type: 'span', itemHidden: true},
      {cId: '39', name: '请输入', type: 'input', col: 'col-sm-2 padding-5', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '310', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '311', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '312', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
  },
  {
    id: '4', title: '预期收益率', style: 'special', child: [
      {cId: '41', name: '请输入', code: 'interestrateStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', code: 'interestrateEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  },
  {
    id: '7', title: '基金总规模', style: 'special', itemFlag: '', child: [
      {cId: '71', name: '请输入', type: 'input', col: 'col-xs-2', code: 'amountStart', val: ''},
      {cId: '72', name: '-', type: 'span'},
      {cId: '73', name: '请输入', type: 'input', col: 'col-xs-2', code: 'amountEnd', val: ''},
      {cId: '74', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '75', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  }
];

@Component({
  templateUrl: 'funds.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class FundsComponent implements OnInit {

  itemList = itemList; // 查询条件数组
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.funds.shelve'; // 按钮权限
  private seletedFunds: Funds; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private funds: Funds[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private fundsService: FundsService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(funds: Funds) {
    this.seletedFunds = funds;
    this.productState = funds.state;
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
    this.fundsService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.funds = result.data;
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
    if (!me.seletedFunds) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.fundsService.updateState(me.seletedFunds.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedFunds = null;
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
