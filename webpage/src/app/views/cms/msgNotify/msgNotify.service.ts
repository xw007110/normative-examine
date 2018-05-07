import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {MsgNotify} from './model/msgNotify';
import {MsgNotifyParams} from './model/msgNotify.params'


@Injectable()
export class MsgNotifyService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: MsgNotifyParams): Promise<PageResult<MsgNotify[]>> {
    let pageUrl = `${this.config.API.msgNotify.findAll}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<MsgNotify[]>);
  }


 
}
