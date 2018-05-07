// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {OfflineFunds} from './model/offlineFunds';
import {Result} from '../../../model/result';
import {Bill} from '../bill/model/bill';


@Injectable()
export class OfflineFundsService {

  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public get(id: string): Promise<Result<OfflineFunds>> {
    const getUrl = `${this.config.API.market.offlineFunds.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<OfflineFunds>);
  }

  public page(start: number, limit: number, params: Object): Promise<PageResult<OfflineFunds[]>> {
    let pageUrl = `${this.config.API.market.offlineFunds.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<OfflineFunds[]>);
  }

  public updateState(id: string, productState: string): Promise<Result<OfflineFunds>> {
    const pageUrl = `${this.config.API.market.offlineFunds.updateState}`;
    const params = {
      id: id,
      state: productState
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<OfflineFunds>);
  }

}
