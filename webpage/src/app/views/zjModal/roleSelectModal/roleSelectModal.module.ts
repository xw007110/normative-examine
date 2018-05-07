import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {RoleModule} from '../../base/role/role.module';
import {RoleSelectModalComponent} from './roleSelectModal.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    RoleModule
  ],
  declarations: [
    RoleSelectModalComponent
  ],
  entryComponents: [
    RoleSelectModalComponent
  ],
})
export class RoleSelectModalModule {


}
