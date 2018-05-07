// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {CommonServiceDemandRoutingModule} from './commonServiceDemand-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
// component
import {CommonServiceDemandComponent} from './commonServiceDemand.component';
import {CommonServiceDemandDetailComponent} from './commonServiceDemandDetail.component';

// service
import {CommonServiceDemandService} from './commonServiceDemand.service';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

@NgModule({
  imports: [
    CommonServiceDemandRoutingModule,
    CommonModule,
    FormsModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    CommonServiceDemandComponent,
    CommonServiceDemandDetailComponent,
  ],
  providers: [
    InterBankConfig,
    CommonServiceDemandService
  ],
  exports: [CommonServiceDemandDetailComponent]
})
export class CommonServiceDemandModule {


}
