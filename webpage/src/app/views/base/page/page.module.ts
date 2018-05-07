import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';

import {PageComponent} from './page.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    PageComponent
  ],
  exports: [PageComponent],
})
export class PageModule {


}
