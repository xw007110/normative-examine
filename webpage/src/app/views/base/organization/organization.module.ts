// 系统
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../../providers/interbank-config';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {AlertModule} from 'ngx-bootstrap/alert';

// component
import {OrganizationListComponent} from './organization.list.component';
import {OrganizationAddComponent} from './organization.add.component';
import {OrganizationUpdateComponent} from './organization.update.component';
import {OrganizationService} from './organization.service';
import {OrganizationSelectModalComponent} from './organization.select.modal.component';

// module
import {PageModule} from '../page/page.module';
import {OrganizationRoutingModule} from './organization-routing.module';
import {OrgTreeModule} from '../orgTree/orgTree.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
import { ProductOfferTemplateComponent } from 'app/views/products/productOfferTemplate/productOfferTemplate.component';

@NgModule({
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TreeModule,
    ToasterModule,
    PageModule,
    OrgTreeModule,
    LaddaModule
  ],
  declarations: [
    OrganizationListComponent,
    OrganizationAddComponent,
    OrganizationUpdateComponent,
    OrganizationSelectModalComponent
  ],
  providers: [
    OrganizationService,
    InterBankConfig,
    BsModalService,
    ToasterService
  ],
  entryComponents: [
    OrganizationSelectModalComponent
  ]
})
export class OrganizationModule {


}
