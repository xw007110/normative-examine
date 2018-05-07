import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
    // selector: 'modal-content',
    templateUrl: './okModal.component.html'
})
export class OkModalComponent {
    public title: string;
    private component = {
        title: '操作成功！',
        // showCloseButton: true,
        // showOkButton: true,
        ok: function () {
            this.showSuccess();
        }
    };
    constructor(public bsModalRef: BsModalRef) { }
}
