// 系统
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';
// module
import { FinancingRoutingModule } from './financing-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import { FinancingComponent } from './financing.component';
import { FinancingDetailComponent } from './financingDetail.component';

// service
import { FinancingService } from './financing.service';

@NgModule({
  imports: [
    FinancingRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule

  ],
  declarations: [
    FinancingComponent,
    FinancingDetailComponent
  ],
  providers: [
    InterBankConfig,
    FinancingService
  ],
  exports: [FinancingDetailComponent]
})
export class FinancingModule {


}
