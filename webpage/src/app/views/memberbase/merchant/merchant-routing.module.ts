import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantComponent } from './merchant.component';
import { MerchantAddComponent } from './merchant.add.component';
import { MerchantUpdateComponent } from './merchant.update.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: MerchantComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add',
                component: MerchantAddComponent,
                data: {
                    title : '商户新增'
                }
            },
            {
                path: 'update/:id',
                component: MerchantUpdateComponent,
                data: {
                    title : '商户修改'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MerchantRoutingModule {}
