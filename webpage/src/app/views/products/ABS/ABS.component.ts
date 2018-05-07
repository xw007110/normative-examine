// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {ABSService} from './ABS.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {ABS} from './model/ABS';

const itemList: any[] = [
  {
    id: '1', title: '场所', code: 'place', itemFlag: '', child: [
      {cId: '11', name: '银登', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '12', name: '银行间', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '13', name: '上交所', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '14', name: '深交所', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '15', name: '北金所', type: 'button', col: 'col-xs-1', val: '5'},
      {cId: '16', name: '其他', type: 'button', col: 'col-xs-1', val: '6'}]
  },
  {
    id: '2', title: '是否结构化', code: 'structurization', itemFlag: '', child: [
      {cId: '21', name: '是', type: 'button', col: 'col-xs-1', val: 'true'},
      {cId: '22', name: '否', type: 'button', col: ' col-xs-1', val: 'false'}]
  },
  {
    id: '3', title: '底层资产类别', code: 'underlyingAssetsType', itemFlag: '', child: [
      {cId: '31', name: '信贷资产', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '32', name: '信托收/受益权', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '33', name: '其他', type: 'button', col: 'col-xs-1', val: '3'}]
  },
  {
    id: '4', title: '缴款日', style: 'special', child: [
      {cId: '41', name: '', type: 'date', col: 'col-xs-2', code: 'paymentTimeStart', val: ''},
      {cId: '42', name: '-', type: 'label', col: 'col-xs-1'},
      {cId: '43', name: '', type: 'date', col: 'col-xs-2', code: 'paymentTimeEnd', val: ''}]
  }
];

@Component({
  templateUrl: 'ABS.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class ABSComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.abs.shelve'; // 按钮权限
  private seletedABS: ABS; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();

  private ABS: ABS[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private ABSService: ABSService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(ABS: ABS) {
    this.seletedABS = ABS;
    this.productState = ABS.state;
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
    this.ABSService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.ABS = result.data;
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
    if (!me.seletedABS) {
      me.messageService.alert('', '请选择一条记录');
      return;
    }
    me.ABSService.updateState(me.seletedABS.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedABS = null;
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
