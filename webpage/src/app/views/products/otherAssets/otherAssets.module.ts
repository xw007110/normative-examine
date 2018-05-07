// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';

// module
import {OtherAssetsRoutingModule} from './otherAssets-routing.module';
import {ProductTemplateModule} from '../productTemplate/productTemplate.module';
import {PageModule} from '../../base/page/page.module';
import {ProductOfferTemplateModule} from '../productOfferTemplate/productOfferTemplate.module';

// component
import {OtherAssetsComponent} from './otherAssets.component';
import {OtherAssetsDetailComponent} from './otherAssetsDetail.component';

// service
import {OtherAssetsService} from './otherAssets.service';

@NgModule({
  imports: [
    OtherAssetsRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ProductTemplateModule,
    PageModule,
    ProductOfferTemplateModule
  ],
  declarations: [
    OtherAssetsComponent,
    OtherAssetsDetailComponent
  ],
  providers: [
    InterBankConfig,
    OtherAssetsService
  ],
  exports: [OtherAssetsDetailComponent]
})
export class OtherAssetsModule {


}
