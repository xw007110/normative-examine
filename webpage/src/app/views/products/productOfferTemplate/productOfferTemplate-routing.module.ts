// 系统
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// component
import {ProductOfferTemplateComponent} from './productOfferTemplate.component';

const routes: Routes = [
  {
    path: 'list/:id',
    component: ProductOfferTemplateComponent,
    data: {
      title: '报价详情'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductOfferTemplateRoutingModule {
}
