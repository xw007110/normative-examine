import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {FeedbackComponent} from './feedback.component';
import {FeedbackService} from './feedback.service'
import {PageModule} from '../../base/page/page.module';
import {FeedbackRoutingModule} from './feedback-routing.module';
import {FeedbackDetailComponent} from './feedbackDetail.component';
import {FeedbackAddComponent} from './feedback.add.component';
//import {FeedbackUpdateComponent} from './feedback.update.component';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    FeedbackRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PageModule,
    LaddaModule
  ],
  declarations: [
    FeedbackComponent,
    FeedbackDetailComponent,
    FeedbackAddComponent
  ],
  providers: [
    FeedbackService,
    InterBankConfig
  ]
})
export class FeedbackModule {


}
