// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Feedback} from './model/feedback';
import { FeedbackService } from './feedback.service';
import { ReturnCode } from '../../../model/returnCode';

@Component({
    templateUrl: 'feedbackDetail.component.html'
  })
  export class FeedbackDetailComponent implements OnInit {

    private feedback = new Feedback();


    constructor(
        private route: ActivatedRoute,
        private feedbackService: FeedbackService,

    ) {}

      ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')
        this.feedback.id = id;
        this.feedbackService.get(id)
        .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.feedback = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
        )


      }
  }
