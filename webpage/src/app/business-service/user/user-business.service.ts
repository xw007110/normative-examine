import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserBusinessService {

  constructor() { }

  
  /**
   * 登录
   */
  login(){
    return environment.domain+"/login/doLogin";
  }

  getVerify(){
    return environment.domain+"/login/getVerify";
  }


}