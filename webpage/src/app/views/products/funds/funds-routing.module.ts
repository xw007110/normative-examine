// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { FundsComponent } from './funds.component';
import { FundsDetailComponent } from './fundsDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: FundsComponent,
                data: {
                    title: '基金'
                }
            },
            {
                path: 'detail/:id',
                component: FundsDetailComponent,
                data: {
                    title: '基金信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class FundsRoutingModule {}
