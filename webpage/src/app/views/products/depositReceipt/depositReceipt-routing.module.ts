// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { DepositReceiptComponent } from './depositReceipt.component';
import { DepositReceiptDetailComponent } from './depositReceiptDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: DepositReceiptComponent,
                data: {
                    title: '存单'
                }
            },
            {
                path: 'detail/:id',
                component: DepositReceiptDetailComponent,
                data: {
                    title: '存单信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class DepositReceiptRoutingModule {}
