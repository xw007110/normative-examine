import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MsgNotifyComponent} from './msgNotify.component';
import {MsgNotifyService} from './msgNotify.service'
import {PageModule} from '../../base/page/page.module';
import {MsgNotifyRoutingModule} from './msgNotify-routing.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    MsgNotifyRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PageModule,
    LaddaModule
  ],
  declarations: [
    MsgNotifyComponent
  ],
  providers: [
    MsgNotifyService,
    InterBankConfig
  ]
})
export class MsgNotifyModule {


}
