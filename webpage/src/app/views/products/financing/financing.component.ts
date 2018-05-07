// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {FinancingService} from './financing.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {Financing} from './model/financing';

const itemList: any[] = [
  {
    id: '1', title: '产品性质', code: 'nature', itemFlag: '', child: [
      {cId: '11', name: '保本', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '非保本', type: 'button', col: 'col-xs-1', val: '2'}]
  },
  {
    id: '6', title: '产品类别', code: 'category', itemFlag: '', child: [
      {cId: '61', name: '开放式', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '62', name: '封闭式', type: 'button', col: 'col-xs-1', val: '2'}]
  },

  {
    id: '2', title: '风险等级', code: 'riskGrade', itemFlag: '', child: [
      {cId: '21', name: '不限', type: 'button', col: 'col-xs-1', val: ''},
      {cId: '22', name: '低', type: 'button', col: ' col-xs-1', val: '1'},
      {cId: '23', name: '中低', type: 'button', col: 'col-xs-1', val: '2'},
      {cId: '24', name: '中', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '25', name: '中高', type: 'button', col: ' col-xs-1', val: '4'},
      {cId: '26', name: '高', type: 'button', col: 'col-xs-1', val: '5'}]
  },
  {
    id: '3', title: '产品期限', style: 'special', itemClick: '37', itemFlag: '', itemHiddenFlag: '', child: [
      {
        cId: '31', name: '1月', type: 'button', col: 'col-xs-1', val: '2,1,1',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '32', name: '2月', type: 'button', col: 'col-xs-1', val: '2,2,2',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '33', name: '3月', type: 'button', col: 'col-xs-1', val: '2,3,3',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '34', name: '6月', type: 'button', col: 'col-xs-1', val: '2,6,6',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '35', name: '9月', type: 'button', col: 'col-xs-1', val: '2,9,9',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '36', name: '12月', type: 'button', col: 'col-xs-1', val: '2,12,12',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {cId: '37', name: '自定义', type: 'button', col: 'col-xs-1', val: ',,', code: 'dateUnit,dateStart,dateEnd'},
      {cId: '38', name: '请输入', type: 'input', col: 'col-sm-4 padding-5', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '39', name: '-', type: 'span', itemHidden: true},
      {cId: '310', name: '请输入', type: 'input', col: 'col-sm-4 padding-5', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '312', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '313', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '314', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
  },
  {
    id: '4', title: '收益率', style: 'special', child: [
      {cId: '41', name: '请输入', code: 'interestrateStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', code: 'interestrateEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '44', name: '%', type: 'label', code: '', val: ''}]
  },
  {
    id: '5', title: '金额', style: 'special', itemFlag: '', child: [
      {cId: '51', name: '请输入', type: 'input', col: 'col-sm-2 padding-5', code: 'amountStart', val: ''},
      {cId: '52', name: '-', type: 'span'},
      {cId: '53', name: '请输入', type: 'input', col: 'col-sm-2 padding-5', code: 'amountEnd', val: ''},
      {cId: '54', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '55', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  }
];


@Component({
  templateUrl: 'financing.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class FinancingComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.financing.shelve'; // 按钮权限
  private seletedFinancing: Financing; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private financing: Financing[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private financingService: FinancingService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(financing: Financing) {
    this.seletedFinancing = financing;
    this.productState = financing.state;
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
    this.financingService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.financing = result.data;
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
    if (!me.seletedFinancing) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.financingService.updateState(me.seletedFinancing.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedFinancing = null;
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
