import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProductOfferTemplateComponent} from './productOfferTemplate.component';
import {ProductOfferTemplateRoutingModule} from './productOfferTemplate-routing.module';

import {InterBankConfig} from '../../../providers/interbank-config';
import {ProductOfferTemplateService} from './productOfferTemplate.service';
import {PageModule} from '../../base/page/page.module';

@NgModule({
  imports: [
    ProductOfferTemplateRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    PageModule
  ],
  declarations: [
    ProductOfferTemplateComponent,
  ],
  providers: [
    InterBankConfig,
    ProductOfferTemplateService
  ],
  exports: [ProductOfferTemplateComponent]
})
export class ProductOfferTemplateModule {

}
