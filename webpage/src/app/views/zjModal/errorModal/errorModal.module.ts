import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

import {ErrorModalComponent} from './errorModal.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ErrorModalComponent
  ],
  exports: [ErrorModalComponent],
})
export class ErrorModalModule {


}
