import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Result} from '../model/result';
import {PageResult} from '../model/pageResult';
import {StorageService} from './storage.service';

@Injectable()
export class HttpService<T> {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private storageService: StorageService) {
    this.headers.set('Authorization', this.storageService.getUser().token)
  }

  post(url: string, object: Object): Promise<Result<T>> {
    return this.http
      .post(url, JSON.stringify(object), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Result<T>)
      .catch(this.handleError)
  }

  postByParam(url: string, object: Object): Promise<Result<T>> {
    return this.http
      .post(url, JSON.stringify(object), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Result<T>)
      .catch(this.handleError)
  }

  put(url: string, object: Object): Promise<Result<T>> {
    return this.http
      .put(url, JSON.stringify(object), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Result<T>)
      .catch(this.handleError)
  }

  get(url: string): Promise<Result<T>> {
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Result<T>)
      .catch(this.handleError)
      ;
  }

  getList(url: string): Promise<PageResult<T[]>> {
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as PageResult<T[]>)
      .catch(this.handleError)
      ;
  }

  delete(url: string): Promise<Result<T>> {
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Result<T>)
      .catch(this.handleError)
      ;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
