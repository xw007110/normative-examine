// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {OfflineFunds} from './model/offlineFunds';

import {OfflineFundsService} from './offlineFunds.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'offlineFundsDetailTemplate',
  templateUrl: 'offlineFundsDetail.component.html'
})
export class OfflineFundsDetailComponent implements OnInit {

  private offlineFunds = new OfflineFunds();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private offlineFundsService: OfflineFundsService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.offlineFundsService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.offlineFunds = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
