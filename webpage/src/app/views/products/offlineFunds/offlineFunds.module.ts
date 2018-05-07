// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {OfflineFundsRoutingModule} from './offlineFunds-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {OfflineFundsComponent} from './offlineFunds.component';
import {OfflineFundsDetailComponent} from './offlineFundsDetail.component';

// service
import {OfflineFundsService} from './offlineFunds.service';

@NgModule({
  imports: [
    OfflineFundsRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    OfflineFundsComponent,
    OfflineFundsDetailComponent
  ],
  providers: [
    InterBankConfig,
    OfflineFundsService
  ],
  exports: [OfflineFundsDetailComponent]
})
export class OfflineFundsModule {


}
