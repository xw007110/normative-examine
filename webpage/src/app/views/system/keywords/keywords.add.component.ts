// 系统
import { Component, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';


// model
import { KeywordsService } from './keywords.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

import { ReturnCode } from '../../../model/returnCode';
import { Keywords } from './model/keywords';

@Component({
  templateUrl: 'keywords.add.component.html'
})
export class KeywordsAddComponent {
  
  @Input()
  private keywords = new Keywords();

  constructor(private router: Router,
     private keywordsService: KeywordsService,
     private messageService: MessageModalService,
     
    ) {
      
  }

  public doAdd() {
    const param ={
      "keyword": this.keywords.keyword
    }
    if(!this.keywords.keyword){
      this.messageService.alert('', '关键字不可为空');
    }else{
      this.keywordsService.add(param)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/sys/keyword/list']);
        } else {
          this.messageService.alert('', returnCode.message);
          

        }
      }).catch(error => {
        this.messageService.alert('新增失败', '新增发生异常');
      });
    }
    

  }

  reset(){
    const me = this;
    me.keywords.keyword = '';
  }

}

