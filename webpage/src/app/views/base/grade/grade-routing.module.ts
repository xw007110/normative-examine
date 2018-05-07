import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GradeComponent} from './grade.component';
import {GradeUpdateComponent} from './grade.update.component';
import {GradeProfitComponent} from './gradeProfit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: GradeComponent,
        data: {
          title: '等级列表'
        }
      },

      {
        path: 'update/:id',
        component: GradeUpdateComponent,
        data: {
          title: '等级修改'
        }
      },
      {
        path: 'profit/:selectedProfit',
        component: GradeProfitComponent,
        data: {
          title: '权益列表'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule {
}
