import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MessageTemplateComponent} from './messageTemplate.component';
import {MessageTemplateDetailComponent} from './messageTemplateDetail.component';
import {MessageTemplateAddComponent} from './messageTemplate.add.component';
import {MessageTemplateUpdateComponent} from './messageTemplate.update.component';
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: MessageTemplateComponent
      },
      {
        path: 'detail/:id',
        component: MessageTemplateDetailComponent
      },
      {
        path: 'add',
        component: MessageTemplateAddComponent,
        data: {
          title: '短信模板新增'
        }
      }, {
        path: 'update/:id',
        component: MessageTemplateUpdateComponent,
        data: {
          title: '短息模板修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTemplateRoutingModule {
}
