// system
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
// component
import {OrganizationSelectModalComponent} from './organization.select.modal.component';

// service
import {OrganizationService} from './organization.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';

// model
import {Organization} from './model/organization';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {OrganizationSource} from './model/organization-source.enum';

@Component({
  templateUrl: 'organization.add.component.html'
})
export class OrganizationAddComponent implements OnInit {
  public form: FormGroup;
  @Input()
  private org = new Organization();


  constructor(private router: Router,
              private organizationService: OrganizationService,
              private modalService: BsModalService,
              private messageService: MessageModalService,                            
              public fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {

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
    const bsModalRef: BsModalRef = this.modalService.show(OrganizationSelectModalComponent);
    const me = this;
    const content: OrganizationSelectModalComponent = bsModalRef.content;
    content.action.ok = function () {
      const selectedNode = content.selectedNode;
      if (!selectedNode) {
        content.message = '请选择一个机构';
      } else {
        const selectedOrg: Organization = selectedNode.data;
        me.form.controls['parentId'].setValue(selectedOrg.id);
        me.form.controls['parentName'].setValue(selectedOrg.name);
        bsModalRef.hide();
      }
    }
  }

  public doAdd({value, valid}: { value: Organization, valid: boolean }) {
    console.log(value.remark);
    value.type = "1";
    this.organizationService.add(value)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/base/organization/list']);
        } else {
          this.messageService.alert('', returnCode.message+"，请查看父机构是否锁定");          
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

