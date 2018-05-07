import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {IntegralRuleComponent} from './integralRule.component';
import {IntegralRuleService} from './integralRule.service';
import {IntegralRuleRoutingModule} from './integralRule-routing.module';
import {IntegralRuleUpdateComponent} from './integralRule.update.component';
@NgModule({
  imports: [
    IntegralRuleRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    IntegralRuleComponent,
    IntegralRuleUpdateComponent
  ],
  providers: [
    IntegralRuleService,
    InterBankConfig
  ]
})
export class IntegralRuleModule {


}
