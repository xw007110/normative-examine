// 系统
import {Component, OnInit, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
// service
import {ProfitService} from '../profit/profit.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// model
import {LoadMsg} from '../../../model/load-msg';
import {ReturnCode} from '../../../model/returnCode';
import {Profit} from '../profit/model/profit';


@Component({
  templateUrl: 'gradeProfit.component.html'
})
export class GradeProfitComponent implements OnInit {
  loadMsgGrid = new LoadMsg(false, '正在加载权益信息');
  private selectedProfit: string; // 选中的权益列表
  private gradeId: string; // 等级id
  private profits: Profit[]; // 表格数据
  private myProfits: string; // 表格数据
  constructor(private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private profitService: ProfitService,
              private messageService: MessageModalService) {
  }

  ngOnInit() {
    this.selectedProfit = this.route.snapshot.paramMap.get('selectedProfit');
    this.gradeId = this.selectedProfit.split(',')[0];
    this.myProfits = this.selectedProfit.split(',')[1];
    console.log(this.myProfits);
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

  private querymy(): void {
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
  private sure() {
    const me = this;
    const selectedProfitList = me.el.nativeElement.querySelectorAll('.profitId');
    const profits = []; // 权益id数组

    for (let j = 0; j < selectedProfitList.length; j++) {
      if(selectedProfitList[j].checked){
        profits.push(selectedProfitList[j].value)
      }  
    }
    me.messageService.confirm('', '确认修改', function(dialog){
      me.profitService.updateProfits(me.gradeId, profits)
      .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
         if (returnCode.code === '0000') {
              me.messageService.alert('', returnCode.message);
              me.router.navigate(['/memberbase/grade/list']);
          } else {
              me.messageService.alert('', returnCode.message+'，只能选择锁定的类型');
          }
      })
      .catch( error => {
          me.messageService.alert('', '修改发生异常');
      })
  });
    
  }


}
