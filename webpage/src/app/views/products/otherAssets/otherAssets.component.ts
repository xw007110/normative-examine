// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {OtherAssetsService} from './otherAssets.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {OtherAssets} from './model/otherAssets';

const itemList: any[] = [
  {
    id: '8', title: '产品名称', code: 'name', child: [
      {cId: '81', name: '请输入', type: 'input', col: 'col-sm-4 no-padding ', val: ''}]
  },
  {
    id: '5', title: '规模', style: 'special',  itemFlag: '', child: [
      {cId: '51', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'amountStart', val: ''},
      {cId: '52', name: '-', type: 'span'},
      {cId: '53', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'amountEnd', val: ''},
      {cId: '54', name: '亿', type: 'button', col: 'col-sm-1', code: 'amountUnit', val: '3'},
      {cId: '55', name: '万', type: 'button', col: 'col-sm-1', code: 'amountUnit', val: '2'}]
  },
  {
    id: '4', title: '收益率', style: 'special',  child: [
      {cId: '41', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'interestrateStart', val: ''},
      {cId: '42', name: '-', type: 'span'},
      {cId: '43', name: '请输入', type: 'input', col: 'col-sm-4 no-padding', code: 'interestrateEnd', val: ''},
      {cId: '44', name: '%', type: 'label'}]
  }
];
@Component({
  templateUrl: 'otherAssets.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class OtherAssetsComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.otherAssets.shelve'; // 按钮权限
  private seletedOtherAssets: OtherAssets; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();
  ''
  private otherAssets: OtherAssets[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private otherAssetsService: OtherAssetsService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(otherAssets: OtherAssets) {
    this.seletedOtherAssets = otherAssets;
    this.productState = otherAssets.state;
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
    this.otherAssetsService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.otherAssets = result.data;
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
    if (!me.seletedOtherAssets) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.otherAssetsService.updateState(me.seletedOtherAssets.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedOtherAssets = null;
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
