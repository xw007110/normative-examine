import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { InterBankConfig } from '../../providers/interbank-config';


import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

import { LoginService } from './login.service';

// Loading Buttons
import { LaddaModule } from 'angular2-ladda';

@NgModule({

  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    LaddaModule
  ],
  declarations: [
    LoginComponent
  ],
  providers : [
    LoginService,
    InterBankConfig
  ]
})
export class LoginModule { }
