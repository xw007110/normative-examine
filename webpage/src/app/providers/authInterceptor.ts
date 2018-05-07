import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs/Rx';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.storageService.getUser().token});

  constructor(private storageService: StorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const me = this;

    const authReq = req.clone({headers: me.headers});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).do(event => {
      if (event instanceof HttpResponse) {
        // token失效 跳转到登录
        if (event.body.returnCode.code === '0002') {
          me.router.navigate(['']);
        }
      }
    });
  }
}

