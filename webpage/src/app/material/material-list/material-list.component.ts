import { Component, OnInit, SecurityContext  } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { HttpService } from '../../shared/http/http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../shared/toast/toast.service';
import { ToastConfig, ToastType } from '../../shared/toast/toast-model';
import { CustomValidators } from '../../shared/custom-validator/custom-validator';
import { UserBusinessService} from '../../business-service/user/user-business.service';
import { Utils } from "../../shared/util/utils";
import { DomSanitizer } from "@angular/platform-browser";
import {Md5} from "ts-md5/dist/md5";


@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  votes:number;
  title:string;
  link:string;
  constructor() {
    this.votes=0;
    this.title="Angular";
    this.link="http://baidu.com";
   }

  ngOnInit() {
  }

  voteDown(){
    if(this.votes>0){
      this.votes-=1;
    }
  }
  voteUp(){
    this.votes+=1;
  }

}
