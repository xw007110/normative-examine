// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

// model
import { Member } from './model/member';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

// service
import { MemberService } from './member.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

@Component({
  templateUrl: 'member.modifyMobile.component.html'
})
export class ModifyMobileComponent implements OnInit {
  public form: FormGroup;  
  private errMsg: string;
  
  @Input()
  private member = new Member();

    private toasterService: ToasterService;

      public toasterconfig: ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

  constructor(private router: Router,
    private memberService: MemberService,
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
        mobile: ['',[ Validators.required, Validators.pattern('^[1][3,4,5,7,8][0-9]{9}$')]],
        id: ['']
        
      });
      this.form.controls['id'].setValue(id);
  }
  public doModifyMobile({value, valid}: { value: Member, valid: boolean }) {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.memberService.modifyMobile(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/base/member/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改手机号发生异常');
      })
  });

  }

  reset(){
    const me = this;
    me.form.reset();
  }

}





