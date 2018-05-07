// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {BillRoutingModule} from './bill-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {BillComponent} from './bill.component';
import {BillDetailComponent} from './billDetail.component';

// service
import {BillService} from './bill.service';
import {ABSDetailComponent} from '../ABS/ABSDetail.component';


@NgModule({
  imports: [
    BillRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    BillComponent,
    BillDetailComponent
  ],
  providers: [
    InterBankConfig,
    BillService
  ],
  exports: [BillDetailComponent]
})
export class BillModule {


}
