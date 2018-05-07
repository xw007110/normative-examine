// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {MsgNotify} from './model/msgNotify';
import {MsgNotifyParams} from './model/msgNotify.params';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// service
import {MsgNotifyService} from './msgNotify.service';
import {StorageService} from '../../../providers/storage.service';

@Component({
  templateUrl: 'msgNotify.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class MsgNotifyComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载推送通知列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedFeedbacksChange = new EventEmitter<MsgNotify[]>();

  private msgNotifys: MsgNotify[]; // 表格数据

  private buttons: string[] = []; // 权限按钮id数组
  private msgNotifyParams: MsgNotifyParams = new MsgNotifyParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private msgNotifyService: MsgNotifyService,
              private modalService: BsModalService,
              private messageService: MessageModalService,
              private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
  }

  ngOnInit() {
    this.query();

  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.loadMsgOrgGrid.loaded = false;
    this.msgNotifyService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.msgNotifyParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.msgNotifys = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgOrgGrid.loaded = true;
        } else {
          this.loadMsgOrgGrid.loaded = false;
          this.loadMsgOrgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgOrgGrid.loaded = false;
        this.loadMsgOrgGrid.message = '推送列表加载失败';
      })
    ;
  }



}
