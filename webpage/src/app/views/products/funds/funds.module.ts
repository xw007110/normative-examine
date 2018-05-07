// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {FundsRoutingModule} from './funds-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {FundsComponent} from './funds.component';
import {FundsDetailComponent} from './fundsDetail.component';

// service
import {FundsService} from './funds.service';

@NgModule({
  imports: [
    FundsRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    FundsComponent,
    FundsDetailComponent
  ],
  providers: [
    InterBankConfig,
    FundsService
  ],
  exports: [FundsDetailComponent]
})
export class FundsModule {


}
