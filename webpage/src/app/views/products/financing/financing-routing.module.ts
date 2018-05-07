// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { FinancingComponent } from './financing.component';
import { FinancingDetailComponent } from './financingDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: FinancingComponent,
                data: {
                    title: '理财产品'
                }
            },
            {
                path: 'detail/:id',
                component: FinancingDetailComponent,
                data: {
                    title: '理财产品信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FinancingRoutingModule {}
