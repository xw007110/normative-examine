import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {OrgTreeComponent} from './orgTree.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TreeModule,
  ],
  declarations: [
    OrgTreeComponent
  ],
  exports: [OrgTreeComponent],
})
export class OrgTreeModule {

}
