// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {ManagementPlanRoutingModule} from './managementPlan-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {ManagementPlanComponent} from './managementPlan.component';
import {ManagementPlanDetailComponent} from './managementPlanDetail.component';

// service
import {ManagementPlanService} from './managementPlan.service';

@NgModule({
  imports: [
    ManagementPlanRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    ManagementPlanComponent,
    ManagementPlanDetailComponent
  ],
  providers: [
    InterBankConfig,
    ManagementPlanService
  ],
  exports: [ManagementPlanDetailComponent]
})
export class ManagementPlanModule {


}
