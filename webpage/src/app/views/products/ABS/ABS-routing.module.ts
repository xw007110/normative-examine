// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { ABSComponent } from './ABS.component';
import { ABSDetailComponent } from './ABSDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: ABSComponent,
                data: {
                    title: 'ABS'
                }
            },
            {
                path: 'detail/:id',
                component: ABSDetailComponent,
                data: {
                    title: 'ABS信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ABSRoutingModule {}
