import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { ModalAction } from './modal.action';


@Component({
    template: `
    <div class="modal-header" *ngIf="title">
        <h4 class="modal-title pull-left">{{title}}</h4>
    </div>
    <div class="modal-body text-center">
        <p>{{message}}</p>
        <button type="button" class="btn btn-primary" (click)="close()">确定</button>
    </div>
    `
})
export class AlertModalComponent {

    public title: string;
    public message: string;
    constructor(public bsModalRef: BsModalRef) {

    }

    close(): void {
        this.bsModalRef.hide();
    }
}
