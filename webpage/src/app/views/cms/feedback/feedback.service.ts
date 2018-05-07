import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Feedback} from './model/feedback';
import {FeedbackParams} from './model/feedback.params'


@Injectable()
export class FeedbackService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: FeedbackParams): Promise<PageResult<Feedback[]>> {
    let pageUrl = `${this.config.API.feedback.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Feedback[]>);
  }

  public get(id: string): Promise<Result<Feedback>> {
    const getUrl = `${this.config.API.feedback.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Feedback>);
  }

  public audit(feedback: Feedback): Promise<Result<Feedback>> {
    const pageUrl = `${this.config.API.feedback.base}/${feedback.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(feedback))
      .toPromise()
      .then(response => response as PageResult<Feedback>);
  }

  public delete(id: string): Promise<Result<Feedback>> {
    const pageUrl = `${this.config.API.feedback.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Feedback>);
  }

  public checking(feedback: Feedback): Promise<Result<Feedback>> {
    const pageUrl = `${this.config.API.feedback.checking}`;
    const params = {
      id: feedback.id,
      state: feedback.state,
      result: feedback.result
    };
    return this.http
      .put(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }
}
