// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {CommonStockFundsService} from './commonStockFunds.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {CommonStockFunds} from './model/commonStockFunds';

const itemList: any[] = [
  {
    id: '2', title: '目标资产', code: 'targetAssets', itemFlag: '', multi: true, child: [
      {cId: '21', name: '线上资金', type: 'button', col: 'col-xs-1', val: '1', selected: false},
      {cId: '22', name: '线下资金', type: 'button', col: ' col-xs-1', val: '2', selected: false},
      {cId: '23', name: '同业理财', type: 'button', col: 'col-xs-1', val: '3', selected: false},
      {cId: '24', name: '债券（金融债）', type: 'button', col: 'col-xs-1', val: '4', selected: false},
      {cId: '25', name: '债券（利率债）', type: 'button', col: ' col-xs-1', val: '5', selected: false},
      {cId: '26', name: '债券（信用债）', type: 'button', col: 'col-xs-1', val: '6', selected: false},
      {cId: '27', name: '存单', type: 'button', col: 'col-xs-1', val: '7', selected: false},
      {cId: '28', name: '票据', type: 'button', col: ' col-xs-1', val: '8', selected: false},
      {cId: '29', name: '基金', type: 'button', col: 'col-xs-1', val: '9', selected: false},
      {cId: '210', name: 'ABS', type: 'button', col: 'col-xs-1', val: '10', selected: false},
      {cId: '211', name: '资管计划', type: 'button', col: ' col-xs-1', val: '11', selected: false},
      {cId: '212', name: '信托计划', type: 'button', col: 'col-xs-1', val: '12', selected: false},
      {cId: '213', name: '其他资产', type: 'button', col: 'col-xs-1', val: '13', selected: false}]
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
        cId: '33', name: '1月', type: 'button', col: 'col-xs-1', val: '2,1,1',
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
      {cId: '312', name: '请输入', type: 'input', col: 'col-xs-2', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '311', name: '-', type: 'label', itemHidden: true},
      {cId: '312', name: '请输入', type: 'input', col: 'col-xs-2', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '313', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '314', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '315', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
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
    id: '6', title: '收益率', style: 'special', child: [
      {cId: '41', name: '请输入', code: 'earningsStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', code: 'earningsEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  }
];

@Component({
  templateUrl: 'commonStockFunds.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class CommonStockFundsComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.commonStockFunds.shelve'; // 按钮权限
  private seletedCommonStockFunds: CommonStockFunds; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private commonStockFunds: CommonStockFunds[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private commonStockFundsService: CommonStockFundsService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(commonStockFunds: CommonStockFunds) {
    this.seletedCommonStockFunds = commonStockFunds;
    this.productState = commonStockFunds.state;
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
    this.commonStockFundsService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.commonStockFunds = result.data;
          for(let i=0;i<this.commonStockFunds.length;i++){
            let bondTypeStr: string = '';
            for (let key in this.commonStockFunds[i].targetAssetsDesc) {
              bondTypeStr+=this.commonStockFunds[i].targetAssetsDesc[key]+",";
            }
            this.commonStockFunds[i].bondTypeStr = bondTypeStr.substring(0,bondTypeStr.length-1);
          }
          
    
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
    if (!me.seletedCommonStockFunds) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.commonStockFundsService.updateState(me.seletedCommonStockFunds.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedCommonStockFunds = null;
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
