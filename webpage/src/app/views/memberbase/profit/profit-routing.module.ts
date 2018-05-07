import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfitComponent} from './profit.component';
import {ProfitUpdateComponent} from './profit.update.component';
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ProfitComponent,
        data: {
          title: '权益列表'
        }
      },
       {
        path: 'update/:id',
        component: ProfitUpdateComponent,
        data: {
          title: '权益修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitRoutingModule {
}
