// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ManagementPlanComponent } from './managementPlan.component';
import { ManagementPlanDetailComponent } from './managementPlanDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: ManagementPlanComponent,
                data: {
                    title: '资管计划'
                }
            },
            {
                path: 'detail/:id',
                component: ManagementPlanDetailComponent,
                data: {
                    title: '资管计划信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ManagementPlanRoutingModule {}
