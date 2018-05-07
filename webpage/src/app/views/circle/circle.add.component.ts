// 系统
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// model
import {CircleService} from './circle.service';
import { MessageModalService } from '../../components/app-common/app-modal/message.modal.service';

import {ReturnCode} from '../../model/returnCode';
import {Circle} from './model/circle';

@Component({
  templateUrl: 'circle.add.component.html'
})
export class CircleAddComponent {
  public form: FormGroup;

  @Input()
  private circle = new Circle();

  constructor(private router: Router,
              private circleService: CircleService,
              private messageService: MessageModalService,                            
              public fb: FormBuilder) {

    this.createForm();

  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      accommodate: ['',[Validators.required,Validators.pattern('^[1-9]\d*|0$')]],
      remark: ['']
    });
  }

  public doAdd({value, valid}: { value: Circle, valid: boolean }) {
    this.circleService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/circle/list']);
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

