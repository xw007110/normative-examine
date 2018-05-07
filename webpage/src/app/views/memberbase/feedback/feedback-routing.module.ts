import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FeedbackComponent} from './feedback.component';
import {FeedbackDetailComponent} from './feedbackDetail.component';
import {FeedbackAddComponent} from './feedback.add.component';
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: FeedbackComponent
      },
      {
        path: 'detail/:id',
        component: FeedbackDetailComponent
      },
      {
        path: 'add/:id',
        component: FeedbackAddComponent,
        data: {
          title: '反馈完成'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {
}
