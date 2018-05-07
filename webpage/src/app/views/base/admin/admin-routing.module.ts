// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminListComponent } from './admin.list.component';
import { AdminAddComponent } from './admin.add.component';
import { AdminUpdateComponent } from './admin.update.component';
import { UpdatePwdComponent } from './admin.updatePwd.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: AdminListComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add',
                component: AdminAddComponent,
                data: {
                    title: '用户新增'
                }
            },
            {
                path: 'update/:id',
                component: AdminUpdateComponent,
                data: {
                    title: '用户修改'
                }
            },
            {
                path: 'updatePwd/:id',
                component: UpdatePwdComponent,
                data: {
                    title: '密码修改'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
