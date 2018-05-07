// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { CommonServiceDemandComponent } from './commonServiceDemand.component';
import { CommonServiceDemandDetailComponent } from './commonServiceDemandDetail.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: CommonServiceDemandComponent,
                data: {
                    title: '服务需求'
                }
            },
            {
                path: 'detail/:id',
                component: CommonServiceDemandDetailComponent,
                data: {
                    title: '服务需求信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CommonServiceDemandRoutingModule {}
