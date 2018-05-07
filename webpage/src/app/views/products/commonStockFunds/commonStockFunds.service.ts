// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {CommonStockFunds} from './model/commonStockFunds';
import {Result} from '../../../model/result';
import {Bill} from '../bill/model/bill';


@Injectable()
export class CommonStockFundsService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public get(id: string): Promise<Result<CommonStockFunds>> {
    const getUrl = `${this.config.API.market.commonStockFunds.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<CommonStockFunds>);
  }

  public page(start: number, limit: number, params: Object): Promise<PageResult<CommonStockFunds[]>> {
    let pageUrl = `${this.config.API.market.commonStockFunds.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<CommonStockFunds[]>);
  }

  public updateState(id: string, productState: string): Promise<Result<CommonStockFunds>> {
    const pageUrl = `${this.config.API.market.commonStockFunds.updateState}`;
    const params = {
      id: id,
      state: productState
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<CommonStockFunds>);
  }

}
