import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { IntegralRecordComponent } from './integralRecord.component';
import { AuthenticateComponent } from './authenticate.component';
import { ModifyMobileComponent } from './member.modifyMobile.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: MemberComponent,
                data: {
                    title: ''
                }
            },
            {
                path: 'modifyMobile/:id',
                component: ModifyMobileComponent,
                data: {
                    title: '修改手机号'
                }
            },
            {
                path: 'integralRecord/:id',
                component: IntegralRecordComponent,
                data: {
                    title: '积分详情'
                }
            },
            {
                path: 'authenticate/:id',
                component: AuthenticateComponent,
                data: {
                    title: '会员认证'
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class MemberRoutingModule {}
