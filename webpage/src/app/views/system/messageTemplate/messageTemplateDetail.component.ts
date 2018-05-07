// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { MessageTemplate} from './model/messageTemplate';
import { MessageTemplateService } from './messageTemplate.service';
import { ReturnCode } from '../../../model/returnCode';

@Component({
    templateUrl: 'messageTemplateDetail.component.html'
  })
  export class MessageTemplateDetailComponent implements OnInit {

    private messageTemplate = new MessageTemplate();


    constructor(
        private route: ActivatedRoute,
        private messageTemplateService: MessageTemplateService,

    ) {}

      ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')
        this.messageTemplate.id = id;
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
  }
