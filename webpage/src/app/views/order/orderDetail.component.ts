// 系统
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {OrderService} from './order.service';
import {ReturnCode} from '../../model/returnCode';
import {MemberDetail} from './model/memberDetail';



@Component({
  templateUrl: 'orderDetail.component.html',
  styleUrls: ['../base/org.hidden.css']
})
export class OrderDetailComponent implements OnInit {
  private productId: string; // 产品id
  private productType: string; // 产品类型id
  private orderCode: string; // 订单code
  private quoteId: string; // 报价id
  private assertInfo = new MemberDetail; // 资产方
  private moneyInfo = new MemberDetail; // 资金方
  constructor(private route: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit() {
    const ids = this.route.snapshot.paramMap.get('ids').split(','); // 参数数组
    this.orderCode = ids[0]; // 订单id
    this.productId = ids[1]; // 产品id
    this.productType = ids[2]; // 产品类型id
    this.quoteId = ids[3]; // 报价id
    this.queryAssertAndMoneyInfo();
  }

  private queryAssertAndMoneyInfo() {
    this.orderService.queryAssertAndMoneyInfo(this.orderCode)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
             this.assertInfo = result.data['memberAssets'];
            this.moneyInfo = result.data['memberMoney'];
          } else {
            console.log(returnCode.message);
          }
        }
      )
  }
}
