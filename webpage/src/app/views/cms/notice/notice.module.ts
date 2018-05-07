import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
// Datepicker
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

import {NoticeComponent} from './notice.component';
import {NoticeService} from './notice.service'
import {PageModule} from '../../base/page/page.module';
import {NoticeRoutingModule} from './notice-routing.module';
import {NoticeDetailComponent} from './noticeDetail.component';
import {NoticeAddComponent} from './notice.add.component';
import {NoticeUpdateComponent} from './notice.update.component';
@NgModule({
  imports: [
    NoticeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PageModule,
    DatepickerModule.forRoot(),
  ],
  declarations: [
    NoticeComponent,
    NoticeDetailComponent,
    NoticeAddComponent,
    NoticeUpdateComponent
  ],
  providers: [
    NoticeService,
    InterBankConfig
  ]
})
export class NoticeModule {


}
