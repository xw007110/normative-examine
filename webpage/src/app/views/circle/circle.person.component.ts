// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {CirclePerson} from './model/circlePerson';
import {CirclePersonParams} from './model/circlePerson.params';
import {Page} from '../base/page/model/page';
import {Result} from '../../model/result';
import {ReturnCode} from '../../model/returnCode';
import {LoadMsg} from '../../model/load-msg';
import {MessageModalService} from '../../components/app-common/app-modal/message.modal.service';
// service
import {CirclePersonService} from './circlePerson.service';
import {StorageService} from '../../providers/storage.service';

@Component({
  templateUrl: 'circle.person.component.html',
  styleUrls: ['../base/org.hidden.css']
})
export class CirclePersonComponent implements OnInit {

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载圈子人员列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedCirclesChange = new EventEmitter<CirclePerson[]>();

  private circlePersons: CirclePerson[]; // 表格数据
  private selectedCirclePerson: CirclePerson; // 选中的圈子人员列表

  private start = 0; // 开始页
  private limit = 10; // 每页条数
  private buttons: string[] = []; // 权限按钮id数组
  private circlePersonParams: CirclePersonParams = new CirclePersonParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private circlePersonService: CirclePersonService,
              private modalService: BsModalService,
              private messageService: MessageModalService,
              private storageService: StorageService) {
    this.buttons = this.storageService.getButtons();
  }

  ngOnInit() {
    this.query();

  }

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.circlePersonParams.circleId = this.route.snapshot.paramMap.get('id');
    this.loadMsgOrgGrid.loaded = false;
    this.circlePersonService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.circlePersonParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.circlePersons = result.data;
          this.pageParams.totalNum = result.total;
          this.pageParams.totalPage = Math.floor((this.pageParams.totalNum - 1) / this.pageParams.pageData) + 1;
          this.loadMsgOrgGrid.loaded = true;
        } else {
          this.loadMsgOrgGrid.loaded = false;
          this.loadMsgOrgGrid.message = returnCode.message;
        }
      })
      .catch(error => {
        this.loadMsgOrgGrid.loaded = false;
        this.loadMsgOrgGrid.message = '圈子人员列表加载失败';
      })
    ;
  }


  delete(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.messageService.confirm('', '确认移除?', function (dialog) {
        me.circlePersonService.delete(me.selectedCirclePerson.id)
          .then(result => {
            dialog.close();
            if (result.returnCode.code === '0000') {
              me.messageService.alert('', '移除成功');
              me.query();
            } else {
              me.messageService.alert('', result.returnCode.message);
            }
          })
          .catch(error => {
            dialog.close();
            me.messageService.alert('', '移除发生异常');
          });
      });
    }
  }

  recordCheck(circlePerson) {
    this.selectedCirclePerson = circlePerson;

  }

  speak(): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.selectedCirclePerson.speak = !me.selectedCirclePerson.speak;
      me.circlePersonService.speak(me.selectedCirclePerson)
        .then(result => {
          if (result.returnCode.code === '0000') {
            me.messageService.alert('', '操作成功');
            me.query();
          } else {
            me.messageService.alert('', result.returnCode.message);
          }
        })
        .catch(error => {
          me.messageService.alert('', '操作发生异常');
        });
    }

  }


  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedCirclePerson) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }

    return true;
  }
}
