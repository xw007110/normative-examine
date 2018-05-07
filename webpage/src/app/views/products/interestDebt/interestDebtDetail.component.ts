// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {InterestDebt} from './model/interestDebt';
import {InterestDebtService} from './interestDebt.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'interestDebtDetailTemplate',
  templateUrl: 'interestDebtDetail.component.html'
})
export class InterestDebtDetailComponent implements OnInit {

  private interestDebt = new InterestDebt();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private interestDebtService: InterestDebtService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.interestDebtService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.interestDebt = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
