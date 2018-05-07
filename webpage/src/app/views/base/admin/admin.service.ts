// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';
import {Admin} from './model/admin';
import {ResetPwdAdmin} from './model/resetPwdAdmin';
import {AdminParams} from './model/admin.params';
import {AdminStatus} from './model/admin-status.enum';
import {Role} from '../role/model/role';
import {StorageService} from '../../../providers/storage.service';
import { Person } from '../person/model/person';
@Injectable()
export class AdminService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private config: InterBankConfig,
              private storageService: StorageService,) {
  }

  public page(start: number, limit: number, params: AdminParams): Promise<PageResult<Admin[]>> {
    let pageUrl = `${this.config.API.admin.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Admin[]>);
  }


  public add(person: Person): Promise<Result<Person>> {

    const addUrl = this.config.API.admin.add;
    return this.http
      .post(addUrl, JSON.stringify(person))
      .toPromise()
      .then(response => response as Result<Person>)
      ;
  }

  public get(id: string): Promise<Result<Admin>> {
    const getUrl = `${this.config.API.admin.base}/${id}`;
    const params = {}
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Admin>);
  }

  public update(person: Person): Promise<Result<Admin>> {
    const pageUrl = `${this.config.API.admin.update}/${person.id}`;

    return this.http
      .put(pageUrl, JSON.stringify(person))
      .toPromise()
      .then(response => response as PageResult<Admin>);
  }

  public updatePassword(reAdmin: ResetPwdAdmin): Promise<Result<ResetPwdAdmin>> {
    const pageUrl = `${this.config.API.admin.updatePassword}`;
    reAdmin.id = this.storageService.getUser().userId;
    console.log(reAdmin.id);
    const params = {
      id: reAdmin.id,
      oldPassword: reAdmin.oldPassword,
      password: reAdmin.password
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as PageResult<ResetPwdAdmin>);
  }

  public delete(id: string): Promise<Result<Admin>> {
    const pageUrl = `${this.config.API.admin.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<Admin>);
  }

  public resetPassword(admin: Admin): Promise<Result<Admin>> {
    const resetPasswordUrl = `${this.config.API.admin.resetPassword}`;
    const params = {
      id: admin.id,
      password: admin.password,
    };
    return this.http
      .post(resetPasswordUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Admin>)
      ;
  }

  public changeStatus(admin: Admin, forbidden: boolean): Promise<Result<Admin>> {
    const url = this.config.API.admin.changeStatus;
    const params = {
      id: admin.id,
      forbidden: forbidden
    };
    return this.http
      .post(url, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Admin>)
      ;
  }

  public getRoles(id: string, lockup: boolean): Promise<Result<Role[]>> {
    const getUrl = `${this.config.API.role.list}?id=${id}&lockup=${lockup}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as Result<Role[]>);
  }

  public authorization(admin: Admin, roles: Role[]): Promise<Result<Admin>> {
    const url = this.config.API.admin.authorization;

    const roleIds: string[] = [];
    for (const role of roles) {
      roleIds.push(role.id);
    }
    const params = {
      id: admin.id,
      roles: roleIds
    };

    return this.http
      .post(url, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Admin>)
      ;
  }

  public lockup(admin: Admin): Promise<Result<Admin>> {
    const pageUrl = `${this.config.API.admin.lockup}`;
    const params = {
      id: admin.id,
      lockup: admin.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

  public forbidden(admin: Admin): Promise<Result<Admin>> {
    const pageUrl = `${this.config.API.admin.forbidden}`;
    return this.http
      .post(pageUrl, JSON.stringify(admin))
      .toPromise()
      .then(response => response as Result<Admin>);
  }
}
