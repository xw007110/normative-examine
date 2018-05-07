// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

import {AdminListComponent} from './admin.list.component';
import {AdminAddComponent} from './admin.add.component';
import {UpdatePwdComponent} from './admin.updatePwd.component';
import { AdminUpdateComponent } from './admin.update.component';
// service
import {AdminService} from './admin.service';
import {OrganizationService} from '../organization/organization.service';
import {RoleService} from '../role/role.service';

import {AdminRoutingModule} from './admin-routing.module';
import {PageModule} from '../page/page.module';

import {PersonSelectModalModule} from '../../zjModal/personSelectModal/personSelectModal.module';
import {RoleSelectModalModule} from '../../zjModal/roleSelectModal/roleSelectModal.module';
import {MemberSelectModalModule} from '../../zjModal/memberSelectModal/memberSelectModal.module';
import {OrgTreeModule} from '../orgTree/orgTree.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    ToasterModule,
    ModalModule.forRoot(),
    PageModule,
    PersonSelectModalModule,
    RoleSelectModalModule,
    MemberSelectModalModule,
    OrgTreeModule,
    LaddaModule
  ],
  declarations: [
    AdminListComponent,
    AdminAddComponent,
    AdminUpdateComponent,
    UpdatePwdComponent
  ],
  providers: [
    AdminService,
    InterBankConfig,
    OrganizationService,
    BsModalService,
    ToasterService,
    RoleService
  ]
})
export class AdminModule {


}
