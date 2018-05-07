import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '基础管理'
        },
        children: [
            {
                path: 'organization',
                loadChildren: './organization/organization.module#OrganizationModule',
                data: {
                    title: '机构管理'
                }
            },
            {
                path: 'person',
                loadChildren: './person/person.module#PersonModule',
                data: {
                    title: '人员管理'
                }
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#AdminModule',
                data: {
                    title: '用户管理'
                }
            },
            // {
            //     path: 'member',
            //     loadChildren: './member/member.module#MemberModule',
            //     data: {
            //         title: '会员信息'
            //     }
            // },
            {
                path: 'role',
                loadChildren: './role/role.module#RoleModule',
                data: {
                    title: '角色管理'
                }
            },
            // {
            //     path: 'merchant',
            //     loadChildren: './merchant/merchant.module#MerchantModule',
            //     data: {
            //         title: '商户管理'
            //     }
            // },
            // {
            //     path: 'member/grade',
            //     loadChildren: './grade/grade.module#GradeModule',
            //     data: {
            //         title: '会员等级'
            //     }
            // },
            // {
            //     path: 'member/profit',
            //     loadChildren: './profit/profit.module#ProfitModule',
            //     data: {
            //         title: '会员权益'
            //     }
            // },
            // {
            //     path: 'member/intergralRule',
            //     loadChildren: './integralRule/integralRule.module#IntegralRuleModule',
            //     data: {
            //         title: '积分规则'
            //     }
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaseRoutingModule { }
