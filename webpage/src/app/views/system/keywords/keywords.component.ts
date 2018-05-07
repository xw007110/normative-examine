// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {Keywords} from './model/keywords';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// service
import {KeywordsService} from './keywords.service';

@Component({
  templateUrl: 'keywords.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class KeywordsComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载关键字列表');

  private keywords: Keywords[]; // 表格数据
  private selectedKeywords: Keywords;

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private pageParams: Page = new Page();

  constructor(private router: Router,
              private keywordsService: KeywordsService,
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
    this.selectedKeywords = null; // 将选中的对象清空
    this.loadMsgOrgGrid.loaded = false;
    this.keywordsService.page(this.pageParams.curPage - 1, this.pageParams.pageData)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.keywords = result.data;
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
    if (me.judge()) {
      this.router.navigate(['/sys/keyword/update', me.selectedKeywords.id]);
    }
  }
  goAdd() {
    this.router.navigate(['/sys/keyword/add']);
  }

  delete(keywords: Keywords): void {
    const me = this;
    if (me.judge()) {
      this.messageService.confirm('', '确认删除？', function (dialog) {
        me.keywordsService.delete(me.selectedKeywords.id)
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


  recordCheck(keywords) {
    this.selectedKeywords = keywords;
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedKeywords) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    return true;
  }


}
