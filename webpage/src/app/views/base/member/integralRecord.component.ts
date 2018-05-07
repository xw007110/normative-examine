// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Member} from './model/member';
import {MemberService} from './member.service';
import {ReturnCode} from '../../../model/returnCode';
import {Page} from '../page/model/page';

@Component({
  templateUrl: 'integralRecord.component.html',
  styleUrls: ['../org.hidden.css']
})
export class IntegralRecordComponent implements OnInit {

  private pageParams: Page = new Page(); // 分页信息

  private member = new Member();
  private members: Member[]; // 表格数据

  constructor(private route: ActivatedRoute,
              private memberService: MemberService,) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.memberService.integralRecordPage(this.pageParams.curPage - 1, this.pageParams.pageData, id)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            this.members = result.data;
          } else {
            console.log(returnCode.message);
          }
        }
      )


  }
}
