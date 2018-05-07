import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {KeywordsComponent} from './keywords.component';
import {KeywordsService} from './keywords.service'
import {PageModule} from '../../base/page/page.module';
import {KeywordsRoutingModule} from './keywords-routing.module';
import { KeywordsAddComponent } from "./keywords.add.component";
import {KeywordsUpdateComponent} from './keywords.update.component';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    KeywordsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageModule,
    LaddaModule
  ],
  declarations: [
    KeywordsComponent,
    KeywordsAddComponent,
    KeywordsUpdateComponent
  ],
  providers: [
    KeywordsService,
    InterBankConfig
  ]
})
export class KeywordsModule {


}
