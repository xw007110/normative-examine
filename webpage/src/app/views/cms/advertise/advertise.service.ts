import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Advertise} from './model/advertise';
import {AdvertiseParams} from './model/advertise.params'
import {Role} from '../../base/role/model/role';


@Injectable()
export class AdvertiseService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: AdvertiseParams): Promise<PageResult<Advertise[]>> {
    let pageUrl = `${this.config.API.advertising.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Advertise[]>);
  }

  public get(id: string): Promise<Result<Advertise>> {
    const getUrl = `${this.config.API.advertising.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Advertise>);
  }

  public add(advertise: Advertise): Promise<Result<Advertise>> {
    const addUrl = this.config.API.advertising.base;
    return this.http
      .post(addUrl, JSON.stringify(advertise))
      .toPromise()
      .then(response => response as Result<Advertise>)
      ;
  }

  public update(advertise: Advertise): Promise<Result<Advertise>> {
    const pageUrl = `${this.config.API.advertising.base}/${advertise.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(advertise))
      .toPromise()
      .then(response => response as PageResult<Advertise>);
  }

  public delete(id: string): Promise<Result<Advertise>> {
    const pageUrl = `${this.config.API.advertising.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Advertise>);
  }

  public lockup(advertise: Advertise): Promise<Result<Advertise>> {
    const pageUrl = `${this.config.API.advertising.lockup}`;
    const params = {
      id: advertise.id,
      lockup: advertise.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Advertise>);
  }


}
