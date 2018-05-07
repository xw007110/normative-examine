// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPwdComponent } from './resetPwd.component';


const routes: Routes = [
    {
        path: '',
        component: ResetPwdComponent,
        data: {
          title: 'ResetPwd'
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ResetPwdRoutingModule {}
