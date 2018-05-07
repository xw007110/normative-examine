// system
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


// service
import { MerchantService } from './merchant.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { Merchant } from './model/merchant';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';

@Component({
  templateUrl: 'merchant.update.component.html'
})
export class MerchantUpdateComponent implements OnInit {

  bsModalRef: BsModalRef;

  private errMsg: string;

  public form: FormGroup;  
  

  @Input()
  private org = new Merchant();

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    tapToDismiss: true,
    timeout: 5000
  });

  constructor(private router: Router,
    private merchantService: MerchantService,
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
    this.merchantService.get(id)
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
        name: [''],
        remark: ['']
        
      });
  }

  public doUpdate(): void {
    const me = this;
    me.messageService.confirm('', '确认修改', function(dialog){
      me.merchantService.update(this.org)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/base/merchant/list']);
          } else {
              me.messageService.alert('', returnCode.message);
          }
      })
      .catch( error => {
          me.messageService.alert('', '重置密码发生异常');
      })
  });
  }

  reset(){
    const me = this;
    me.form.reset();
  }
}
