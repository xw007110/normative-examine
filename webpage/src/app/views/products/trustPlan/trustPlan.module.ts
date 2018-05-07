// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {TrustPlanRoutingModule} from './trustPlan-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {TrustPlanComponent} from './trustPlan.component';
import {TrustPlanDetailComponent} from './trustPlanDetail.component';

// service
import {TrustPlanService} from './trustPlan.service';

@NgModule({
  imports: [
    TrustPlanRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    TrustPlanComponent,
    TrustPlanDetailComponent
  ],
  providers: [
    InterBankConfig,
    TrustPlanService
  ],
  exports: [TrustPlanDetailComponent]
})
export class TrustPlanModule {


}
