// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// service
import { NoticeService } from './notice.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { ReturnCode } from '../../../model/returnCode';
import { Notice } from './model/notice';

@Component({
  templateUrl: 'notice.update.component.html'
})
export class NoticeUpdateComponent implements OnInit {

  bsModalRef: BsModalRef;


  @Input()
  private notice = new Notice();

  constructor(private router: Router,
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessageModalService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.noticeService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.notice = result.data;
        } else {
          console.log(returnCode.message);
        }
      }
      )

  }
  public doUpdate() {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.noticeService.update(me.notice)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/cms/notice/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改发生异常');
      })
  });

  }

  reset(){
    const me = this;
    me.notice.title = "";
    me.notice.content = "";
    me.notice.imgurl = "";
    me.notice.remark = "";
    me.notice.status = null;
    me.notice.validity = "";
  }

}

