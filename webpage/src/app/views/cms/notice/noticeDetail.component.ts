// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Notice} from './model/notice';
import { NoticeService } from './notice.service';
import { ReturnCode } from '../../../model/returnCode';

@Component({
    templateUrl: 'noticeDetail.component.html'
  })
  export class NoticeDetailComponent implements OnInit {

    private notice = new Notice();


    constructor(
        private route: ActivatedRoute,
        private noticeService: NoticeService,

    ) {}

      ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')
        this.notice.id = id;
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
  }
