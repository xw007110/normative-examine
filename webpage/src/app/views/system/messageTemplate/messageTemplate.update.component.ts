// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// service
import { MessageTemplateService } from './messageTemplate.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { ReturnCode } from '../../../model/returnCode';
import { MessageTemplate } from './model/messageTemplate';

@Component({
  templateUrl: 'messageTemplate.update.component.html'
})
export class MessageTemplateUpdateComponent implements OnInit {

  bsModalRef: BsModalRef;


  @Input()
  private messageTemplate = new MessageTemplate();

  constructor(private router: Router,
    private messageTemplateService: MessageTemplateService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessageModalService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.messageTemplateService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.messageTemplate = result.data;
        } else {
          console.log(returnCode.message);
        }
      }
      )

  }
  public doUpdate() {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.messageTemplateService.update(me.messageTemplate)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/sys/messageTemplate/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改发生异常');
      })
  });

  }



}

