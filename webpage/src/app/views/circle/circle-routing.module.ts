import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CircleComponent} from './circle.component';
import {CirclePersonComponent} from './circle.person.component';
import {CircleAddComponent} from './circle.add.component';
import {CircleUpdateComponent} from './circle.update.component';
const routes:Routes = [
  {
    path: '',
    data: {
      title: '社交圈子'
  },
    children: [
      {
        path: 'list',
        component: CircleComponent,
        data: {
          title: '圈子列表'
        }
      },
      {
        path: 'circlePerson/:id',
        component: CirclePersonComponent,
        data: {
          title: '圈内人员'
        }
      },
      {
        path: 'add',
        component: CircleAddComponent,
        data: {
          title: '圈子新增'
        }
      }, {
        path: 'update/:id',
        component: CircleUpdateComponent,
        data: {
          title: '圈子修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircleRoutingModule {
}
