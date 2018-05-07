// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonStockFunds} from './model/commonStockFunds';
import {CommonStockFundsService} from './commonStockFunds.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'commonStockFundsDetailTemplate',
  templateUrl: 'commonStockFundsDetail.component.html'
})
export class CommonStockFundsDetailComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private commonStockFunds = new CommonStockFunds();


  constructor(private route: ActivatedRoute,
              private commonStockFundsService: CommonStockFundsService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.commonStockFundsService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.commonStockFunds = result.data;
            //循环目标资产字段
            let targetAssets: string = '';
            for (let key in this.commonStockFunds.targetAssetsDesc) {
              targetAssets+=this.commonStockFunds.targetAssetsDesc[key]+",";
            }
            this.commonStockFunds.targetAssets = targetAssets.substring(0,targetAssets.length-1);
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
