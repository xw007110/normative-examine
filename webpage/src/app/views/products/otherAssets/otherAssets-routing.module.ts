// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { OtherAssetsComponent } from './otherAssets.component';
import { OtherAssetsDetailComponent } from './otherAssetsDetail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: OtherAssetsComponent,
                data: {
                    title: '其他资产'
                }
            },
            {
                path: 'detail/:id',
                component: OtherAssetsDetailComponent,
                data: {
                    title: '其他资产信息'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OtherAssetsRoutingModule {}
