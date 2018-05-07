// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {TrustPlan} from './model/trustPlan';
import {TrustPlanService} from './trustPlan.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'trustPlanDetailTemplate',
  templateUrl: 'trustPlanDetail.component.html'
})
export class TrustPlanDetailComponent implements OnInit {

  private trustPlan = new TrustPlan();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private trustPlanService: TrustPlanService) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.trustPlanService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.trustPlan = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
