import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../providers/interbank-config';
import {PageResult} from '../../model/pageResult';
import {Result} from '../../model/result';

import {CirclePerson} from './model/circlePerson';
import {CirclePersonParams} from './model/circlePerson.Params'


@Injectable()
export class CirclePersonService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: CirclePersonParams): Promise<PageResult<CirclePerson[]>> {
    let pageUrl = `${this.config.API.circleFriend.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<CirclePerson[]>);
  }

  public get(id: string): Promise<Result<CirclePerson>> {
    const getUrl = `${this.config.API.circleFriend.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<CirclePerson>);
  }


  public delete(id: string): Promise<Result<CirclePerson>> {
    const pageUrl = `${this.config.API.circleFriend.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<CirclePerson>);
  }

  public speak(circlePerson: CirclePerson): Promise<Result<CirclePerson>> {
    const pageUrl = `${this.config.API.circleFriend.speak}`;
    return this.http
      .post(pageUrl, JSON.stringify(circlePerson))
      .toPromise()
      .then(response => response as Result<CirclePerson>);
  }
}
