// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

// service
import { PersonService } from './person.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { Person } from './model/person';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

@Component({
  templateUrl: 'person.update.component.html'
})
export class PersonUpdateComponent implements OnInit {

  bsModalRef: BsModalRef;
  private errMsg: string;
  
  public form: FormGroup;  
  

  @Input()
  private person = new Person();

  private toasterService: ToasterService;

    public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private router: Router,
    private personService: PersonService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    toasterService: ToasterService,
    private messageService: MessageModalService,
    public fb: FormBuilder
  ) {
      this.toasterService = toasterService;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.personService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.person = result.data;
          // console.log(result.data);
        } else {
          this.errMsg = returnCode.message;
        }
      }
      )
      .catch(error => this.errMsg = '信息获取失败');
      this.form = this.fb.group({
        id: [''],
        name: [''],
        sex: [''],
        birthday: [''],
        mobile: ['',Validators.pattern('^[1][3,4,5,7,8][0-9]{9}$')],
        tel: [''],
        email: ['', Validators.pattern('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')],
        department: [''],
        job: [''],
        address: [''],
        remark: ['']
      });

  }
  public doUpdate({value, valid}: { value: Person, valid: boolean }) {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.personService.update(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/base/person/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改操作发生异常');
      })
  });

  }

  reset(){
    const me = this;
    me.form.reset();
  }

  date(){
    if(new Date(this.form.controls['birthday'].value)>new Date()){
      this.form.controls['birthday'].setValue('');
      this.messageService.alert('', "日期无效");
      return true;
    }
  }

}

