// 系统
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

// model
import { Grade } from './model/grade';
import { Page } from '../../base/page/model/page';
import { Result } from '../../../model/result';
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';


// service
import { GradeService } from './grade.service';
import { ProfitSelectModalComponent } from './profit.select.modal.component';
import { StorageService } from '../../../providers/storage.service';

@Component({
  templateUrl: 'grade.component.html',
  styleUrls: ['../org.hidden.css']
})
export class GradeComponent implements OnInit {
  public form: FormGroup;


  /** 加载信息 */
  private loadMsgGrid = new LoadMsg(false, '正在加载等级列表');

  @Output()
  public selectedCirclesChange = new EventEmitter<Grade[]>();

  private grades: Grade[]; // 表格数据
  private selectedGrade: Grade; // 选中的记录
  private buttons: string[] = []; // 权限按钮id数组

  constructor(private router: Router,
    private gradeService: GradeService,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
  }

  ngOnInit() {
    this.query();

  }


  query() {
    this.loadMsgGrid.loaded = false;
    this.gradeService.list()
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.grades = result.data;
          this.loadMsgGrid.loaded = true;
        } else {
          this.loadMsgGrid.loaded = false;
          this.loadMsgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgGrid.loaded = false;
        this.loadMsgGrid.message = '等级列表加载失败';
      })
      ;
  }

  goUpdate() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/memberbase/grade/update', me.selectedGrade.id]);
    }
  }

  goProfit() {
    const me = this;
    
    if (me.judge()) {
      let profitIds = '';
      for(let i=0;i<me.grades.length;i++){
        if(me.grades[i].id == me.selectedGrade.id){
  
          for(let j=0;j<me.grades[i].profits.length;j++){
            profitIds+= me.grades[i].profits[j].id+'|';
          }
        }
      }
      me.router.navigate(['/memberbase/grade/profit', me.selectedGrade.id+','+profitIds]);
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedGrade) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedGrade.lockup = !me.selectedGrade.lockup;
    me.gradeService.lockup(me.selectedGrade)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedGrade.lockup = !me.selectedGrade.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedGrade.lockup = !me.selectedGrade.lockup;

      });
  }


  recordCheck(grade) {
    this.selectedGrade = grade;
  }


  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedGrade) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedGrade.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }


}
