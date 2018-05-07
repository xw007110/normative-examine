// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { TrustPlanComponent } from './trustPlan.component';
import { TrustPlanDetailComponent } from './trustPlanDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: TrustPlanComponent,
                data: {
                    title: '信托计划'
                }
            },
            {
                path: 'detail/:id',
                component: TrustPlanDetailComponent,
                data: {
                    title: '信托计划信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TrustPlanRoutingModule {}
