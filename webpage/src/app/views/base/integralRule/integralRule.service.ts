import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {IntegralRule} from './model/integralRule';


@Injectable()
export class IntegralRuleService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public list(): Promise<PageResult<IntegralRule[]>> {
    const pageUrl = `${this.config.API.member.integralRule.list}`;

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<IntegralRule[]>);
  }

  public lockup(integralRule: IntegralRule): Promise<Result<IntegralRule>> {
    const pageUrl = `${this.config.API.member.integralRule.lockup}`;
    const params = {
      id: integralRule.id,
      lockup: integralRule.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

  public get(id: string): Promise<Result<IntegralRule>> {
    const getUrl = `${this.config.API.member.integralRule.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<IntegralRule>);
  }


  public update(integralRule: IntegralRule): Promise<Result<IntegralRule>> {
    const pageUrl = `${this.config.API.member.integralRule.base}/${integralRule.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(integralRule))
      .toPromise()
      .then(response => response as PageResult<IntegralRule>);
  }

}
