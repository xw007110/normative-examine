import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes:Routes = [
  {
    path: '',
    data: {
      title: '系统设置'
    },
    children: [
      {
        path: 'keyword',
        loadChildren: './keywords/keywords.module#KeywordsModule',
        data: {
          title: '关键字'
        }
      },
      {
        path: 'messageTemplate',
        loadChildren: './messageTemplate/messageTemplate.module#MessageTemplateModule',
        data: {
          title: '短信模板'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
