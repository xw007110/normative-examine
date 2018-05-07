import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CircleComponent} from './circle.component';
import {CircleService} from './circle.service';
import {CirclePersonService} from './circlePerson.service';
import {PageModule} from '../base/page/page.module';
import {CircleRoutingModule} from './circle-routing.module';
import {CirclePersonComponent} from './circle.person.component';
import {CircleAddComponent} from './circle.add.component';
import {CircleUpdateComponent} from './circle.update.component';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    CircleRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PageModule,
    LaddaModule
  ],
  declarations: [
    CircleComponent,
    CirclePersonComponent,
    CircleAddComponent,
    CircleUpdateComponent
  ],
  providers: [
    CircleService,
    CirclePersonService,
    InterBankConfig
  ]
})
export class CircleModule {


}
