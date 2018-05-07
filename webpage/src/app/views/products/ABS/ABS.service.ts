// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {ABS} from './model/ABS';
import {Result} from '../../../model/result';
import {OnlineFunds} from '../onlineFunds/model/onlineFunds';


@Injectable()
export class ABSService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public get(id: string): Promise<Result<ABS>> {
    const getUrl = `${this.config.API.market.ABS.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<ABS>);
  }

  public page(start: number, limit: number, params: Object): Promise<PageResult<ABS[]>> {
    let pageUrl = `${this.config.API.market.ABS.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<ABS[]>);
  }

  public updateState(id: string, productState: string): Promise<Result<ABS>> {
    const pageUrl = `${this.config.API.market.ABS.updateState}`;
    const params = {
      id: id,
      state: productState
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<ABS>);
  }

}
