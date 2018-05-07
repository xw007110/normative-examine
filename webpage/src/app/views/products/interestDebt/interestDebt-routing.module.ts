// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { InterestDebtComponent } from './interestDebt.component';
import { InterestDebtDetailComponent } from './interestDebtDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: InterestDebtComponent,
                data: {
                    title: '利率债'
                }
            },
            {
                path: 'detail/:id',
                component: InterestDebtDetailComponent,
                data: {
                    title: '利率债信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class InterestDebtRoutingModule {}
