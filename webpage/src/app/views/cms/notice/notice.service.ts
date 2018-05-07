import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Notice} from './model/notice';
import {NoticeParams} from './model/notice.params'


@Injectable()
export class NoticeService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: NoticeParams): Promise<PageResult<Notice[]>> {
    let pageUrl = `${this.config.API.announcement.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Notice[]>);
  }

  public get(id: string): Promise<Result<Notice>> {
    const getUrl = `${this.config.API.announcement.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Notice>);
  }

  public add(notice: Notice): Promise<Result<Notice>> {
    const addUrl = this.config.API.announcement.base;
    return this.http
      .post(addUrl, JSON.stringify(notice))
      .toPromise()
      .then(response => response as Result<Notice>)
      ;
  }

  public update(notice: Notice): Promise<Result<Notice>> {
    const pageUrl = `${this.config.API.announcement.base}/${notice.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(notice))
      .toPromise()
      .then(response => response as PageResult<Notice>);
  }

  public delete(id: string): Promise<Result<Notice>> {
    const pageUrl = `${this.config.API.announcement.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Notice>);
  }
}
