// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {ABSRoutingModule} from './ABS-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {ABSComponent} from './ABS.component';
import {ABSDetailComponent} from './ABSDetail.component';

// service
import {ABSService} from './ABS.service';

@NgModule({
  imports: [
    ABSRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    ABSComponent,
    ABSDetailComponent
  ],
  providers: [
    InterBankConfig,
    ABSService
  ],
  exports: [ABSDetailComponent]
})
export class ABSModule {


}
