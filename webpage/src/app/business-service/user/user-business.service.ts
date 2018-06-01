import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/http/http.service';
import { HttpClientService } from '../../shared/http-client/http-client.service';
import { LoginRequest } from '../../login/model/login.request';
import { UserInfo } from '../../business/user/model/user.info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserBusinessService {

  constructor(private httpService: HttpService,private httpClient :HttpClientService) { }

  
  /**
   * 登录
   */
  login(loginRequest :LoginRequest){
    let url = environment.domain+"/login/doLogin";
    return  this.httpClient.post(url,LoginRequest);
  }

  /**
   * 获取验证码
   */
  getVerify(){
    let url = environment.domain+"/login/getVerify";
    return this.httpClient.get<any>(url);
  }

/**
   * 新增用户
   */
  aveUser(userInfo:UserInfo){
    let url = environment.domain+"/user/saveUser";
    return  this.httpClient.post(url,userInfo);
  }

  /**
   * 用户列表
   */
  listUser(page, pageSize,userName){
    let url = environment.domain+"/user/listUser";
    return this.httpClient.get(url);
  }


  
}
