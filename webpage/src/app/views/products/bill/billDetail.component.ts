// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Bill} from './model/bill';
import {BillService} from './bill.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'billDetailTemplate',
  templateUrl: 'billDetail.component.html'
})
export class BillDetailComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private bill = new Bill();

  constructor(private route: ActivatedRoute,
              private billService: BillService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.billService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.bill = result.data;
            //循环承兑行字段
            let acceptance: string = '';
            for (let key in this.bill.acceptanceDesc) {
              acceptance+=this.bill.acceptanceDesc[key]+",";
            }
            this.bill.acceptance = acceptance.substring(0,acceptance.length-1);
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
