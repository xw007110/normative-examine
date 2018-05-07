// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CreditDebt} from './model/creditDebt';
import {CreditDebtService} from './creditDebt.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'creditDebtDetailTemplate',
  templateUrl: 'creditDebtDetail.component.html'
})
export class CreditDebtDetailComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private creditDebt = new CreditDebt();

  constructor(private route: ActivatedRoute,
              private creditDebtService: CreditDebtService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.creditDebtService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.creditDebt = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
