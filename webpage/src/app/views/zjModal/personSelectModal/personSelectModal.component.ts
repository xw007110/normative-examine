// 系统
import {Component, ElementRef, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {ModalAction} from '../../../components/app-common/app-modal/modal.action';
import {Person} from '../../base/person/model/person';

@Component({
  template: `
    <div class="modal-dialog modal-lg" style="margin: 0px;">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title pull-left">请选择人员</h6>
          <h6 class="modal-title pull-right">
            <button type="button" class="btn btn-sm" (click)="action.ok()">确定</button>
            <button type="button" class="btn btn-sm" (click)="bsModalRef.hide()">关闭</button>
          </h6>

        </div>

        <div class="modal-body">
          <app-person-all
            [(selectedPersons)]="selectedPersons">
          </app-person-all>
          <div class="alert alert-danger" role="alert" *ngIf="message">{{message}}</div>
        </div>

      </div>
    </div>
  `,
  styleUrls: ['../../base/org.hidden.css']
})

export class PersonSelectModalComponent {

  public message: string;
  public selectedPersons: Person[] = [];
  public action = new ModalAction();

  constructor(public bsModalRef: BsModalRef) {
  }
}
