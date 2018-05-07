// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';
import {Person} from './model/person';
import {PersonParams} from './model/person.params';
import {Organization} from '../organization/model/organization';


@Injectable()
export class PersonService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: PersonParams): Promise<PageResult<Person[]>> {
    let pageUrl = `${this.config.API.person.page}?start=${start}&limit=${limit}`;
    let urlParams = '';
    for (const field of Object.keys(params)) {
      const value = params[field];
      if ((typeof value) !== 'boolean' || value) {
        urlParams += `&${field}=${params[field]}`;
      }
    }
    if (urlParams) {
      pageUrl = `${pageUrl}${urlParams}`;
    }

    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Person[]>);
  }

  public add(person: Person): Promise<Result<Person>> {
    const addUrl = this.config.API.person.base;
    return this.http
      .post(addUrl, JSON.stringify(person))
      .toPromise()
      .then(response => response as Result<Person>)
      ;
  }

  public get(id: string): Promise<Result<Person>> {
    const getUrl = `${this.config.API.person.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Person>);
  }

  public update(person: Person): Promise<Result<Person>> {
    const pageUrl = `${this.config.API.person.base}/${person.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(person))
      .toPromise()
      .then(response => response as PageResult<Person>);
  }

  public delete(id: string): Promise<Result<Person>> {
    const pageUrl = `${this.config.API.person.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Person>);
  }

  public lockup(person: Person): Promise<Result<Person>> {
    const pageUrl = `${this.config.API.person.lockup}`;
    const params = {
      id: person.id,
      lockup: person.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }
}
