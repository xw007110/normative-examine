// 系统
import { Component, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// model
import { MessageTemplateService } from './messageTemplate.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

import { ReturnCode } from '../../../model/returnCode';
import { MessageTemplate } from './model/messageTemplate';

@Component({
  templateUrl: 'messageTemplate.add.component.html'
})
export class MessageTemplateAddComponent {
  public form: FormGroup;  
  
  @Input()
  private messageTemplate = new MessageTemplate();

  constructor(private router: Router,
     private messageTemplateService: MessageTemplateService,
     public fb: FormBuilder,
     public el: ElementRef,
     private messageService: MessageModalService,
     
    ) {
      this.createForm();
      

  }

  createForm() {
    this.form = this.fb.group({
      content: ['', Validators.required],
      name: ['', Validators.required],
      type: [''],
      remark: [''],
    });
  }

  addBtn(value){
    this.form.controls['content'].setValue(this.form.controls['content'].value+'<ftl>'+value+'<ftl>');
  }

  public doAdd({value, valid}: { value: MessageTemplate, valid: boolean }) {
    this.messageTemplateService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/cms/messageTemplate/list']);
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

