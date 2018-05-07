import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MsgNotifyComponent} from './msgNotify.component';

const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: MsgNotifyComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsgNotifyRoutingModule {
}
