// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {OnlineFundsService} from './onlineFunds.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {OnlineFunds} from './model/OnlineFunds';

const itemList: any[] = [
  {
    id: '1', title: '模式(可多选)', code: 'patterns', itemFlag: '', multi: true, child: [
      {cId: '11', name: '押利率', type: 'button', col: 'col-xs-1', val: '1', selected: false},
      {cId: '12', name: '拆借', type: 'button', col: 'col-xs-1', val: '2', selected: false},
      {cId: '13', name: '押中债', type: 'button', col: 'col-xs-1', val: '3', selected: false},
      {cId: '14', name: '押上清', type: 'button', col: 'col-xs-1', val: '4', selected: false},
      {cId: '15', name: '押存单', type: 'button', col: 'col-xs-1', val: '5', selected: false},
      {cId: '16', name: '押信用', type: 'button', col: 'col-xs-1', val: '6', selected: false}]
  },

  {
    id: '2', title: '对手', code: 'rivals', itemFlag: '', child: [
      {cId: '21', name: '限银行', type: 'button', col: ' col-xs-1', val: '1'},
      {cId: '22', name: '限农信', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '23', name: '限直连', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '限存款机构', type: 'button', col: ' col-xs-1', val: '4'},
      {cId: '25', name: '限非银机构', type: 'button', col: 'col-xs-1', val: '5'}]
  },
  {
    id: '3', title: '产品期限', style: 'special', itemClick: '33', itemFlag: '', itemHiddenFlag: '', child: [
      {cId: '31', name: '隔夜', type: 'button', col: 'col-xs-1', code: 'dateUnit,dateStart,dateEnd', val: '4,,'},
      {cId: '32', name: '7天', type: 'button', col: 'col-xs-1', dateStart: '7', code: 'dateUnit,dateStart,dateEnd', val: '3,7,7'},
      {cId: '33', name: '自定义', type: 'button', col: 'col-xs-1', val: ',,', code: 'dateUnit,dateStart,dateEnd'},
      {cId: '310', name: '请输入', type: 'input', col: 'col-sm-2 no-padding', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '311', name: '-', type: 'span', itemHidden: true},
      {cId: '312', name: '请输入', type: 'input', col: 'col-sm-2 no-padding', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '313', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '314', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '315', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
  },
  {
    id: '4', title: '利率模式', style: 'special', itemClick: '44', itemFlag: '', child: [
      {cId: '41', name: '加权', type: 'button', col: 'col-xs-1', code: 'interestrateUnit,interestrateStart,interestrateEnd', val: '4,,'},
      {cId: '42', name: '加点', type: 'button', col: 'col-xs-1', code: 'interestrateUnit,interestrateStart,interestrateEnd', val: '1,,'},
      {cId: '43', name: '减点', type: 'button', col: 'col-xs-1', code: 'interestrateUnit,interestrateStart,interestrateEnd', val: '2,,'},
      {cId: '44', name: '自定义', type: 'button', col: 'col-xs-1', val: '3,,', code: 'interestrateUnit,interestrateStart,interestrateEnd'},
      {
        cId: '45',
        name: '请输入',
        type: 'input',
        col: 'col-sm-2 padding-5',
        itemHidden: true,
        code: 'interestrateStart',
        val: ''
      },
      {cId: '46', name: '-', type: 'span', itemHidden: true},
      {
        cId: '47',
        name: '请输入',
        type: 'input',
        col: 'col-sm-2 padding-5',
        itemHidden: true,
        code: 'interestrateEnd',
        val: ''
      },
      {cId: '48', name: '%', type: 'label', itemHidden: true}]
  },
  {
    id: '5', title: '金额', style: 'special', itemFlag: '', child: [
      {cId: '51', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'amountStart', val: ''},
      {cId: '52', name: '-', type: 'span'},
      {cId: '53', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'amountEnd', val: ''},
      {cId: '54', name: '亿', type: 'button', col: 'col-sm-1', code: 'amountUnit', val: '3'},
      {cId: '55', name: '万', type: 'button', col: 'col-sm-1', code: 'amountUnit', val: '2'}]
  }
];

@Component({
  templateUrl: 'onlineFunds.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class OnlineFundsComponent implements OnInit {
  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.onlineFunds.shelve'; // 按钮权限
  private seletedOnlineFunds: OnlineFunds; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private onlineFunds: OnlineFunds[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private onlineFundsService: OnlineFundsService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(onlineFunds: OnlineFunds) {
    this.seletedOnlineFunds = onlineFunds;
    this.productState = onlineFunds.state;
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
    this.onlineFundsService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.onlineFunds = result.data;
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
    if (!me.seletedOnlineFunds) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.onlineFundsService.updateState(me.seletedOnlineFunds.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedOnlineFunds = null;
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
