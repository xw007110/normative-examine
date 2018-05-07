// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {DepositReceiptRoutingModule} from './depositReceipt-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {DepositReceiptComponent} from './depositReceipt.component';
import {DepositReceiptDetailComponent} from './depositReceiptDetail.component';

// service
import {DepositReceiptService} from './depositReceipt.service';


@NgModule({
  imports: [
    DepositReceiptRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    DepositReceiptComponent,
    DepositReceiptDetailComponent
  ],
  providers: [
    InterBankConfig,
    DepositReceiptService
  ],
  exports: [DepositReceiptDetailComponent]
})
export class DepositReceiptModule {


}
