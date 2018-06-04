import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastService } from '../../../shared/toast/toast.service';
import { CustomValidators } from '../../../shared/custom-validator/custom-validator';
import { UserBusinessService } from '../../../business-service/user/user-business.service';
import { ToastConfig, ToastType } from '../../../shared/toast/toast-model';
import { UserInfo } from '../model/user.info';

@Component({
  selector: 'c-user-add',
  templateUrl: './user-add.component.html',
  encapsulation : ViewEncapsulation.None,
})
export class UserAddComponent {

  userEditForm: FormGroup;

  constructor(private appService: AppService,public activeModal: NgbActiveModal ,
     private toastService: ToastService,
     private formBuilder: FormBuilder ,
     private userBusinessService: UserBusinessService,) {
    // this.appService.titleEventEmitter.emit("用户添加");

    let loginAccountFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(15)]));
    let userPasswordFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(15)]));
    let userNameFc  = new FormControl('',Validators.compose([Validators.required, Validators.minLength(2),Validators.maxLength(15)]));
    let  emailFc  = new FormControl('',CustomValidators.email);
    let  birthdayFc  = new FormControl('');
    let mobileFc =  new FormControl('',CustomValidators.phone);
    let  sexFc  = new FormControl('');
  
   

    this.userEditForm=this.formBuilder.group({
      loginAccount:loginAccountFc,
      userPassword:userPasswordFc,
      userName:userNameFc,
      email:emailFc,
      birthday:birthdayFc,
      mobile:mobileFc,
      sex:sexFc
    });
  }


  datePickerConfig = {
    locale: 'zh-CN',
    format:'YYYY-MM-DD'
  }

    /**
     * 上传
     */
    ok(): void {
    
      if(this.userEditForm.valid){
           console.info(this.userEditForm.value);
          //  const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '修改密码成功!', 2000);
          //  this.toastService.toast(toastCfg);
          //  this.close();
          let userInfo:UserInfo = this.userEditForm.value;
          userInfo.roleGuid = "1";
    let observable = this.userBusinessService.aveUser(userInfo);
    
    observable.subscribe(
      data => {
        if(data.code ==0){
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '添加成功' , 3000);
          this.toastService.toast(toastCfg);
          this.close();
        }
      },
      error => {
        console.log("findByMember  url " + error)
        return;

      }
    );
      }
  }


    /**
       * 关闭
       */
      close(): void {
        this.activeModal.dismiss({ status: 'closed' });
    }

}