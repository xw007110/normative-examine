// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { OfflineFundsComponent } from './offlineFunds.component';
import { OfflineFundsDetailComponent } from './offlineFundsDetail.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: OfflineFundsComponent,
                data: {
                    title: '线下资金'
                }
            },
            {
                path: 'detail/:id',
                component: OfflineFundsDetailComponent,
                data: {
                    title: '线下资金信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OfflineFundsRoutingModule {}
