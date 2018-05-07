// system
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


// service
import { OrganizationService } from './organization.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { Organization } from './model/organization';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

@Component({
  templateUrl: 'organization.update.component.html'
})
export class OrganizationUpdateComponent implements OnInit {

  bsModalRef: BsModalRef;

  private errMsg: string;

  public form: FormGroup;  

  @Input()
  private org = new Organization();

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

  constructor(private router: Router,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    toasterService: ToasterService,
    private messageService: MessageModalService,
    public fb: FormBuilder
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.organizationService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.org = result.data;
        } else {
          this.errMsg = returnCode.message;
        }
      }
      )
      .catch(error => this.errMsg = '信息获取失败');
      this.form = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        remark: ['']
        
      });
  }

  public doUpdate({value, valid}: { value: Organization, valid: boolean }): void {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.organizationService.update(value)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/base/organization/list']);
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
}
