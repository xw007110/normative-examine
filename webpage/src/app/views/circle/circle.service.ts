import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../providers/interbank-config';
import {PageResult} from '../../model/pageResult';
import {Result} from '../../model/result';

import {Circle} from './model/circle';
import {CircleParams} from './model/circle.params'


@Injectable()
export class CircleService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: CircleParams): Promise<PageResult<Circle[]>> {
    let pageUrl = `${this.config.API.publicCircle.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Circle[]>);
  }

  public get(id: string): Promise<Result<Circle>> {
    const getUrl = `${this.config.API.publicCircle.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Circle>);
  }

  public add(circle: Circle): Promise<Result<Circle>> {
    const addUrl = this.config.API.publicCircle.base;
    return this.http
      .post(addUrl, JSON.stringify(circle))
      .toPromise()
      .then(response => response as Result<Circle>)
      ;
  }

  public update(circle: Circle): Promise<Result<Circle>> {
    const pageUrl = `${this.config.API.publicCircle.base}/${circle.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(circle))
      .toPromise()
      .then(response => response as PageResult<Circle>);
  }

  public delete(id: string): Promise<Result<Circle>> {
    const pageUrl = `${this.config.API.publicCircle.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Circle>);
  }
}
