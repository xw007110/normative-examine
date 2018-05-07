import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InterBankConfig} from '../../providers/interbank-config';
import {MenuComponent} from './menu.component';
import {TreeModule,TreeNode} from 'primeng/primeng';
import {MenuService} from "./menu.service";
import {MenuRoutingModule} from './menu-routing.module';

@NgModule({
  imports: [
    MenuRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    TreeModule
  ],
  declarations: [
    MenuComponent,
  ],
  providers: [
    MenuService,
    InterBankConfig
  ]
})
export class MenuModule {


}
