// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// service
import {NoticeService} from './notice.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// model
import {Notice} from './model/notice';
import {NoticeParams} from './model/notice.params';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';


@Component({
  templateUrl: 'notice.component.html'
})
export class NoticeComponent implements OnInit {

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载资讯列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedNoticesChange = new EventEmitter<Notice[]>();

  private notices: Notice[]; // 表格数据
  private selectedNotices: Notice[] = [];

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private noticeParams: NoticeParams = new NoticeParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private noticeService: NoticeService,
              private modalService: BsModalService,
              private messageService: MessageModalService) {
  }

  ngOnInit() {
    this.query();

  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.selectedNotices = []; // 将选中的列表清空
    this.loadMsgOrgGrid.loaded = false;
    this.noticeService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.noticeParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.notices = result.data;
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
        this.loadMsgOrgGrid.message = '广告列表加载失败';
      })
    ;
  }

  goUpdate() {
    const me = this;
    const length = this.selectedNotices.length;
    if (length !== 1) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    this.router.navigate(['/cms/notice/update', me.selectedNotices[0].id]);
  }

  delete(notice: Notice): void {
    const me = this;
    const length = this.selectedNotices.length;
    if (length !== 1) {
      this.messageService.alert('', '请选择一条记录');
    } else {
      this.messageService.confirm('', '确认删除？', function (dialog) {
        me.noticeService.delete(me.selectedNotices[0].id)
          .then(result => {
            dialog.close();
            if (result.returnCode.code === '0000') {
              me.messageService.alert('', '删除成功');
              me.query();
            } else {
              me.messageService.alert('删除失败', result.returnCode.message);
            }
          })
          .catch(error => {
            me.messageService.alert('删除失败', '删除发生异常');
          })
        ;
      });
    }
  }

  showButton(button: string): boolean {
    if (this.disabledButtons.indexOf(button) === -1) {
      // 如果没有，则显示
      return true;
    } else {
      // 如果有，则不显示
      return false;
    }
  }

  recordCheck(notice) {
    let has = false;
    for (let index = 0; index < this.selectedNotices.length; index++) {
      const selectId = this.selectedNotices[index].id;
      if (selectId === notice.id) {
        has = true;
        this.selectedNotices.splice(index, 1);
        break;
      } else {
        has = false;
      }
    }

    if (!has) {
      this.selectedNotices.push(notice);
    }
    this.selectedNoticesChange.emit(this.selectedNotices);
  }


}
