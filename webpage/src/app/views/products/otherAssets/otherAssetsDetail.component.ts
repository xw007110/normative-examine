// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {OtherAssets} from './model/otherAssets';
import {OtherAssetsService} from './otherAssets.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'otherAssetsDetailTemplate',
  templateUrl: 'otherAssetsDetail.component.html'
})
export class OtherAssetsDetailComponent implements OnInit {

  private otherAssets = new OtherAssets();
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id

  constructor(private route: ActivatedRoute,
              private otherAssetsService: OtherAssetsService,) {
  }

  ngOnInit() {
    if (!this.productId) { // 订单通用模块入口
      this.productId = this.route.snapshot.paramMap.get('id'); // 产品列表路由入口
    }
    this.otherAssetsService.get(this.productId)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.otherAssets = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
