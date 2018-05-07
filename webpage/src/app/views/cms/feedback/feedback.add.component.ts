// 系统
import {Component, Input} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// model
import {FeedbackService} from './feedback.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

import {ReturnCode} from '../../../model/returnCode';
import {Feedback} from './model/feedback';

@Component({
  templateUrl: 'feedback.add.component.html'
})
export class FeedbackAddComponent {
  public form: FormGroup;

  @Input()
  private feedback = new Feedback();

  constructor(private router: Router,
              private feedbackService: FeedbackService,
              public fb: FormBuilder,
              private messageService: MessageModalService,
              private route: ActivatedRoute) {
    this.createForm();


  }

  createForm() {
    this.form = this.fb.group({
      result: ['', Validators.required]
    });
  }

  public doAdd({value, valid}: { value: Feedback, valid: boolean }) {
    value.id = this.route.snapshot.paramMap.get('id')
    value.state = 3;
    this.feedbackService.checking(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.messageService.alert('', returnCode.message);
          this.router.navigate(['/cms/feedback/list']);
        } else {
          this.messageService.alert('', returnCode.message);

        }
      })
      .catch()
    ;

  }

  reset(){
    const me = this;
    me.form.reset();
  }

}

