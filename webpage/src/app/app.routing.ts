import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayout,
    data: {
      title: '首页'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'memberbase',
        loadChildren: './views/memberbase/memberbase.module#MemberbaseModule'
      },
      {
        path: 'tree',
        loadChildren: './views/menu/menu.module#MenuModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'resetPwd',
        loadChildren: './views/resetPwd/resetPwd.module#ResetPwdModule'
      },
      {
        path: 'products',
        loadChildren: './views/products/products.module#ProductsModule'
      },
      {
        path: 'circle',
        loadChildren: './views/circle/circle.module#CircleModule'
      },
      {
        path: 'integralRule',
        loadChildren: './views/integralRule/integralRule.module#IntegralRuleModule'
      },
      {
        path: 'profit',
        loadChildren: './views/profit/profit.module#ProfitModule'
      },
      {
        path: 'order',
        loadChildren: './views/order/order.module#OrderModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#FormsModule'
      },
      {
        path: 'plugins',
        loadChildren: './views/plugins/plugins.module#PluginsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'uikits',
        loadChildren: './views/uikits/uikits.module#UIKitsModule'
      },
      {
        path: 'cms',
        loadChildren: './views/cms/cms.module#CmsModule'
      },
      {
        path: 'sys',
        loadChildren: './views/system/system.module#SystemModule'
      },
      {
        path: 'total',
        loadChildren: './views/total/total.module#TotalModule'
      }
    ]
  },
  {
    path: 'login',
    component: SimpleLayout,
    children: [
      {
        path: '',
        loadChildren: './views/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayout,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
