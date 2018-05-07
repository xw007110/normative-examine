// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Funds} from './model/funds';
import {FundsService} from './funds.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'fundsDetailTemplate',
  templateUrl: 'fundsDetail.component.html'
})
export class FundsDetailComponent implements OnInit {

  private funds = new Funds();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private fundsService: FundsService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.fundsService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.funds = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
