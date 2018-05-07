// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {Feedback} from './model/feedback';
import {FeedbackParams} from './model/feedback.params';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// service
import {FeedbackService} from './feedback.service';
import {StorageService} from '../../../providers/storage.service';

@Component({
  templateUrl: 'feedback.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class FeedbackComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载广告列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedFeedbacksChange = new EventEmitter<Feedback[]>();

  private feedbacks: Feedback[]; // 表格数据
  private selectedFeedback: Feedback; // 选中的记录

  private buttons: string[] = []; // 权限按钮id数组
  private feedbackParams: FeedbackParams = new FeedbackParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private feedbackService: FeedbackService,
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
    this.selectedFeedback = null; // 将选中的列表清空
    this.loadMsgOrgGrid.loaded = false;
    this.feedbackService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.feedbackParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.feedbacks = result.data;
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
        this.loadMsgOrgGrid.message = '反馈列表加载失败';
      })
    ;
  }

  recordCheck(feedback) {
    this.selectedFeedback = feedback;
  }

  handle(): void {
    const me = this;
    // 操作判断
    if (!me.selectedFeedback) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    if(me.selectedFeedback.state = 1){
      me.selectedFeedback.state = 2;
      me.feedbackService.checking(me.selectedFeedback)
        .then(result => {
          if (result.returnCode.code === '0000') {
            me.messageService.alert('', '操作成功');
            me.query();
          } else {
            me.messageService.alert('', result.returnCode.message);
          }
        })
        .catch(error => {
          me.messageService.alert('', '操作发生异常');
        });
    } else {
      me.messageService.alert('', '不可进行此项操作');
    }
    
  }

  goChecked() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/memberbase/feedback/add', me.selectedFeedback.id]);
    }
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedFeedback) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    return true;
  }

}
