import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeComponent } from './notice.component';
import { NoticeDetailComponent } from './noticeDetail.component';
import { NoticeAddComponent } from './notice.add.component';
import { NoticeUpdateComponent } from './notice.update.component';
const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'list',
                component: NoticeComponent
            },
            {
                path: 'detail/:id',
                component: NoticeDetailComponent
            },{
            path: 'add',
            component: NoticeAddComponent,
            data: {
              title: '公告新增'
            }
          }, {
            path: 'update/:id',
            component: NoticeUpdateComponent,
            data: {
              title: '公告修改'
            }
          }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class NoticeRoutingModule {}
