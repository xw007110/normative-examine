// 系统
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import {TreeModule, TreeNode} from 'primeng/primeng';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// model
import { MemberService } from './member.service';
import { ReturnCode } from '../../../model/returnCode';
//import { Person } from './model/person';
import { Organization } from '../organization/model/organization';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import {StorageService} from '../../../providers/storage.service';

// component
import { OrgSelectModalComponent } from './orgselect.modal.component';
import { Member } from 'app/views/base/member/model/member';
import { Authentication } from "./model/authenticate";

@Component({
  templateUrl: 'authenticate.component.html'
})
export class AuthenticateComponent implements OnInit{
  //public form: FormGroup;  

  private errMsg: string;
  
  @Input()
  private member = new Member();
  private authentication = new Authentication();
  private buttons: string[] = []; // 权限按钮id数组
  private valid:boolean = true;
  constructor(private router: Router,
     private route: ActivatedRoute,    
     private memberService: MemberService,
     private modalService: BsModalService,
     private messageService: MessageModalService,                   
    // public fb: FormBuilder,
     private storageService: StorageService
    ) {
        this.buttons = this.storageService.getButtons();        
      //this.createForm();
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.memberService.get(id)
      .then(
      result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.member = result.data;
        } else {
          this.errMsg = returnCode.message;
        }
      }
      )
      .catch(error => this.errMsg = '信息获取失败');
      
  }

  // createForm() {
  //   this.form = this.fb.group({
  //     orgId: ['', Validators.required],
  //     personTel: ['', Validators.required],      
  //     personDepartment: ['', Validators.required],
  //     personJob: ['', Validators.required],
  //   });
  // }


  public selectOrg(): void {
    const bsModalRef: BsModalRef = this.modalService.show(OrgSelectModalComponent);
    const me = this;
    const content: OrgSelectModalComponent = bsModalRef.content;
    content.action.ok = function () {
      const selectedNode = content.selectedNode;
      if (!selectedNode) {
        content.message = '请选择一个机构';
      } else {
        const selectedOrg: TreeNode = selectedNode;
        me.member.orgId = selectedOrg['id'];
        me.member.orgTempName = selectedOrg['name']
        //me.form.controls['orgId'].setValue(selectedOrg['name']);
        bsModalRef.hide();
      }
    }
    
  }

  // public doUpdate(): void {
  //   const me = this;
  //   me.messageService.confirm('', '确认重置', function(dialog){
  //     me.memberService.update(me.member)
  //     .then(result => {
  //         const returnCode: ReturnCode = result.returnCode;
  //         dialog.close();
  //        if (returnCode.code === '0000') {
  //             me.messageService.alert('', returnCode.message);
  //             me.router.navigate(['/base/member/list']);
  //         } else {
  //             me.messageService.alert('', returnCode.message);
  //         }
  //     })
  //     .catch( error => {
  //         me.messageService.alert('', '操作发生异常');
  //     })
  // });
  // }
  
  authenticateNo() {
    const me = this;
    if(!me.validate()){
      return;
    }
    //me.doUpdate();
    me.authentication.authentication = '3'; // 审核不通过
    me.authentication.id = me.member.id;
    me.authentication.orgId = me.member.orgTempName;
    me.authentication.personDepartment = me.member.person.departmentName;
    me.authentication.personJob = me.member.person.job;
    me.authentication.personTel = me.member.person.tel;
    me.memberService.authenticate(me.authentication)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          me.router.navigate(['/base/member/list']);
        } else {
          me.messageService.alert('', result.returnCode.message);
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
      });
  }

 
  authenticateYes() {
    const me = this;
    //me.doUpdate();
    if(!me.validate()){
      return;
    }
    me.authentication.authentication = '2'; // 审核通过
    me.authentication.id = me.member.id;
    me.authentication.orgId = me.member.orgTempName;
    me.authentication.personDepartment = me.member.person.departmentName;
    me.authentication.personJob = me.member.person.job;
    me.authentication.personTel = me.member.person.tel;
    
    me.memberService.authenticate(me.authentication)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          me.router.navigate(['/base/member/list']);
        } else {
          me.messageService.alert('', result.returnCode.message);
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
      });

  }
  validate(){
    if(!this.member.orgTempName){
      this.valid = false;
      this.messageService.alert('', '机构必输');
      return false;
    }
    if(!this.member.person.departmentName){
      this.valid = false;
      this.messageService.alert('', '部门必输');
      return false;
    }
    if(!this.member.person.job){
      this.valid = false;
      this.messageService.alert('', '职务必输');
      return false;
    }
    if(!this.member.person.tel){
      this.valid = false;
      this.messageService.alert('', '电话必输');
      return false;
    }
    return true;
  }

}

