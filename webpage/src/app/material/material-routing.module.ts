import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { MaterialListComponent }   from './material-list/material-list.component';


/**
 * 主体路由
 */
const materialRoutes: Routes = [
  {
    path: '',
    component: MaterialListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(materialRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialRoutingModule { }
