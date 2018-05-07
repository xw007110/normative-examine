import {Component, Input, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

import {LoginService} from './login.service';
import {StorageService} from '../../providers/storage.service';

import {Result} from '../../model/result';
import {ReturnCode} from '../../model/returnCode';
import {LoginRequest} from './model/login.request';
import {LoginResponse} from './model/login.response';

import {Permission} from '../../model/permission';
import {User} from '../../model/user';
import {Button} from '../../model/button';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  @Input()
  private username: string;

  @Input()
  private password: string;

  private showSuccess = false;
  private showErrorMessage = false;
  private errorMessage:string;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private router: Router,
              private loginService: LoginService,
              private storageService: StorageService,
              private el: ElementRef) {
    this.username = 'admin';
    this.password = '123456';
  }


  public doLogin() {
    const l = this.el.nativeElement.querySelector('#loginButton');
    l.style.disabled = 'disabled';
    this.showSuccess = false;
    this.showErrorMessage = false;
    this.loginService.login(this.username, this.password)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        const loginResponse: LoginResponse = result.data;
        if (returnCode.code === '0000') {
          // 一级菜单为根目录，不需要显示
          const user = new User(
            loginResponse.userId,
            loginResponse.name,
            loginResponse.username,
            loginResponse.token,
            loginResponse.rongcloudToken
          );
          this.storageService.saveUser(user);
          const permission: Permission = loginResponse.permission;

          this.storageService.savePermission(permission);
          // 按钮权限
          const buttonIds: string[] = [];
          const buttonArray: Button[] = loginResponse.buttons;
          for (const button of buttonArray) {
            buttonIds.push(button.code);
          }
          this.storageService.saveButtons(buttonIds);
          this.router.navigate(['/dashboard']);
          this.showSuccess = true;
        } else {
          this.showErrorMessage = true;
          l.style.disabled = '';
          this.errorMessage = result.returnCode.message;
        }
      })
      .catch(error => {
        this.showErrorMessage = true;
        this.errorMessage = '请求失败，请稍后重试...';
      })
    ;
  }
}
