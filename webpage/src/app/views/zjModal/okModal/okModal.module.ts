import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

import {OkModalComponent} from './okModal.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    OkModalComponent
  ],
  exports: [OkModalComponent],
})
export class OkModalModule {


}
