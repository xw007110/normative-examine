// 系统
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';
// module
import { FinancialDebtRoutingModule } from './financialDebt-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import { FinancialDebtComponent } from './financialDebt.component';
import { FinancialDebtDetailComponent } from './financialDebtDetail.component';

// service
import { FinancialDebtService } from './financialDebt.service';

@NgModule({
  imports: [
    FinancialDebtRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule

  ],
  declarations: [
    FinancialDebtComponent,
    FinancialDebtDetailComponent
  ],
  providers: [
    InterBankConfig,
    FinancialDebtService
  ],
  exports: [FinancialDebtDetailComponent]
})
export class FinancialDebtModule {


}
