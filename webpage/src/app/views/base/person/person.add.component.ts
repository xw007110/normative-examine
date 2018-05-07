// 系统
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';


// model
import { PersonService } from './person.service';
import { ReturnCode } from '../../../model/returnCode';
import { Person } from './model/person';
import { Organization } from '../organization/model/organization';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// component
import { OrganizationSelectModalComponent } from '../organization/organization.select.modal.component';

@Component({
  templateUrl: 'person.add.component.html'
})
export class PersonAddComponent {
  public form: FormGroup;  

  @Input()
  private person = new Person();

  constructor(private router: Router,
     private personService: PersonService,
     private modalService: BsModalService,
     private messageService: MessageModalService,                   
     public fb: FormBuilder
    ) {

      this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      organizationName: ['', Validators.required],
      organizationId: ['', Validators.required],
      name: ['', Validators.required],      
      sex: [''],
      birthday: [''],
      mobile: ['',Validators.pattern('^[1][3,4,5,7,8][0-9]{9}$')],
      tel: ['',Validators.pattern('0\\d{2,3}-\\d{5,9}')],
      email: ['', Validators.pattern('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')],
      department: [''],
      job: [''],
      address: [''],
      remark: [''],
    });
  }


  public selectOrg(): void {
    const bsModalRef: BsModalRef = this.modalService.show(OrganizationSelectModalComponent);
    const me = this;
    const content: OrganizationSelectModalComponent = bsModalRef.content;
    content.action.ok = function(){
      const selectedNode = content.selectedNode;
      if (!selectedNode) {
        content.message = '请选择一个机构';
      } else {
        const selectedOrg: Organization = selectedNode.data;
        me.form.controls['organizationId'].setValue(selectedOrg.id);
        me.form.controls['organizationName'].setValue(selectedOrg.name);
        bsModalRef.hide();
      }
    }
  }

  public doAdd({value, valid}: { value: Person, valid: boolean }) {
    this.personService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/base/person/list']);
        } else {
          this.messageService.alert('', returnCode.message+"，请查看所属机构是否锁定");          
        }
      })
      .catch()
      ;

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

