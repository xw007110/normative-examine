// 系统
import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

// service
import { GradeService } from './grade.service';
import {ProfitService} from '../profit/profit.service';

// model
import { LoadMsg } from '../../../model/load-msg';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';
import { Grade } from './model/grade';
import { Profit } from '../profit/model/profit';
import { ModalAction } from '../../../components/app-common/app-modal/modal.action';

@Component({
    template: `
    <div class="modal-header">
    <h4 class="modal-title pull-left">权益列表</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
    <div *ngIf="!loadMsgGrid.loaded">
    {{loadMsgGrid.message}}
  </div>
  <table class="table table-bordered table-sm">
    <thead>
      <tr>
        <th></th>
        <th>类型</th>
        <th>权益值</th>
        <th>状态</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody *ngIf="loadMsgGrid.loaded">
      <tr *ngFor="let profit of profits">
        <td>
          <input id="checkbox{{profit.id}}" name="radio" type="radio" />
        </td>
        <td>{{profit.typeDesc}}</td>
        <td>{{profit.parameter}}</td>
        <td>{{profit.lockup==true?'锁定':'解锁'}}</td>
        <td>{{profit.remark}}</td>
      </tr>

    </tbody>
  </table>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">关闭</button>
    <button type="button" class="btn btn-default" (click)="action.ok()">确定</button>
</div>
    `
})
export class ProfitSelectModalComponent implements OnInit {
    loadMsgGrid = new LoadMsg(false, '正在加载权益信息');
    message: string;
    action = new ModalAction();
    private profits:Profit[]; // 表格数据
    selectedProfit:Profit; // 选中的记录
    

    constructor(
        private el: ElementRef,
        public bsModalRef: BsModalRef,
        private gradeService: GradeService,
        private profitService:ProfitService,) {
    }

    ngOnInit() {
        this.query();
    }

    private query(): void {
        this.loadMsgGrid.loaded = false;
        this.profitService.list()
          .then(result => {
            const returnCode: ReturnCode = result.returnCode;
            if (returnCode.code === '0000') {
              this.profits = result.data;
              this.loadMsgGrid.loaded = true;
            } else {
              this.loadMsgGrid.loaded = false;
              this.loadMsgGrid.message = returnCode.message;
            }
          })
          .catch(error => {
            this.loadMsgGrid.loaded = false;
            this.loadMsgGrid.message = '权益列表加载失败';
          })
        ;
    }

}


