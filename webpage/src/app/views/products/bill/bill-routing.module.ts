// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { BillComponent } from './bill.component';
import { BillDetailComponent } from './billDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: BillComponent,
                data: {
                    title: '票据'
                }
            },
            {
                path: 'detail/:id',
                component: BillDetailComponent,
                data: {
                    title: '票据信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class BillRoutingModule {}
