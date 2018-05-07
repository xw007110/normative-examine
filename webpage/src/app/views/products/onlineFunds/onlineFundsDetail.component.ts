// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {OnlineFundsService} from './onlineFunds.service';
import {ReturnCode} from '../../../model/returnCode';
import {OnlineFunds} from './model/onlineFunds';

@Component({
  selector: 'onlineFundsDetailTemplate',
  templateUrl: 'onlineFundsDetail.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class OnlineFundsDetailComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private onlineFunds = new OnlineFunds();

  constructor(private route: ActivatedRoute,
              private onlineFundsService: OnlineFundsService) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.onlineFundsService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.onlineFunds = result.data;
            //循环模式字段
              let patterns: string = '';
              for (let key in this.onlineFunds.patternsDesc) {
                patterns+=this.onlineFunds.patternsDesc[key]+",";
              }
              this.onlineFunds.patterns = patterns.substring(0,patterns.length-1);

              //循环对手字段
              let rivals: string = '';
              for (let key in this.onlineFunds.rivalsDesc) {
                rivals+=this.onlineFunds.rivalsDesc[key]+",";
              }
              this.onlineFunds.rivals = rivals.substring(0,rivals.length-1);

          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
