import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MemberSelectModalComponent} from './memberSelectModal.component';
import {MemberModule} from '../../base/member/member.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MemberModule
  ],
  declarations: [
    MemberSelectModalComponent
  ],
  entryComponents: [
    MemberSelectModalComponent
  ]
})
export class MemberSelectModalModule {


}
