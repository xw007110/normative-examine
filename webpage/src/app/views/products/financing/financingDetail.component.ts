// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Financing} from './model/financing';
import {FinancingService} from './financing.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'financingDetailTemplate',
  templateUrl: 'financingDetail.component.html'
})
export class FinancingDetailComponent implements OnInit {

  private financing = new Financing();
  @Input('productId')
  productId; // 接受传递的产品id

  @Input('quoteId')
  quoteId; // 接受传递的报价id
  constructor(private route: ActivatedRoute,
              private financingService: FinancingService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.financingService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.financing = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
