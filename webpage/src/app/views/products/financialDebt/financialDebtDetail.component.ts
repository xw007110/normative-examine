// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {FinancialDebt} from './model/financialDebt';
import {FinancialDebtService} from './financialDebt.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'financialDebtDetailTemplate',
  templateUrl: 'financialDebtDetail.component.html'
})
export class FinancialDebtDetailComponent implements OnInit {

  private financialDebt = new FinancialDebt();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private financialDebtService: FinancialDebtService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.financialDebtService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.financialDebt = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
