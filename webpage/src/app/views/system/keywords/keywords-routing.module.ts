import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {KeywordsComponent} from './keywords.component';
import {KeywordsUpdateComponent} from './keywords.update.component';
import { KeywordsAddComponent } from "./keywords.add.component";
const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: KeywordsComponent,
        data: {
          title: '关键字列表'
        }
      },
      {
        path: 'add',
        component: KeywordsAddComponent,
        data: {
          title: '关键字新增'
        }
      },
      {
        path: 'update/:id',
        component: KeywordsUpdateComponent,
        data: {
          title: '关键字修改'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeywordsRoutingModule {
}
