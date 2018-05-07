import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '会员管理'
        },
        children: [
            {
                path: 'member',
                loadChildren: './member/member.module#MemberModule',
                data: {
                    title: '会员信息'
                }
            },
            {
                path: 'merchant',
                loadChildren: './merchant/merchant.module#MerchantModule',
                data: {
                    title: '商户管理'
                }
            },
            {
                path: 'grade',
                loadChildren: './grade/grade.module#GradeModule',
                data: {
                    title: '会员等级'
                }
            },
            {
                path: 'profit',
                loadChildren: './profit/profit.module#ProfitModule',
                data: {
                    title: '会员权益'
                }
            },
            {
                path: 'intergralRule',
                loadChildren: './integralRule/integralRule.module#IntegralRuleModule',
                data: {
                    title: '积分规则'
                }
            },
            {
                path: 'feedback',
                loadChildren: './feedback/feedback.module#FeedbackModule',
                data: {
                    title: '反馈处理'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberbaseRoutingModule { }
