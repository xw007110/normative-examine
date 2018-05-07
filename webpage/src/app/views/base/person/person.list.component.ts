// system
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

// service
import { OrganizationService } from '../organization/organization.service';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { StorageService } from '../../../providers/storage.service';

// model
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { Page } from '../page/model/page';
import { Person } from './model/person';
import { PersonType } from './model/person-type.enum';
import { PersonService } from './person.service';
import { PersonParams } from './model/person.params';
import { Organization } from '../organization/model/organization';
import { OrganizationSource } from '../organization/model/organization-source.enum';

@Component({
  selector: 'app-person-page',
  templateUrl: 'person.list.component.html',
  styleUrls: ['../org.hidden.css']
})
export class PersonListComponent implements OnInit {

  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 表格信息 */
  private pageParams: Page = new Page();
  private personParams = new PersonParams(); // 查询条件
  private persons: Person[];  // 人员列表
  private buttons: string[] = []; // 权限按钮id数组
  private personType: PersonType; // 人员类型
  @Input()
  private selectedPerson: Person;  // 表格中选中的记录
  @Output()
  public selectedPersonsChange = new EventEmitter<Person[]>();

  /** 加载信息 */
  private loadMsgPersonGrid = new LoadMsg(false, '正在加载人员列表');
  private orgType: string; // 机构类型

  constructor(private router: Router,
    private personService: PersonService,
    private orgService: OrganizationService,
    private modalService: BsModalService,
    private messageService: MessageModalService,
    private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
    this.orgType = OrganizationSource.Operate; // 运管
  }

  ngOnInit() {
    this.query();

  }

  // 点击机构树查询
  queryOrgList(id) {
    this.personParams.organizationId = id;
    this.query();
  }


  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.loadMsgPersonGrid.loaded = false;
    this.personParams.type = 1; //平台用户
    this.personService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.personParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.persons = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgPersonGrid.loaded = true;
        } else {
          this.loadMsgPersonGrid.loaded = false;
          this.loadMsgPersonGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgPersonGrid.loaded = false;
        this.loadMsgPersonGrid.message = '人员列表加载失败';
      })
      ;

  }

  recordCheck(person) {
    this.selectedPerson = person;

  }

  goUpdate() {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.router.navigate(['/base/person/update', me.selectedPerson.id]);
    }
  }

  delete(person: Person): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      this.messageService.confirm('', '确认删除?', function (dialog) {
        me.personService.delete(me.selectedPerson.id)
          .then(result => {
            dialog.close();
            if (result.returnCode.code === '0000') {
              me.messageService.alert('', '删除成功');
              me.query();
            } else {
              me.messageService.alert('', result.returnCode.message);
            }
          })
          .catch(error => {
            dialog.close();
            me.messageService.alert('', '删除发生异常');
          });
      });
    }
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedPerson) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedPerson.lockup = !me.selectedPerson.lockup;
    me.personService.lockup(me.selectedPerson)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedPerson.lockup = !me.selectedPerson.lockup;

        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedPerson.lockup = !me.selectedPerson.lockup;

      });
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedPerson) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedPerson.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }
}
