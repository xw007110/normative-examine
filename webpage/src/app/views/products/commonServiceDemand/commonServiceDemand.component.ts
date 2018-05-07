// 系统
import {Component, OnInit} from '@angular/core';

// service
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {CommonServiceDemandService} from './commonServiceDemand.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Page} from '../../base/page/model/page';
import {CommonServiceDemand} from './model/commonServiceDemand';
const itemList: any[] = [
  {
    id: '2', title: '服务类型', code: 'type', itemFlag: '', child: [
      {cId: '21', name: '承销', type: 'button', col: 'col-xs-1', val: '1'},
      {cId: '22', name: '评级', type: 'button', col: ' col-xs-1', val: '2'},
      {cId: '23', name: '代理挂牌', type: 'button', col: 'col-xs-1', val: '3'},
      {cId: '24', name: '并购顾问', type: 'button', col: 'col-xs-1', val: '4'},
      {cId: '25', name: '其他服务', type: 'button', col: ' col-xs-1', val: '5'}]
  },
  {
    id: '3', title: '服务标题', code: 'title', child: [
      {cId: '31', name: '请输入', type: 'input', col: 'col-xs-6', val: ''}]
  }
];
@Component({
  templateUrl: 'commonServiceDemand.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class CommonServiceDemandComponent implements OnInit {

  itemList = itemList;
  productState; // 产品状态 上下架使用
  toggleFlag: Boolean; // 隐藏标志
  isLoading: Boolean = false; // 加载标志
  buttonPermission: String = 'products.commonServiceDemand.shelve'; // 按钮权限
  private seletedCommonServiceDemand: CommonServiceDemand; // 选中的人员列表
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  // 分页
  private pageParams: Page = new Page();
  private commonServiceDemand: CommonServiceDemand[]; // 线下资金列表
  private param = new Object; // 查询参数

  constructor(private commonServiceDemandService: CommonServiceDemandService,
              private messageService: MessageModalService) {

  }

  ngOnInit() {
    this.query();
  }

  recordCheck(commonServiceDemand: CommonServiceDemand) {
    this.seletedCommonServiceDemand = commonServiceDemand;
    this.productState = commonServiceDemand.state;
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
    this.commonServiceDemandService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.commonServiceDemand = result.data;
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
    if (!me.seletedCommonServiceDemand) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.commonServiceDemandService.updateState(me.seletedCommonServiceDemand.id, productState)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.seletedCommonServiceDemand = null;
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
