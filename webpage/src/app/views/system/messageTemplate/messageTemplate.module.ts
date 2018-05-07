import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MessageTemplateComponent} from './messageTemplate.component';
import {MessageTemplateService} from './messageTemplate.service'
import {PageModule} from '../../base/page/page.module';
import {MessageTemplateRoutingModule} from './messageTemplate-routing.module';
import {MessageTemplateDetailComponent} from './messageTemplateDetail.component';
import {MessageTemplateAddComponent} from './messageTemplate.add.component';
import {MessageTemplateUpdateComponent} from './messageTemplate.update.component';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    MessageTemplateRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PageModule,
    LaddaModule
  ],
  declarations: [
    MessageTemplateComponent,
    MessageTemplateDetailComponent,
    MessageTemplateAddComponent,
    MessageTemplateUpdateComponent
  ],
  providers: [
    MessageTemplateService,
    InterBankConfig
  ]
})
export class MessageTemplateModule {


}
