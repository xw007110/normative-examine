// 系统
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// model
import { NoticeService } from './notice.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

import { ReturnCode } from '../../../model/returnCode';
import { Notice } from './model/notice';

@Component({
  templateUrl: 'notice.add.component.html'
})
export class NoticeAddComponent {
  public form: FormGroup;  
  
  @Input()
  private notice = new Notice();
  // public dt:Date = new Date();
  // public minDate:Date = void 0;
  constructor(private router: Router,
     private noticeService: NoticeService,
     public fb: FormBuilder,
     private messageService: MessageModalService,
     
    ) {
    // (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.createForm();
    
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      imgurl: ['', Validators.required],
      remark: [''],
      status: ['', Validators.required],
      validity: ['', Validators.required]
    });
  }


  public doAdd({value, valid}: { value: Notice, valid: boolean }) {
    this.noticeService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/cms/notice/list']);
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
  // public getDate():number {
  //   return this.dt && this.dt.getTime() || new Date().getTime();
  // }
}

