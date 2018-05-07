// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleListComponent } from './role.list.component';
import { RoleAddComponent } from './role.add.component';
import { RoleUpdateComponent } from './role.update.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: RoleListComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add',
                component: RoleAddComponent,
                data: {
                    title: '角色新增'
                }
            }, {
                path: 'update/:id',
                component: RoleUpdateComponent,
                data: {
                    title: '角色修改'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }
