import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeModule, TreeNode} from 'primeng/primeng';

import {MemberComponent} from './member.component';
import {MemberService} from './member.service'
import {OrganizationService} from '../organization/organization.service';
import {PageModule} from '../page/page.module';
import {MemberRoutingModule} from './member-routing.module';
import {IntegralRecordComponent} from './integralRecord.component';
import {ModifyMobileComponent} from './member.modifyMobile.component';
import {MemberAllComponent} from './memberAll.component';
import {AuthenticateComponent} from './authenticate.component';
import { OrgSelectModalComponent } from "./orgselect.modal.component";
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {OrgTreeModule} from '../orgTree/orgTree.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    MemberRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    ModalModule.forRoot(),
    PageModule,
    OrgTreeModule,
    LaddaModule
  ],
  declarations: [
    MemberComponent,
    IntegralRecordComponent,
    ModifyMobileComponent,
    MemberAllComponent,
    AuthenticateComponent,
    OrgSelectModalComponent
  ],
  providers: [
    MemberService,
    InterBankConfig,
    OrganizationService,
    BsModalService
  ],
  exports: [
    MemberAllComponent
  ],
  entryComponents: [
    OrgSelectModalComponent
  ]
})
export class MemberModule {


}
