// 系统
import {Component, OnInit, ElementRef, Input, EventEmitter, Output} from '@angular/core';
import {StorageService} from '../../../providers/storage.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
@Component({
  selector: 'productTemplate',
  templateUrl: 'productTemplate.component.html',
  styleUrls: ['./productTemplate.component.scss', '../../base/org.hidden.css']
})

export class ProductTemplateComponent implements OnInit {
  @Input('itemList')
  itemList; // 接受传递的参数
  @Input('productState')
  productState: string; // 产品状态
  @Input('toggleFlag')
  toggleFlag: boolean; // 隐藏标志
  @Input('isLoading')
  isLoading: boolean; // 加载标志
  @Input('buttonPermission')
  buttonPermission: string; // 按钮权限
  @Output()
  returnEvent: EventEmitter<any> = new EventEmitter; // 返回查询参数
  @Output()
  returnUpdateStateEvent: EventEmitter<string> = new EventEmitter; // 返回上下架状态
  @Output()
  returnToggleEvent: EventEmitter<boolean> = new EventEmitter; // 返回展开收起状态
  private buttons: string[] = []; // 权限按钮id数组
  quertParam = {}; // 查询参数

  constructor(private el: ElementRef, private storageService: StorageService,
    private messageService: MessageModalService) {
    this.buttons = this.storageService.getButtons();
  }

  ngOnInit() {

  }

  // 回调上层事件 返回含有输入值的itemlist
  queryByParam() {
    const self = this;
    self.returnEvent.emit(self.quertParam);
  }

  // 上下架 回调上层事件 返回上下架状态
  updateState() {
    const self = this;
    self.returnUpdateStateEvent.emit(self.productState === '2' ? '5' : '2');
    self.queryByParam();
  }

  public itemFunction(item, c): void {
    if (item.multi) {// 多选
      c.selected = !c.selected;
    } else {// 单选
      if (c.clickEvent) { // 点击隐藏的按钮
        item.itemHiddenFlag = c.cId;
      } else {// 点击非隐藏的按钮
        item.itemFlag = c.cId;
      }
    }
    // 赋值
    this.selectFunction(item, c);
  }

  toggleLeft() {
    const self = this;
    self.toggleFlag = !self.toggleFlag;
    self.returnToggleEvent.emit(self.toggleFlag);
    const q = this.el.nativeElement.querySelector('#queryCondition');
    // if (q.style.overflow === 'hidden') {
    //   q.style.overflow = 'visible';
    //   q.style.height = '350px';
    //   this.el.nativeElement.querySelector('.more').innerText = '收起';
    // } else {
    //   q.style.overflow = 'hidden';
    //   q.style.height = '110px';
    //   this.el.nativeElement.querySelector('.more').innerText = '展开';
    // }
    if (self.toggleFlag) {
      q.style.display = 'none';
      self.el.nativeElement.querySelector('.more').innerText = '展开';
    } else {
      q.style.display = 'block';
      self.el.nativeElement.querySelector('.more').innerText = '收起';
    }

  }
  pre = '';
  next = '';
  timeStart:Date;
  timeEnd:Date;
  public selectFunction(item, c): boolean {
    if (item.style === 'special') { // item中需要提交多个code字段
      
      for (let i = 0; i < c.code.split(',').length; i++) {
        //输入框
        if (c.type === 'input') {
          
          //校验
          if (c.val.trim().length > 0) { // 输入框有值 则设置单位
            if(!/^([1-9][0-9]*)+(.[0-9]{1,2})?$/.test(c.val)){
              c.val = c.val.split(',')[i] ='';
              this.messageService.alert('', "非零开头的最多两位小数的数字");
              if(c.code.split(',')[i].endsWith('Start')){
                this.pre = ''; 
               
              }
              if(c.code.split(',')[i].endsWith('End')){
                this.next = '';
                
              }
              return true;
            }
           
            
            if(c.code.split(',')[i].endsWith('Start')){
              this.pre = c.val.split(',')[i]; 
             
            }
            if(c.code.split(',')[i].endsWith('End')){
              this.next = c.val.split(',')[i];
              
            }
            
            if(this.pre&&this.next&&Number.parseFloat(this.next)<Number.parseFloat(this.pre)){
              
              this.messageService.alert('', "开始值应小于结束值");
              c.val = c.val.split(',')[i] ='';
              if(c.code.split(',')[i].endsWith('Start')){
                this.pre = ''; 
               
              }
              if(c.code.split(',')[i].endsWith('End')){
                this.next = '';
                
              }
              return true;
            }
           
            if (c.itemHidden && item.itemHiddenFlag === '') { // 初始input是隐藏的
              item.itemHiddenFlag = item.child[item.child.length - 1].cId;
            } else if (!c.itemHidden && item.itemFlag === '') {
              item.itemFlag = item.child[item.child.length - 1].cId;
            }
            this.quertParam[item.child[item.child.length - 1].code] = item.child[item.child.length - 1].val;
          } else { // 两个输入框都为空 则取消单位
            let inputString = '';
            for (let j = 0; j < item.child.length; j++) {
              if (item.child[j].type === 'input') {
                inputString += item.child[j].val.trim();
              }
            }
            if (inputString === '') {
              if (c.itemHidden) {
                item.itemHiddenFlag = '';
              } else {
                item.itemFlag = '';
              }
              this.quertParam[item.child[item.child.length - 1].code] = '';
            }
          }
        }
        //日期选择
        if(c.type === 'date'){
          if(c.code.split(',')[i]=='paymentTimeStart'){
            this.timeStart = c.val.split(',')[i];
          }
          if(c.code.split(',')[i]=='paymentTimeEnd'){
            this.timeEnd = c.val.split(',')[i];
          } 
          if(this.timeStart&&this.timeEnd&&this.timeEnd<this.timeStart){
            this.pre = '';
            this.next = '';
            this.messageService.alert('', "结束日期不能小于开始日期");
            c.val = c.val.split(',')[i] ='';
            return true;
          }
        }
        this.quertParam[c.code.split(',')[i]] = c.val.split(',')[i];
      }
    } else {
      if (item.multi) { // 多选
        // 对象存在直接拼接
        if (this.quertParam[item.code]) {
          if (c.selected) {// 选中添加
            this.quertParam[item.code] += c.val + ',';
          } else {// 取消移除
            this.quertParam[item.code] = this.quertParam[item.code].replace(c.val + ',', '');
          }
        } else {
          this.quertParam[item.code] = c.val + ',';
        }
      } else {
        this.quertParam[item.code] = c.val;
      }
    }
    // 点击自定义以外的按钮 则清空自定义中输入框的值
    if (item.itemClick && c.type === 'button' && c.cId !== item.itemClick && !c.itemHidden) {
      for (let k = 0; k < item.child.length; k++) {
        if (item.child[k].type === 'input') {
          item.child[k].val = '';
        }
        if (item.child[k].type === 'button' && item.child[k].cId === item.itemHiddenFlag) {
          this.quertParam[item.child[k].code] = '';
          item.itemHiddenFlag = '';
        }
      }
    }
  }


  public reset() {
    this.pre = '';
    this.next = '';
    this.quertParam = {};
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].itemFlag) {
        this.itemList[i].itemFlag = '';
      }
      if (this.itemList[i].itemHiddenFlag) {
        this.itemList[i].itemHiddenFlag = '';
      }

      for (let j = 0; j < this.itemList[i].child.length; j++) {
        if (this.itemList[i].child[j].type === 'input'||this.itemList[i].child[j].type === 'date') {
          this.itemList[i].child[j].val = '';
        }
        if (this.itemList[i].child[j].type === 'button') {
          this.itemList[i].child[j].selected = false;
        }
      }
    }
  }
}
