import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialRoutingModule } from './material-routing.module';

import { MaterialListComponent}   from './material-list/material-list.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialRoutingModule
  ],
  declarations: [
    MaterialListComponent
  ],
  exports:      [],
  providers:    []
})
export class MaterialModule { }
