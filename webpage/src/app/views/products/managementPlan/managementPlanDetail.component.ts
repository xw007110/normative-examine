// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {ManagementPlan} from './model/managementPlan';
import {ManagementPlanService} from './managementPlan.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'ManagementPlanDetailTemplate',
  templateUrl: 'ManagementPlanDetail.component.html'
})
export class ManagementPlanDetailComponent implements OnInit {

  private managementPlan = new ManagementPlan();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private managementPlanService: ManagementPlanService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.managementPlanService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.managementPlan = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
