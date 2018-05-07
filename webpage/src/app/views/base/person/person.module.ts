// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsModalService} from 'ngx-bootstrap/modal';

// component
import {PersonListComponent} from './person.list.component';
import {PersonAddComponent} from './person.add.component';
import {PersonUpdateComponent} from './person.update.component';

// service
import {PersonService} from './person.service';
import {OrganizationService} from '../organization/organization.service';

// module
import {PageModule} from '../page/page.module';
import {PersonRoutingModule} from './person-routing.module';
import {OrganizationModule} from '../organization/organization.module';
import {PersonAllComponent} from './person.all.component';
import {OrgTreeModule} from '../orgTree/orgTree.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    PersonRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeModule,
    ToasterModule,
    ModalModule.forRoot(),
    PageModule,
    OrganizationModule,
    OrgTreeModule,
    LaddaModule
  ],
  declarations: [
    PersonListComponent,
    PersonAddComponent,
    PersonUpdateComponent,
    PersonAllComponent
  ],
  providers: [
    PersonService,
    InterBankConfig,
    OrganizationService,
    BsModalService,
    ToasterService
  ],
  exports: [
    PersonAllComponent
  ]
})
export class PersonModule {

}
