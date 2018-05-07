// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {OnlineFunds} from './model/OnlineFunds';
import {Result} from '../../../model/result';
import {Member} from '../../base/member/model/member';


@Injectable()
export class OnlineFundsService {

  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public get(id: string): Promise<Result<OnlineFunds>> {
    const getUrl = `${this.config.API.market.onlineFunds.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<OnlineFunds>);
  }

  public page(start: number, limit: number, params: Object): Promise<PageResult<OnlineFunds[]>> {
    let pageUrl = `${this.config.API.market.onlineFunds.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<OnlineFunds[]>);
  }

  public updateState(id: string, productState: string): Promise<Result<OnlineFunds>> {
    const pageUrl = `${this.config.API.market.onlineFunds.updateState}`;
    const params = {
      id: id,
      state: productState
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<OnlineFunds>);
  }

}
