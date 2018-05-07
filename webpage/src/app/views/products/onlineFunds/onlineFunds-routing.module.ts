// 系统
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { OnlineFundsComponent } from './onlineFunds.component';
import { OnlineFundsDetailComponent } from './onlineFundsDetail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: OnlineFundsComponent,
        data: {
          title: '线上资金'
        }
      },
      {
        path: 'detail/:id',
        component: OnlineFundsDetailComponent,
        data: {
          title: '线上资金信息'
        }
      }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class OnlineFundsRoutingModule {}
