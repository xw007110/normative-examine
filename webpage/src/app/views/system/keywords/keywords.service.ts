import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Keywords} from './model/keywords';
import {Role} from '../../base/role/model/role';


@Injectable()
export class KeywordsService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number): Promise<PageResult<Keywords[]>> {
    let pageUrl = `${this.config.API.keywords.page}?start=${start}&limit=${limit}`;
   
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Keywords[]>);
  }

  public get(id: string): Promise<Result<Keywords>> {
    const getUrl = `${this.config.API.keywords.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Keywords>);
  }

  public add(param:object): Promise<Result<Keywords>> {
    const addUrl = this.config.API.keywords.base;
    return this.http
      .post(addUrl, JSON.stringify(param))
      .toPromise()
      .then(response => response as Result<Keywords>)
      ;
  }

  public update(id:string,param:object): Promise<Result<Keywords>> {
    const pageUrl = `${this.config.API.keywords.base}/${id}`;
    return this.http
      .put(pageUrl, JSON.stringify(param))
      .toPromise()
      .then(response => response as PageResult<Keywords>);
  }

  public delete(id: string): Promise<Result<Keywords>> {
    const pageUrl = `${this.config.API.keywords.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Keywords>);
  }

}
