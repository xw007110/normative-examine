import {Injectable} from '@angular/core';
import {CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService} from 'ngx-store';
import {User} from '../model/user';
import {Permission} from '../model/permission';

@Injectable()
export class StorageService {

  constructor(private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private cookiesStorageService: CookiesStorageService,
              private sharedStorageService: SharedStorageService) {

  }

  public saveUser(user: User): void {
    this.sessionStorageService.set('User', user);
  }

  public getUser(): User {
    return this.sessionStorageService.get('User');
  }

  public savePermission(permission: Permission): void {
    this.sessionStorageService.set('Permission', permission);
  }

  public getPermission(): Permission {
    return this.sessionStorageService.get('Permission');
  }

  public saveButtons(buttons: string[]): void {
    this.sessionStorageService.set('Buttons', buttons);
  }

  public getButtons(): string[] {
    return this.sessionStorageService.get('Buttons');
  }

  public clear(): void {
    this.sessionStorageService.clear('all');
  }

}
