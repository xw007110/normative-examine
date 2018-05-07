// system
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

// model
import {InterBankConfig} from '../../../providers/interbank-config';
import {Permission} from './model/permission';
import {Result} from '../../../model/result';

@Injectable()
export class PermissionService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  getPermissions(): Promise<Result<Permission[]>> {
    const url = this.config.API.permission.getPermissions;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Result<Permission[]>)
      ;
  }
}
