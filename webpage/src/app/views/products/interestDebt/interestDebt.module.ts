// 系统
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';
// module
import { InterestDebtRoutingModule } from './interestDebt-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import { InterestDebtComponent } from './interestDebt.component';
import { InterestDebtDetailComponent } from './interestDebtDetail.component';

// service
import { InterestDebtService } from './interestDebt.service';

@NgModule({
  imports: [
    InterestDebtRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule

  ],
  declarations: [
    InterestDebtComponent,
    InterestDebtDetailComponent
  ],
  providers: [
    InterBankConfig,
    InterestDebtService
  ],
  exports: [InterestDebtDetailComponent]
})
export class InterestDebtModule {


}
