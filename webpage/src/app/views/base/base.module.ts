import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MenuComponent } from './menu/menu.component';

import { BaseRoutingModule } from './base-routing.module';

@NgModule({
    imports: [
        BaseRoutingModule,
        CommonModule
    ],
    declarations: [
        MenuComponent
    ]
})
export class BaseModule { }
