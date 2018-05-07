import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes:Routes = [
  {
    path: '',
    data: {
      title: '资讯管理'
    },
    children: [
      {
        path: 'advertise',
        loadChildren: './advertise/advertise.module#AdvertiseModule',
        data: {
          title: '广告'
        }
      },
      {
        path: 'notice',
        loadChildren: './notice/notice.module#NoticeModule',
        data: {
          title: '公告'
        }
      },
      // {
      //   path: 'feedback',
      //   loadChildren: './feedback/feedback.module#FeedbackModule',
      //   data: {
      //     title: '反馈'
      //   }
      // },
      // {
      //   path: 'messageTemplate',
      //   loadChildren: './messageTemplate/messageTemplate.module#MessageTemplateModule',
      //   data: {
      //     title: '短信模板'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule {
}
