import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Member} from './model/member';
import { Authentication } from "./model/authenticate";
import {MemberParams} from './model/member.params'


@Injectable()
export class MemberService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: MemberParams): Promise<PageResult<Member[]>> {
    let pageUrl = `${this.config.API.member.page}?start=${start}&limit=${limit}`;
    let urlParams = '';
    for (const field of Object.keys(params)) {
      if (params[field]) {
        urlParams += `&${field}=${params[field]}`;
      }
    }
    if (urlParams) {
      pageUrl = `${pageUrl}${urlParams}`;
    }
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Member[]>);
  }

  public integralRecordPage(start: number, limit: number, id: string): Promise<PageResult<Member[]>> {
    const pageUrl = `${this.config.API.integralRecord.page}?start=${start}&limit=${limit}&memberId=${id}`;

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Member[]>);
  }

  public get(id: string): Promise<Result<Member>> {
    const getUrl = `${this.config.API.member.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Member>);
  }

  public update(member: Member): Promise<Result<Member>> {
    const pageUrl = `${this.config.API.member.base}/${member.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(member))
      .toPromise()
      .then(response => response as PageResult<Member>);
  }

  public authenticate(authentication: Authentication): Promise<Result<Authentication>> {
    const authenticateUrl = `${this.config.API.member.authenticate}`;
    return this.http
      .put(authenticateUrl, JSON.stringify(authentication))
      .toPromise()
      .then(response => response as Result<Authentication>);
  }

  public lockup(member: Member): Promise<Result<Member>> {
    const pageUrl = `${this.config.API.member.lockup}`;
    const params = {
      id: member.id,
      lockup: member.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

  public modifyMobile(member: Member): Promise<Result<Member>> {
    const modifyMobileUrl = `${this.config.API.member.modifyMobile}`;
    const params = {
      id: member.id,
      mobile: member.mobile,
    };
    return this.http
      .post(modifyMobileUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Member>)
      ;
  }

  public forbidden(member: Member): Promise<Result<Member>> {
    const pageUrl = `${this.config.API.member.forbidden}`;
    return this.http
      .post(pageUrl, JSON.stringify(member))
      .toPromise()
      .then(response => response as Result<Member>);
  }
}
