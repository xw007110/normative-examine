// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { CommonStockFundsComponent } from './commonStockFunds.component';
import { CommonStockFundsDetailComponent } from './commonStockFundsDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: CommonStockFundsComponent,
                data: {
                    title: '存量资金'
                }
            },
            {
                path: 'detail/:id',
                component: CommonStockFundsDetailComponent,
                data: {
                    title: '存量资金信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CommonStockFundsRoutingModule {}
