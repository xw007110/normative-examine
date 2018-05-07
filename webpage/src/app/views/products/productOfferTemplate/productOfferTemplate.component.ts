// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Page} from '../../base/page/model/page';
import {LoadMsg} from '../../../model/load-msg';

import {Offer} from './model/offer';
import {ProductOfferTemplateService} from './productOfferTemplate.service';
import {ReturnCode} from '../../../model/returnCode';

@Component({
  selector: 'productOfferTemplate',
  templateUrl: 'productOfferTemplate.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class ProductOfferTemplateComponent implements OnInit {
  @Input('productId')
  productId; // 接受传递的产品id
  @Input('quoteId')
  quoteId; // 接受传递的报价id
  private offer = new Offer();
  private offers: Offer[]; // 报价列表

  // 分页
  private pageParams: Page = new Page();
  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载列表');

  constructor(private route: ActivatedRoute,
              private productOfferTemplateService: ProductOfferTemplateService) {
  }

  ngOnInit() {
    const param = {
      productId: this.productId, // 查询产品下的所有报价
      id: this.quoteId // 根据报价id查询订单下的一条报价
    }
    this.productOfferTemplateService.page(this.pageParams.curPage - 1, this.pageParams.pageData, param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.offers = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgGrid.loaded = true;
        } else {
          this.loadMsgGrid.loaded = false;
          this.loadMsgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgGrid.loaded = false;
        this.loadMsgGrid.message = '报价列表加载失败';
      })
  }

}
