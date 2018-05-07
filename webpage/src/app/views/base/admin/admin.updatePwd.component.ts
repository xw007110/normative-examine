// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

// model
import { Admin } from './model/admin';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

// service
import { AdminService } from './admin.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

@Component({
  templateUrl: 'admin.updatePwd.component.html'
})
export class UpdatePwdComponent implements OnInit {
  public form: FormGroup;  
  private errMsg: string;
  
  @Input()
  private admin = new Admin();
  private seletedAdmins: Admin[] = []; // 选中的人员列表

    private toasterService: ToasterService;

      public toasterconfig: ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

  constructor(private router: Router,
    private adminService: AdminService,
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

      this.form = this.fb.group({
        password: ['', Validators.required],
        id: ['']
        
      });
      this.form.controls['id'].setValue(id);
  }
  public doUpdatePwd({value, valid}: { value: Admin, valid: boolean }) {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.adminService.resetPassword(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/base/admin/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改密码发生异常');
      })
  });

  }

  reset(){
    const me = this;
    me.form.reset();
  }

}





