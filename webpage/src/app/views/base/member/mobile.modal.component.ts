// service
import {Component, ElementRef, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

// model
import {ModalAction} from '../../../components/app-common/app-modal/modal.action';

@Component({
  template: `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title pull-left">请选择角色</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12 col-md-12">

            </div>
          </div>
          <div class="alert alert-danger" role="alert" *ngIf="message">{{message}}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary btn-sm" (click)="action.ok()">确定</button>
          <button type="button" class="btn btn-outline-primary btn-sm" (click)="bsModalRef.hide()">关闭</button>
        </div>
      </div>
    </div>
  `
})
export class MobileModalComponent {

  public message: string;

  public action = new ModalAction();

  constructor(public bsModalRef: BsModalRef) {
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
