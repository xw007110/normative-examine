import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';



@Component({
    selector: 'modal-content',
    templateUrl: './errorModal.component.html'
  })
  export class ErrorModalComponent {
    public title: string;
    private component = {
        title: '请选择一条记录！',
        // showCloseButton: true,
        // showOkButton: true,
        // ok: function(){
        //     console.log('123');
        // }
    };
    constructor(public bsModalRef: BsModalRef) {}
  }
