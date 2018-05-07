import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PageModule} from '../base/page/page.module';

// Loading Buttons
import {LaddaModule} from 'angular2-ladda';

import {OrderComponent} from './order.component';
import {OrderRoutingModule} from './order-routing.module';

import {InterBankConfig} from '../../providers/interbank-config';
import {OrderService} from './order.service';
import {OnlineFundsModule} from '../products/onlineFunds/onlineFunds.module';
import {OrderDetailComponent} from './orderDetail.component';
import {ABSModule} from '../products/ABS/ABS.module';
import {BillModule} from '../products/bill/bill.module';
import {CommonServiceDemandModule} from '../products/commonServiceDemand/commonServiceDemand.module';
import {CreditDebtModule} from '../products/creditDebt/creditDebt.module';
import {DepositReceiptModule} from '../products/depositReceipt/depositReceipt.module';
import {FinancialDebtModule} from '../products/financialDebt/financialDebt.module';
import {FinancingModule} from '../products/financing/financing.module';
import {FundsModule} from '../products/funds/funds.module';
import {InterestDebtModule} from '../products/interestDebt/interestDebt.module';
import {ManagementPlanModule} from '../products/managementPlan/managementPlan.module';
import {OfflineFundsModule} from '../products/offlineFunds/offlineFunds.module';
import {OtherAssetsModule} from '../products/otherAssets/otherAssets.module';
import {TrustPlanModule} from '../products/trustPlan/trustPlan.module';
import {CommonStockFundsModule} from '../products/commonStockFunds/commonStockFunds.module';
import {MemberSelectModalModule} from '../zjModal/memberSelectModal/memberSelectModal.module';


@NgModule({
  imports: [
    OrderRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    LaddaModule,
    PageModule,
    OnlineFundsModule,
    ABSModule,
    BillModule,
    CommonServiceDemandModule,
    CreditDebtModule,
    DepositReceiptModule,
    FinancialDebtModule,
    FinancingModule,
    FundsModule,
    InterestDebtModule,
    ManagementPlanModule,
    OfflineFundsModule,
    OnlineFundsModule,
    OtherAssetsModule,
    TrustPlanModule,
    CommonStockFundsModule,
    MemberSelectModalModule
  ],
  declarations: [
    OrderComponent,
    OrderDetailComponent,
  ],
  providers: [
    InterBankConfig,
    OrderService
  ]
})
export class OrderModule {

}
