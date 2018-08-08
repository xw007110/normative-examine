import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MainComponent }   from './main.component';
import { UserAddComponent } from '../business/user/user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { UserBusinessService } from '../business-service/user/user-business.service';

/**
 * 主体路由
 */
const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', loadChildren: 'app/business/home/home.module#HomeModule' },
      { path: 'demo', loadChildren: 'app/business/demo/demo.module#DemoModule' },
      { path: 'user', loadChildren: 'app/business/user/user.module#UserModule' },
      { path: 'role', loadChildren: 'app/business/role/role.module#RoleModule' },
      { path: 'menu', loadChildren: 'app/business/menu/menu.module#MenuModule' },
      { path: 'sysLog', loadChildren: 'app/business/sys-log/sys-log.module#SysLogModule' },
      { path: 'sysMonitor', loadChildren: 'app/business/sys-monitor/sys-monitor.module#SysMonitorModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes),
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    UserAddComponent,//用户添加弹出框
 ],
providers:[
  UserBusinessService,
],
 entryComponents:[UserAddComponent],
})
export class MainRoutingModule { }
