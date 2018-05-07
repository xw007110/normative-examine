// 系统
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Advertise} from './model/advertise';
import { AdvertiseService } from './advertise.service';
import { ReturnCode } from '../../../model/returnCode';

@Component({
    templateUrl: 'advertiseDetail.component.html'
  })
  export class AdvertiseDetailComponent implements OnInit {

    private advertise = new Advertise();


    constructor(
        private route: ActivatedRoute,
        private advertiseService: AdvertiseService,

    ) {}

      ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')
        this.advertise.id = id;
        this.advertiseService.get(id)
        .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.advertise = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
        )


      }
  }
