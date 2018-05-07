// system
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// component
import { MenuTreeComponent } from './menu.tree.component';

// service
import { PermissionService } from './permission.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        TreeModule
    ],
    declarations: [
        MenuTreeComponent
    ],
    exports: [
        MenuTreeComponent
    ],
    providers: [
        PermissionService
    ],
    entryComponents: [
    ]
})
export class PermissionModule {

}
