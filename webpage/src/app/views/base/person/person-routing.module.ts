// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { PersonListComponent } from './person.list.component';
import { PersonAddComponent } from './person.add.component';
import { PersonUpdateComponent } from './person.update.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: PersonListComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'add',
                component: PersonAddComponent,
                data: {
                    title: '人员新增'
                }
            }, {
                path: 'update/:id',
                component: PersonUpdateComponent,
                data: {
                    title: '人员修改'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule { }
