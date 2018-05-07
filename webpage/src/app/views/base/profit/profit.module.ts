import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ProfitComponent} from './profit.component';
import {ProfitService} from './profit.service';
import {ProfitRoutingModule} from './profit-routing.module';
import {ProfitUpdateComponent} from './profit.update.component';
@NgModule({
  imports: [
    ProfitRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
    ProfitComponent,
    ProfitUpdateComponent
  ],
  providers: [
    ProfitService,
    InterBankConfig
  ]
})
export class ProfitModule {


}
