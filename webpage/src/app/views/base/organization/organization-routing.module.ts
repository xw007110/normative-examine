// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListComponent } from './organization.list.component';
import { OrganizationAddComponent } from './organization.add.component';
import { OrganizationUpdateComponent } from './organization.update.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: OrganizationListComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add',
                component: OrganizationAddComponent,
                data: {
                    title: '机构新增'
                }
            }, {
                path: 'update/:id',
                component: OrganizationUpdateComponent,
                data: {
                    title: '机构修改'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OrganizationRoutingModule {}
