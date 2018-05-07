// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {ManagementPlanService} from './managementPlan.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {ManagementPlan} from './model/managementPlan';

const itemList: any[] = [
  {
    id: '8', title: '产品名称', code: 'name', child: [
      {cId: '81', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '1', title: '发行机构', code: 'issuer', child: [
      {cId: '11', name: '请输入', type: 'input', col: 'col-xs-2 ', val: ''}]
  },
  {
    id: '2', title: '投资类型', code: 'investmentType', itemFlag: '', child: [
      {cId: '21', name: '委托贷款', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '产业基金', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '定向增发', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '其他', type: 'button', col: ' col-xs-1', val: '4'}]
  },
  {
    id: '3', title: '产品期限', style: 'special', itemClick: '35', itemFlag: '', itemHiddenFlag: '', child: [
      {
        cId: '31', name: '12月', type: 'button', col: 'col-xs-1', val: '2,12,12',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '32', name: '18月', type: 'button', col: 'col-xs-1', val: '2,18,18',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '33', name: '24月', type: 'button', col: 'col-xs-1', val: '2,24,24',
        code: 'dateUnit,dateStart,dateEnd'
      },
      {
        cId: '34', name: '30月', type: 'button', col: 'col-xs-1', val: '2,30,30',
        code: 'dateUnit,dateStart,dateEnd'
      },

      {cId: '35', name: '自定义', type: 'button', col: 'col-xs-1', val: ',,', code: 'dateUnit,dateStart,dateEnd'},
      {
        cId: '36', name: '', type: ''
      },
      {cId: '37', name: '请输入', type: 'input', col: 'col-sm-4 padding-5', itemHidden: true, code: 'dateStart', val: ''},
      {cId: '38', name: '-', type: 'span', itemHidden: true},
      {cId: '39', name: '请输入', type: 'input', col: 'col-sm-4 padding-5', itemHidden: true, code: 'dateEnd', val: ''},
      {cId: '310', name: '天', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '3'},
      {cId: '311', name: '年', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '1'},
      {cId: '312', name: '月', type: 'button', col: 'col-xs-1', itemHidden: true, clickEvent: true, code: 'dateUnit', val: '2'}]
  },
  {
    id: '7', title: '总规模', style: 'special', itemFlag: '', child: [
      {cId: '71', name: '请输入', code: 'amountStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '72', name: '-', type: 'span', col: 'col-xs-1'},
      {cId: '73', name: '请输入', code: 'amountEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '74', name: '亿', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '3'},
      {cId: '75', name: '万', type: 'button', col: 'col-xs-1', code: 'amountUnit', val: '2'}]
  },
  {
    id: '4', title: '运作时间', code: 'operationTimeStart', child: [
      {cId: '41', name: '不早于', type: 'label', col: 'col-xs-1'},
      {cId: '42', name: '请输入日期', type: 'date', col: 'col-xs-2', val: ''}]
  },
  {
    id: '6', title: '收益率', style: 'special', child: [
      {cId: '61', name: '请输入', code: 'interestrateStart', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '62', name: '-', type: 'span', col: 'col-xs-1'},
      {cId: '63', name: '请输入', code: 'interestrateEnd', type: 'input', col: 'col-xs-2', val: ''},
      {cId: '64', name: '%', type: 'label'}]
  }
];

@Component({
  templateUrl: 'managementPlan.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class ManagementPlanComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.managementPlan.shelve'; // 按钮权限
  private seletedManagementPlan: ManagementPlan; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private managementPlan: ManagementPlan[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private managementPlanService: ManagementPlanService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(managementPlan: ManagementPlan) {
    this.seletedManagementPlan = managementPlan;
    this.productState = managementPlan.state;
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
    this.managementPlanService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.managementPlan = result.data;
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
    if (!me.seletedManagementPlan) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.managementPlanService.updateState(me.seletedManagementPlan.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedManagementPlan = null;
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
