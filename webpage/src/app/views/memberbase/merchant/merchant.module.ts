import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InterBankConfig} from '../../../providers/interbank-config';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TreeModule, TreeNode} from 'primeng/primeng';
import { AlertModule } from 'ngx-bootstrap/alert';

import {MerchantComponent} from './merchant.component';
import {MerchantService} from './merchant.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageModule } from '../page/page.module';
import { OrganizationService } from '../../base/organization/organization.service';
import { MerchantAddComponent } from './merchant.add.component';
import { MerchantUpdateComponent } from './merchant.update.component';
import { MerchantSelectModalComponent } from './merchant.select.modal.component';

import {MerchantRoutingModule} from './merchant-routing.module';
import {OrgTreeModule} from '../orgTree/orgTree.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    MerchantRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    TreeModule,
    PageModule,
    OrgTreeModule,
    LaddaModule
  ],
  declarations: [
    MerchantComponent,
    MerchantAddComponent,
    MerchantUpdateComponent,
    MerchantSelectModalComponent
  ],
  providers: [
    MerchantService,
    InterBankConfig,
    BsModalService,
    OrganizationService
  ],
  entryComponents: [
    MerchantSelectModalComponent
  ]
})
export class MerchantModule {


}
