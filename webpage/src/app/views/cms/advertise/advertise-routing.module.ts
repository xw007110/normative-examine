import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdvertiseComponent} from './advertise.component';
import {AdvertiseDetailComponent} from './advertiseDetail.component';
import {AdvertiseAddComponent} from './advertise.add.component';
import {AdvertiseUpdateComponent} from './advertise.update.component';
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: AdvertiseComponent,
        data: {
          title: '广告列表'
        }
      },
      {
        path: 'detail/:id',
        component: AdvertiseDetailComponent,
        data: {
          title: '广告内容'
        }
      },
      {
        path: 'add',
        component: AdvertiseAddComponent,
        data: {
          title: '广告新增'
        }
      }, {
        path: 'update/:id',
        component: AdvertiseUpdateComponent,
        data: {
          title: '广告修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertiseRoutingModule {
}
