// system
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

// model
import {InterBankConfig} from '../../../providers/interbank-config';
import {Organization} from './model/organization';
import {OrganizationParams} from './model/organization.params';
import {Result} from '../../../model/result';
import {PageResult} from '../../../model/pageResult';


@Injectable()
export class OrganizationService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public add(organization: Organization): Promise<Result<Organization>> {
    const addUrl = this.config.API.organization.base;
    return this.http
      .post(addUrl, JSON.stringify(organization))
      .toPromise()
      .then(response => response as Result<Organization>)
      ;
  }

  public page(start: number, limit: number, params: OrganizationParams): Promise<PageResult<Organization[]>> {
    let pageUrl = `${this.config.API.organization.page}?start=${start}&limit=${limit}`;
    let urlParams = '';
    for (const field of Object.keys(params)) {
      urlParams += `&${field}=${params[field]}`;
    }
    if (urlParams) {
      pageUrl = `${pageUrl}${urlParams}`;
    }
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Organization[]>);
  }


  public get(id: string): Promise<Result<Organization>> {
    const getUrl = `${this.config.API.organization.base}/${id}`;
    const params = {}
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Organization>)
      .catch(this.handleError)
      ;
  }

  public update(organization: Organization): Promise<Result<Organization>> {
    const pageUrl = `${this.config.API.organization.base}/${organization.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(organization))
      .toPromise()
      .then(response => response as PageResult<Organization>);
  }

  public delete(id: string): Promise<Result<Organization>> {
    const pageUrl = `${this.config.API.organization.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Organization>);
  }

  public getChildren(org: Organization): Promise<PageResult<Organization[]>> {
    const getUrl = `${this.config.API.orgTree}?id=${org.id}&type=${org.type}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Organization[]>)
      ;

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  public lockup(organization: Organization): Promise<Result<any>> {
    const pageUrl = `${this.config.API.organization.lockup}`;
    const params = {
      id: organization.id,
      lockup: organization.lockup

    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

}

