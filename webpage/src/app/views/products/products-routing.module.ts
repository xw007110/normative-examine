import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        data: {
            title : '需求管理'
        },
        children: [
            {
                path: 'onlineFunds', // 线上资金
                loadChildren: './onlineFunds/onlineFunds.module#OnlineFundsModule',
                data: {
                    title : '线上资金'
                }
            },
            {
                path: 'offlineFunds', // 线下资金
                loadChildren: './offlineFunds/offlineFunds.module#OfflineFundsModule',
                data: {
                    title : '线下资金'
                }
            },
            {
                path: 'financing', // 理财产品
                loadChildren: './financing/financing.module#FinancingModule',
                data: {
                    title : '理财产品'
                }
            },
            {
                path: 'financialDebt', // 金融债
                loadChildren: './financialDebt/financialDebt.module#FinancialDebtModule',
                data: {
                    title : '金融债'
                }
            },
            {
                path: 'interestDebt', // 利率债
                loadChildren: './interestDebt/interestDebt.module#InterestDebtModule',
                data: {
                    title : '利率债'
                }
            },
            {
                path: 'creditDebt', // 信用债
                loadChildren: './creditDebt/creditDebt.module#CreditDebtModule',
                data: {
                    title : '信用债'
                }
            },
            {
                path: 'depositReceipt', // 债券存单
                loadChildren: './depositReceipt/depositReceipt.module#DepositReceiptModule',
                data: {
                    title : '债券存单'
                }
            },
            {
                path: 'bill', // 票据
                loadChildren: './bill/bill.module#BillModule',
                data: {
                    title : '票据'
                }
            },
            {
                path: 'funds', // 基金
                loadChildren: './funds/funds.module#FundsModule',
                data: {
                    title : '基金'
                }
            },
            {
                path: 'ABS', // ABS
                loadChildren: './ABS/ABS.module#ABSModule',
                data: {
                    title : 'ABS'
                }
            },
            {
                path: 'managementPlan', // 资管计划
                loadChildren: './managementPlan/managementPlan.module#ManagementPlanModule',
                data: {
                    title : '资管计划'
                }
            },
            {
                path: 'trustPlan', // 信托计划
                loadChildren: './trustPlan/trustPlan.module#TrustPlanModule',
                data: {
                    title : '信托计划'
                }
            },
            {
                path: 'otherAssets', // 其他资产
                loadChildren: './otherAssets/otherAssets.module#OtherAssetsModule',
                data: {
                    title : '其他资产'
                }
            },
            {
                path: 'commonStockFunds', // 【通用】存量资金
                loadChildren: './commonStockFunds/commonStockFunds.module#CommonStockFundsModule',
                data: {
                    title : '【通用】存量资金'
                }
            },
            {
                path: 'commonServiceDemand', // 【通用】服务需求
                loadChildren: './commonServiceDemand/commonServiceDemand.module#CommonServiceDemandModule',
                data: {
                    title : '【通用】服务需求'
                }
            },
            {
                path: 'productOfferTemplate', // 报价模版
                loadChildren: './productOfferTemplate/productOfferTemplate.module#ProductOfferTemplateModule',
                data: {
                    title : '报价详情'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProductsRoutingModule {}
