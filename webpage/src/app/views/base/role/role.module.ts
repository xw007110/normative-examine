// system
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';

// module
import { PageModule } from '../page/page.module';
import { RoleRoutingModule } from './role-routing.module';
import { PermissionModule } from '../permission/permission.module';
// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
// componet
import { RoleListComponent } from './role.list.component';
import { RoleAddComponent } from './role.add.component';
import { RoleUpdateComponent } from './role.update.component';
import { RoleAllComponent } from './role.all.component';

// service
import { RoleService } from './role.service';
import { InterBankConfig } from '../../../providers/interbank-config';
import { PermissionService } from '../permission/permission.service';

@NgModule({
    imports: [
        RoleRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ModalModule.forRoot(),
        TreeModule,
        ToasterModule,
        PageModule,
        PermissionModule,
        LaddaModule
    ],
    declarations: [
        RoleListComponent,
        RoleAddComponent,
        RoleUpdateComponent,
        RoleAllComponent
    ],
    exports: [
        RoleListComponent,
        RoleAllComponent
    ],
    providers: [
        RoleService,
        InterBankConfig,
        BsModalService,
        ToasterService,
        PermissionService
    ]
})
export class RoleModule {


}
