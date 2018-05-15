import { Component, OnInit, SecurityContext  } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { HttpService } from '../shared/http/http.service';

import { ToastService } from '../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../shared/toast/toast-model';
import { CustomValidators } from '../shared/custom-validator/custom-validator';
import { UserBusinessService} from '../business-service/user/user-business.service';
import { Utils } from "../shared/util/utils";
import { DomSanitizer } from "@angular/platform-browser";




@Component({
  selector: 'c-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',]
})
export class LoginComponent implements OnInit {

  private verifyCode:any;

  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private toastService: ToastService, 
    private httpService: HttpService,
    private userBusinessService:UserBusinessService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder) {
    let userNameFc = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)]));
    let passwordFc = new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)]));
    let verifyCodeFc = new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)]));

    this.loginForm = this.formBuilder.group({
      account: userNameFc,
      passWord: passwordFc,
      verifyCode: verifyCodeFc
    });
  }

  /**
  * 初始化
  */
  ngOnInit() {
    this.getVerify();
  }

  getVerify(){
    let that = this;
    this.httpService.get(this.userBusinessService.getVerify(), {
    }, function (successful, data, res) {
      //下面这句代码是为了解决路径不安全的问题，WARNING: sanitizing unsafe URL value，这个问题在上传文件时可能也会遇到
      that.verifyCode = that.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.data.img);
    });
  }


  /**
   * 登录
   */
  login() {
    if (this.loginForm.valid) {
      let that = this;
      this.httpService.post(this.userBusinessService.login(), {
        account:  this.loginForm.controls['account'].value,
        passWord:  this.loginForm.controls['passWord'].value,
        verifyCode: this.loginForm.controls['verifyCode'].value
      }, function (successful, data, res) {
        if (successful && Utils.resultSuccess(data.success)) {
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '登录成功', 3000);
          that.toastService.toast(toastCfg);
          that.router.navigate(['/app/home']);
        }
      });

    }
    
    // const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '登录成功！', 3000);
    // this.toastService.toast(toastCfg);
    // this.router.navigate(['/app/home']);
  }


}