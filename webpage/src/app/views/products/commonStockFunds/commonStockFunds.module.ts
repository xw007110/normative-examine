// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {CommonStockFundsRoutingModule} from './commonStockFunds-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
// component
import {CommonStockFundsComponent} from './commonStockFunds.component';
import {CommonStockFundsDetailComponent} from './commonStockFundsDetail.component';

// service
import {CommonStockFundsService} from './commonStockFunds.service';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';


@NgModule({
  imports: [
    CommonStockFundsRoutingModule,
    CommonModule,
    FormsModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    CommonStockFundsComponent,
    CommonStockFundsDetailComponent
  ],
  providers: [
    InterBankConfig,
    CommonStockFundsService
  ],
  exports: [CommonStockFundsDetailComponent]
})
export class CommonStockFundsModule {


}
