import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';

import {GradeComponent} from './grade.component';
import {GradeProfitComponent} from './gradeProfit.component';
import {GradeService} from './grade.service';
import {ProfitService} from '../profit/profit.service';
import {GradeRoutingModule} from './grade-routing.module';
import {GradeUpdateComponent} from './grade.update.component';

@NgModule({
  imports: [
    GradeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    GradeComponent,
    GradeUpdateComponent,
    GradeProfitComponent
  ],
  providers: [
    GradeService,
    ProfitService,
    InterBankConfig
  ]
})
export class GradeModule {


}
