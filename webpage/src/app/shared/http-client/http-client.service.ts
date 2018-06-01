import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

import { Observable } from 'rxjs/Observable';
import { SpinService } from '../spin/spin.service';
import { ToastService } from '../toast/toast.service';
import { ToastConfig, ToastType } from '../toast/toast-model';
import { Result } from './model/result';

/**
 * httpclient服务
 */
@Injectable()
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
    private spinService: SpinService,
    private toastService: ToastService,
  ) { }



  /**
   * request
   *
   * @return any
   */
  request(method: string, url: string, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    observe?: HttpObserve;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.commonProcess(this.httpClient.request(method, url, options = {}));
  }



  /**
 * delete
 * @param url 
 * @param options 
 */
  delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.delete(url, options = {}));
  }

  /**
 * get
 * @param url 
 * @param options 
 */
  get<T>(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<Result<T>> {
    return this.commonProcess(this.httpClient.get(url, options = {}));
  }

  /**
   * head
   * @param url 
   * @param options 
   */
  head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.head(url, options = {}));
  }

  /**
  * options
  * @param url 
  * @param options 
  */
  options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.options(url, options = {}));
  }

  /**
  * patch
  * @param url 
  * @param options 
  */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.patch(url,body, options = {}));
  }


  /**
  * post
  * @param url 
  * @param options 
  */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.post(url, body,options = {}));
  }

  /**
  * put
  * @param url 
  * @param options 
  */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.put(url,body, options = {}));
  }

  /**
   * 公共处理
   * @param observable 
   */
  commonProcess<T>(observable: Observable< any>): Observable<Result<T>> {
    this.spinService.spin(true);
    return Observable.create((observer) => {
      observable.subscribe(res => {
        this.spinService.spin(false);
        observer.next(res);
        if(res.code !=0){
          const toastCfg = new ToastConfig(ToastType.ERROR, '', res.message , 3000);
          this.toastService.toast(toastCfg);
        }
      
      }, (err) => {
        this.spinService.spin(false);
        const toastCfg = new ToastConfig(ToastType.ERROR, '', err.json(), 3000);
        this.toastService.toast(toastCfg);
        observer.error(err);
      }, () => {
        this.spinService.spin(false);
        observer.complete();
      });
    });
  }

}
