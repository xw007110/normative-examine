// 系统
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';
// module
import { CreditDebtRoutingModule } from './creditDebt-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import { CreditDebtComponent } from './creditDebt.component';
import { CreditDebtDetailComponent } from './creditDebtDetail.component';

// service
import { CreditDebtService } from './creditDebt.service';


@NgModule({
  imports: [
    CreditDebtRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule

  ],
  declarations: [
    CreditDebtComponent,
    CreditDebtDetailComponent
  ],
  providers: [
    InterBankConfig,
    CreditDebtService
  ],
  exports: [CreditDebtDetailComponent]
})
export class CreditDebtModule {


}
