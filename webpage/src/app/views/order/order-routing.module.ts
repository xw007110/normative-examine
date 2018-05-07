// 系统
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// component
import {OrderComponent} from './order.component';
import {OrderDetailComponent} from './orderDetail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: OrderComponent,
        data: {
          title: '交易列表'
        }
      },
      {
        path: 'detail/:ids',
        component: OrderDetailComponent,
        data: {
          title: '交易详情'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
