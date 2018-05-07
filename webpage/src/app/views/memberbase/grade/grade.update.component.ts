// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// service
import { GradeService } from './grade.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { ReturnCode } from '../../../model/returnCode';
import { Grade } from './model/grade';

@Component({
  templateUrl: 'grade.update.component.html'
})
export class GradeUpdateComponent implements OnInit {
  public form: FormGroup;  
  
  bsModalRef: BsModalRef;
  private errMsg: string;
  

  @Input()
  private grade = new Grade();

  constructor(private router: Router,
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    public fb: FormBuilder
    
  ) {

    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''], 
      score: ['', Validators.required],
      remark: ['']
    });
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.form.controls['id'].setValue(id);
    this.gradeService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.grade = result.data;
          // console.log(result.data);
        } else {
          this.errMsg = returnCode.message;
        }
      }
      )
      .catch(error => this.errMsg = '信息获取失败');

  }
  public doUpdate({value, valid}: { value: Grade, valid: boolean }) {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.gradeService.update(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/memberbase/grade/list']);
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

