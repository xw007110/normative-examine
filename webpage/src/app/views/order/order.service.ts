// 系统
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../providers/interbank-config';

// model
import {PageResult} from '../../model/pageResult';
import {Order} from './model/order';
import {Result} from '../../model/result';
import {AdminParams} from '../base/admin/model/admin.params';
import {OrderParam} from './model/orderParam';
import {ABS} from '../products/ABS/model/ABS';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number, params: OrderParam): Promise<PageResult<Order[]>> {
    let pageUrl = `${this.config.API.productOrder.page}?start=${start}&limit=${limit}`;
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
      .then(response => response as PageResult<Order[]>);
  }

  public queryAssertAndMoneyInfo(id: string): Promise<Result<any>> {
    const getUrl = `${this.config.API.productOrder.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<any>);
  }


}
