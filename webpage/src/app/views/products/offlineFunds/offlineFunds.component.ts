// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {OfflineFundsService} from './offlineFunds.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {OfflineFunds} from './model/offlineFunds';


const itemList: any[] = [
  {
    id: '1', title: '种类', code: 'kinds', itemFlag: '', child: [
      {cId: '11', name: '银行同存', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '非银同存', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '13', name: '协议同存', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '14', name: '结构性存款', type: 'button', col: 'col-xs-1', val: '4'}]
  },

  {
    id: '2', title: '币种', code: 'currencyUnit', itemFlag: '', child: [
      {cId: '21', name: '人民币', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '美元', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '其它', type: 'button', col: 'col-xs-1', val: '7'}]
  },
  {
    id: '3', title: '产品期限', style: 'special', itemClick: '39', itemFlag: '', itemHiddenFlag: '', child: [
      {
        cId: '31', name: '7天', type: 'button', col: 'col-xs-1', val: '3,7,7',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '32', name: '14天', type: 'button', col: 'col-xs-1', val: '3,14,14',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '33', name: '1月', type: 'button', col: 'col-xs-1', val: '2,11,',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '34', name: '2月', type: 'button', col: 'col-xs-1', val: '2,2,2',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '35', name: '3月', type: 'button', col: 'col-xs-1', val: '2,3,3',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '36', name: '6月', type: 'button', col: 'col-xs-1', val: '2,6,6',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '37', name: '9月', type: 'button', col: 'col-xs-1', val: '2,9,9',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '38', name: '12月', type: 'button', col: 'col-xs-1', val: '2,12,12',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {cId: '39', name: '自定义', type: 'button', col: 'col-xs-1', val: ',,', code: 'dateUnit,dateStart,dateEnd'},
      {cId: '310', name: '请输入', type: 'input', col: 'col-sm-2 no-padding', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '311', name: '-', type: 'span', itemHidden: true},
      {cId: '312', name: '请输入', type: 'input', col: 'col-sm-2 no-padding', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '313', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '314', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '315', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
  },
  {
    id: '4', title: '利率', style: 'special', itemFlag: '', child: [
      {cId: '41', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'interestrateStart', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'interestrateEnd', val: ''},
      {cId: '44', name: '%', type: 'label'}]
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
  templateUrl: 'offlineFunds.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class OfflineFundsComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.onlineFunds.shelve'; // 按钮权限
  private seletedOfflineFunds: OfflineFunds; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private offlineFunds: OfflineFunds[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private offlineFundsService: OfflineFundsService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(offlineFunds: OfflineFunds) {
    this.seletedOfflineFunds = offlineFunds;
    this.productState = offlineFunds.state;
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
    this.offlineFundsService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.offlineFunds = result.data;
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
    if (!me.seletedOfflineFunds) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.offlineFundsService.updateState(me.seletedOfflineFunds.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedOfflineFunds = null;
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
