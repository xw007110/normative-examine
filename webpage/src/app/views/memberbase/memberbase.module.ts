import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MenuComponent } from './menu/menu.component';

import { MemberbaseRoutingModule } from './memberbase-routing.module';

@NgModule({
    imports: [
        MemberbaseRoutingModule,
        CommonModule
    ],
    declarations: [
        MenuComponent
    ]
})
export class MemberbaseModule { }
