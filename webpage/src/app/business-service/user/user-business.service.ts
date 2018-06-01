import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpService } from '../../shared/http/http.service';
import { HttpClientService } from '../../shared/http-client/http-client.service';
import { LoginRequest } from '../../login/model/login.request';

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

  getVerify(){
    let url = environment.domain+"/login/getVerify";
    console.log("findByMember  url " + url)

    return this.httpClient.get(url);
   
  }


}
