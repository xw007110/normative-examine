import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { ModalAction } from './modal.action';


@Component({
    template: `
    <div class="modal-body text-center">
        <p>{{message}}</p>
        <button type="button" class="btn btn-default" (click)="confirm()">确认</button>
        <button type="button" class="btn btn-primary" (click)="close()">返回</button>
    </div>
    `
})
export class ConfirmModalComponent {
    title: string;
    message: string;
    action = new ModalAction();
    constructor(public bsModalRef: BsModalRef) {

    }

    confirm(): void {
        this.action.ok(this);
    }

    close(): void {
        this.bsModalRef.hide();
    }
}
