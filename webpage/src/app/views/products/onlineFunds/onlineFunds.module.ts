// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InterBankConfig} from '../../../providers/interbank-config';
// module
import {OnlineFundsRoutingModule} from './onlineFunds-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';

// component
import {OnlineFundsComponent} from './onlineFunds.component';
import {OnlineFundsDetailComponent} from './onlineFundsDetail.component';
// service
import {OnlineFundsService} from './onlineFunds.service';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

@NgModule({
  imports: [
    OnlineFundsRoutingModule,
    CommonModule,
    FormsModule,
    ProductTemplateModule,
    ProductOfferTemplateModule,
    PageModule
  ],
  declarations: [
    OnlineFundsComponent,
    OnlineFundsDetailComponent
  ],
  providers: [
    InterBankConfig,
    OnlineFundsService
  ],
  exports: [OnlineFundsDetailComponent]
})
export class OnlineFundsModule {


}
