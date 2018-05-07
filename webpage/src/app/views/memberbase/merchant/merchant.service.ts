// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

// model
import {Merchant} from './model/merchant';
import {MerchantParams} from './model/merchant.params';
import {Result} from '../../../model/result';
import {PageResult} from '../../../model/pageResult';


// providers
import {InterBankConfig} from '../../../providers/interbank-config';

@Injectable()
export class MerchantService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: MerchantParams): Promise<PageResult<Merchant[]>> {
    let pageUrl = `${this.config.API.merchant.page}?start=${start}&limit=${limit}`;
    let urlParams = '';
    for (const field of Object.keys(params)) {
      urlParams += `&${field}=${params[field]}`;
    }
    if (urlParams) {
      pageUrl = `${pageUrl}${urlParams}`;
    }
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Merchant[]>);
  }


  public get(id: string): Promise<Result<Merchant>> {
    const getUrl = `${this.config.API.merchant.base}/${id}`;
    const params = {}
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Merchant>);
  }

  public getChildren(merchant: Merchant): Promise<PageResult<Merchant[]>> {
    const getUrl = `${this.config.API.orgTree}?id=${merchant.id}&type=${merchant.type}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Merchant[]>)
      ;

  }

  public add(merchant: Merchant): Promise<Result<Merchant>> {
    const addUrl = this.config.API.merchant.base;
    return this.http
      .post(addUrl, JSON.stringify(merchant))
      .toPromise()
      .then(response => response as Result<Merchant>)
      ;
  }

  public update(merchant: Merchant): Promise<Result<Merchant>> {
    const pageUrl = `${this.config.API.merchant.base}/${merchant.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(merchant))
      .toPromise()
      .then(response => response as PageResult<Merchant>);
  }

  public delete(id: string): Promise<Result<Merchant>> {
    const pageUrl = `${this.config.API.merchant.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Merchant>);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public lockup(merchant: Merchant): Promise<Result<Merchant>> {
    const pageUrl = `${this.config.API.organization.lockup}`;
    const params = {
      id: merchant.id,
      lockup: merchant.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

}

