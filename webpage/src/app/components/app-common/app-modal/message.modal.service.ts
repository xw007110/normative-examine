import { Injectable } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from './confirm.modal.component';
import { AlertModalComponent } from './alert.modal.component';
import { ModalAction } from './modal.action';

@Injectable()
export class MessageModalService {

    private bsModalRef: BsModalRef;

    private action: ModalAction;

    constructor(
        private modalService: BsModalService
    ) {}

    public confirm(title: string, message: string, fun: any ): ConfirmModalComponent {
        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {class: 'modal-sm'});
        const confirm: ConfirmModalComponent = this.bsModalRef.content;
        confirm.title = title;
        confirm.message = message;
        confirm.action.ok = fun;
        return confirm;
    }

    public alert(title: string, message: string): AlertModalComponent {
        this.bsModalRef = this.modalService.show(AlertModalComponent, {class: 'modal-sm'});
        const alert: AlertModalComponent = this.bsModalRef.content;
        alert.title = title;
        alert.message = message;
        return alert;
    }

    /** 还有问题 */
    public showComponet(componet: any): any {
        this.bsModalRef = this.modalService.show(componet, {class: 'modal-lg'})
        return this.bsModalRef.content;
    }
}
