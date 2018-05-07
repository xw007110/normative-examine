// system
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// component
import { MerchantSelectModalComponent } from './merchant.select.modal.component';

// service
import { MerchantService } from './merchant.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import { Merchant } from './model/merchant';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';
import { MerchantSource } from './model/merchant-source.enum';

@Component({
  templateUrl: 'merchant.add.component.html'
})
export class MerchantAddComponent {
  public form: FormGroup;
  
  @Input()
  private merchant = new Merchant();


  constructor(
    private router: Router,
    private merchantService: MerchantService,
    private modalService: BsModalService,
    private messageService: MessageModalService,                  
    public fb: FormBuilder
  ) {
    this.createForm();
    
   }

   createForm() {
    this.form = this.fb.group({
      parentName: ['', Validators.required],
      parentId: [''],
      code: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      type: [''],
      remark: [''],
    });
  }

  public selectOrg(): void {
    const bsModalRef: BsModalRef = this.modalService.show(MerchantSelectModalComponent);
    const me = this;
    const content: MerchantSelectModalComponent = bsModalRef.content;
    content.action.ok = function(){
      const selectedNode = content.selectedNode;
      if (!selectedNode) {
        content.message = '请选择一个机构';
      } else {
        const selectedOrg: Merchant = selectedNode.data;
        me.form.controls['parentId'].setValue(selectedOrg.id);
        me.form.controls['parentName'].setValue(selectedOrg.name);
        bsModalRef.hide();
      }
    }
  }

  public doAdd({value, valid}: { value: Merchant, valid: boolean }) {
    value.type = MerchantSource.Member;
    this.merchantService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/memberbase/merchant/list']);
        } else {
          this.messageService.alert('', returnCode.message+"，请查看上级机构是否锁定");          

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

