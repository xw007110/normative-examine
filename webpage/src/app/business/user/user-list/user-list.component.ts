import { Component, OnInit,ViewChild} from '@angular/core';
import { AppService } from '../../../app.service';

import {HttpPaginationComponent} from '../../../shared/pagination/http-pagination.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserBusinessService } from '../../../business-service/user/user-business.service';
import { UserInfo } from '../model/user.info';
import { Sex } from '../../../shared/pipes/sex.pipe';

@Component({
  selector: 'c-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent  {

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  url:string="";

  param:any = {
    name: 'admin',
    age: 16
  }

  dataList:Array<UserInfo>=[]

  pageList:Array<number>= [15, 25, 35]

   constructor(private appService: AppService,private ngbModalService: NgbModal
  , private userBusinessService: UserBusinessService,
  ) {
    this.appService.titleEventEmitter.emit("用户列表");
    this.listUser();
     
  }

  onDataChanged($event){
    console.info($event)
  }

  listUser() {

    let observable = this.userBusinessService.listUser(1,10,null,null);
    observable.subscribe(
      data => {
       
        if(data.code ==0){
        
          this.dataList =data.data;
          console.log(this.dataList );
        }
      },
      error => {
        console.log("listUser  " + error)
        return;

      }
    );

    
  }




   /**
   * 添加用户
   */
  addUser() {
    console.log("===  addUser  ===");
    this.ngbModalService.open(UserAddComponent, {windowClass: 'dark-modal', size: 'lg' }).result.then((result) => {

    }, (reason) => {

    });
  }
}