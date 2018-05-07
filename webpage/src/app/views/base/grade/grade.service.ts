import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {Grade} from './model/grade';


@Injectable()
export class GradeService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public list(): Promise<PageResult<Grade[]>> {
    const pageUrl = `${this.config.API.member.memberGrade.list}`;

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Grade[]>);
  }

  public lockup(grade: Grade): Promise<Result<Grade>> {
    const pageUrl = `${this.config.API.member.memberGrade.lockup}`;
    const params = {
      id: grade.id,
      lockup: grade.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

  public get(id: string): Promise<Result<Grade>> {
    const getUrl = `${this.config.API.member.memberGrade.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Grade>);
  }


  public update(grade: Grade): Promise<Result<Grade>> {
    const pageUrl = `${this.config.API.member.memberGrade.base}/${grade.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(grade))
      .toPromise()
      .then(response => response as PageResult<Grade>);
  }


  public profit(id: string): Promise<PageResult<Grade>> {
    const pageUrl = `${this.config.API.member.memberGrade.base}/${id}`;

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Grade>);
  }

  public delete(id: string): Promise<Result<Grade>> {
    const pageUrl = `${this.config.API.member.memberGrade.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Grade>);
  }
}
