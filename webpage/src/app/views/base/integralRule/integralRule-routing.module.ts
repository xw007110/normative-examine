import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {IntegralRuleComponent} from './integralRule.component';
import {IntegralRuleUpdateComponent} from './integralRule.update.component';
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: IntegralRuleComponent,
        data: {
          title: '积分规则列表'
        }
      },
       {
        path: 'update/:id',
        component: IntegralRuleUpdateComponent,
        data: {
          title: '积分规则修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegralRuleRoutingModule {
}
