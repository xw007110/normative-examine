// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';

// model
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';
import {Role} from './model/role';
import {Permission} from '../permission/model/permission';
import {RoleParams} from './model/role.params';

@Injectable()
export class RoleService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: RoleParams): Promise<PageResult<Role[]>> {
    let pageUrl = `${this.config.API.role.page}?start=${start}&limit=${limit}`;
    if (params.name) {
      pageUrl = `${pageUrl}&name=${params.name}`;
    }
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<Role[]>);
  }

  public list(params: RoleParams): Promise<Result<Role[]>> {
    let listUrl = this.config.API.role.list;
    if (params.name) {
      listUrl = `${listUrl}&name=${params.name}`;
    }
    return this.http
      .get(listUrl)
      .toPromise()
      .then(response => response as Result<Role[]>);
  }


  public add(role: Role, permissions: Permission[]): Promise<Result<Role>> {

    const addUrl = this.config.API.role.base;
    const permissionIds: string[] = [];
    for (const permission of permissions) {
      permissionIds.push(permission.id);
    }
    const params = {
      code: role.code,
      name: role.name,
      permissions: permissionIds
    }

    return this.http
      .post(addUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<Role>)
      ;
  }

  public get(id: string): Promise<Result<Role>> {
    const getUrl = `${this.config.API.role.base}/${id}`;
    const params = {}
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<Role>);
  }

  public update(role: Role, permissions: Permission[]): Promise<Result<Role>> {
    const pageUrl = `${this.config.API.role.base}/${role.id}`;
    const permissionIds: string[] = [];
    for (const permission of permissions) {
      permissionIds.push(permission.id);
    }
    const params = {
      id: role.id,
      name: role.name,
      remark: role.remark,
      permissions: permissionIds
    }
    return this.http
      .put(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as PageResult<Role>);
  }

  public delete(id: string): Promise<Result<Role>> {
    const url = `${this.config.API.role.base}/${id}`;
    return this.http
      .delete(url)
      .toPromise()
      .then(response => response as Result<Role>);
  }

  public lockup(role: Role): Promise<Result<Role>> {
    const pageUrl = `${this.config.API.role.lockup}`;
    const params = {
      id: role.id,
      lockup: role.lockup
    };
    return this.http
      .post(pageUrl, JSON.stringify(params))
      .toPromise()
      .then(response => response as Result<any>);
  }

}
