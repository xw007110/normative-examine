// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { FinancialDebtComponent } from './financialDebt.component';
import { FinancialDebtDetailComponent } from './financialDebtDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: FinancialDebtComponent,
                data: {
                    title: '金融债'
                }
            },
            {
                path: 'detail/:id',
                component: FinancialDebtDetailComponent,
                data: {
                    title: '金融债信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FinancialDebtRoutingModule {}
