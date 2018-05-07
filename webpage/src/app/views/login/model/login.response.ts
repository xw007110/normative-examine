import {Permission} from '../../../model/permission';
import {Button} from '../../../model/button';

export class LoginResponse {

  public userId: string;
  public username: string;
  public token: string;
  public name: string;
  public permission: Permission;
  public buttons: Button[];
  public rongcloudToken: string;

  constructor(userId: string,
              username: string,
              token: string,
              name: string,
              rongcloudToken: string) {
  }

  getUserId(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getUsername(): string {
    return this.username;
  }

  getToken(): string {
    return this.token;
  }

  getRongcloudToken(): string {
    return this.rongcloudToken;
  }

}
