import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes:Routes = [
  {
    path: '',
    data: {
      title: '统计分析'
    },
    children: [
      {
        path: 'msgNotify',
        loadChildren: './msgNotify/msgNotify.module#MsgNotifyModule',
        data: {
          title: '推送通知'
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TotalRoutingModule {
}
