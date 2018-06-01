import { Component, OnInit, SecurityContext  } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { HttpService } from '../shared/http/http.service';

import { ToastService } from '../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../shared/toast/toast-model';
import { CustomValidators } from '../shared/custom-validator/custom-validator';
import { UserBusinessService} from '../business-service/user/user-business.service';
import { Utils } from '../shared/util/utils';
import { DomSanitizer } from '@angular/platform-browser';
import {Md5} from "ts-md5/dist/md5";




@Component({
  selector: 'c-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', ]
})
export class LoginComponent implements OnInit {

  private verifyCode:any;

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private userBusinessService: UserBusinessService,
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

  getVerify() {


    let observable = this.userBusinessService.getVerify();
    observable.subscribe(
      data => {
          this.verifyCode = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.data.img);
      },
      error => {
        console.log("findByMember  url " + error)
        return;

      }
    );
  }
   



  /**
   * 登录
   */
  login() {
    if (this.loginForm.valid) {
    let observable = this.userBusinessService.login(this.loginForm.value);
      observable.subscribe(
        data => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '登录成功', 3000);
                  this.toastService.toast(toastCfg);
                  this.router.navigate(['/app/home']);
        },
        error => {
          console.log("findByMember  url " + error)
          return;
  
        }
      );

    }

  }


}