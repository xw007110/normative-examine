import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';



@Component({
    selector: 'modal-content',
    templateUrl: './modal.component.html'
  })
  export class ModalContentComponent {
    public title: string;
    private component = {
        title: 'ctest',
        showCloseButton: true,
        showOkButton: true,
        ok: function(){
            console.log('123');
        }
    };
    constructor(public bsModalRef: BsModalRef) {}
  }