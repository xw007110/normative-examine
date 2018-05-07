import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterBankConfig } from '../../providers/interbank-config';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResetPwdRoutingModule } from './resetPwd-routing.module';

import { ResetPwdComponent } from './resetPwd.component';

import { AdminService } from '../base/admin/admin.service';


@NgModule({
    imports: [
        ResetPwdRoutingModule,
        CommonModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        ResetPwdComponent
    ],
    providers: [
        InterBankConfig,
        AdminService
    ]
})

export class ResetPwdModule {

    }
