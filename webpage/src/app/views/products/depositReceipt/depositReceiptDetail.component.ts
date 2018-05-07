// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {DepositReceipt} from './model/depositReceipt';
import {DepositReceiptService} from './depositReceipt.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'depositReceiptDetailTemplate',
  templateUrl: 'depositReceiptDetail.component.html'
})
export class DepositReceiptDetailComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private depositReceipt = new DepositReceipt();

  constructor(private route: ActivatedRoute,
              private depositReceiptService: DepositReceiptService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.depositReceiptService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.depositReceipt = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
