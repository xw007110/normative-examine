import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { PaginationModule}       from '../../shared/pagination/pagination.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInfoComponent} from './user-info/user-info.component';
import { UserBusinessService } from '../../business-service/user/user-business.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    PaginationModule
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserInfoComponent
  ],
  exports: [
  ],
  providers: [
    UserBusinessService
  ]
})
export class UserModule { }
