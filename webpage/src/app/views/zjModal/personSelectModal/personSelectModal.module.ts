import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PersonSelectModalComponent} from './personSelectModal.component';
import {PersonModule} from '../../base/person/person.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    PersonModule
  ],
  declarations: [
    PersonSelectModalComponent
  ],
  entryComponents: [
    PersonSelectModalComponent
  ],
})
export class PersonSelectModalModule {


}
