// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {MessageTemplate} from './model/messageTemplate';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// service
import {MessageTemplateService} from './messageTemplate.service';

@Component({
  templateUrl: 'messageTemplate.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class MessageTemplateComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载短信模版列表');

  private messageTemplates: MessageTemplate[]; // 表格数据
  private selectedMessageTemplate: MessageTemplate;

  private start = 0; // 开始页
  private limit = 10; // 每页条数

  private pageParams: Page = new Page();

  constructor(private router: Router,
              private messageTemplateService: MessageTemplateService,
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
    this.selectedMessageTemplate = null; // 将选中的对象清空
    this.loadMsgOrgGrid.loaded = false;
    this.messageTemplateService.page(this.pageParams.curPage - 1, this.pageParams.pageData)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.messageTemplates = result.data;
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
        this.loadMsgOrgGrid.message = '短信模版列表加载失败';
      })
    ;
  }

  delete(messageTemplate: MessageTemplate): void {
    const me = this;
    if (me.judge()) {
      this.messageService.confirm('', '确认删除？', function (dialog) {
        me.messageTemplateService.delete(me.selectedMessageTemplate.id)
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


  recordCheck(messageTemplate) {
    this.selectedMessageTemplate = messageTemplate;
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedMessageTemplate) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    return true;
  }


}
