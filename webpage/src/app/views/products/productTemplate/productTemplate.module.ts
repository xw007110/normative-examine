import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// Loading Buttons
import { LaddaModule } from 'angular2-ladda';

import {ProductTemplateComponent} from './productTemplate.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    LaddaModule
  ],
  declarations: [
    ProductTemplateComponent,
  ],
  exports: [ProductTemplateComponent]
})
export class ProductTemplateModule {
}
