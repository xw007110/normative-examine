// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { CreditDebtComponent } from './creditDebt.component';
import { CreditDebtDetailComponent } from './creditDebtDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: CreditDebtComponent,
                data: {
                    title: '信用债'
                }
            },
            {
                path: 'detail/:id',
                component: CreditDebtDetailComponent,
                data: {
                    title: '信用债信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CreditDebtRoutingModule {}
