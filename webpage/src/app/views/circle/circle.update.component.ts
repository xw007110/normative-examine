// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// service
import { CircleService } from './circle.service';
import { MessageModalService } from '../../components/app-common/app-modal/message.modal.service';

// model
import { ReturnCode } from '../../model/returnCode';
import { Circle } from './model/circle';

@Component({
  templateUrl: 'circle.update.component.html'
})
export class CircleUpdateComponent implements OnInit {
  public form: FormGroup;  
  
  bsModalRef: BsModalRef;
  private errMsg: string;
  

  @Input()
  private circle = new Circle();

  constructor(private router: Router,
    private circleService: CircleService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    public fb: FormBuilder
    
  ) {

    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [''],
      accommodate: [''],      
      remark: ['']
    });
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.circleService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.circle = result.data;
          // console.log(result.data);
        } else {
          this.errMsg = returnCode.message;
        }
      }
      )
      .catch(error => this.errMsg = '信息获取失败');

  }
  public doUpdate({value, valid}: { value: Circle, valid: boolean }) {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.circleService.update(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/circle/list']);
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
    me.form.reset();
  }

}

