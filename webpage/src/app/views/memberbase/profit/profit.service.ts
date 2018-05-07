import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Profit} from './model/profit';


@Injectable()
export class ProfitService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public list(): Promise<PageResult<Profit[]>> {
    const pageUrl = `${this.config.API.member.profit.list}`;

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Profit[]>);
  }

  public lockup(profit: Profit): Promise<Result<Profit>> {
    const pageUrl = `${this.config.API.member.profit.lockup}`;
    const params = {
      id: profit.id,
      lockup: profit.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

  public get(id: string): Promise<Result<Profit>> {
    const getUrl = `${this.config.API.member.profit.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Profit>);
  }


  public update(profit: Profit): Promise<Result<Profit>> {
    const pageUrl = `${this.config.API.member.profit.base}/${profit.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(profit))
      .toPromise()
      .then(response => response as PageResult<Profit>);
  }

  public updateProfits(id: string, profits: string[]): Promise<Result<Profit>> {
    const pageUrl = `${this.config.API.member.memberGrade.updateProfits}`;
    const param = {
      id: id,
      profits: profits
    }
    return this.http
      .post(pageUrl, JSON.stringify(param))
      .toPromise()
      .then(response => response as PageResult<Profit>);
  }


}
