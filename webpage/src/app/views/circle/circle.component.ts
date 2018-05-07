// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {Circle} from './model/circle';
import {CircleParams} from './model/circle.params';
import {Page} from '../base/page/model/page';
import {Result} from '../../model/result';
import {ReturnCode} from '../../model/returnCode';
import {LoadMsg} from '../../model/load-msg';
import {MessageModalService} from '../../components/app-common/app-modal/message.modal.service';
// service
import {CircleService} from './circle.service';
import {StorageService} from '../../providers/storage.service';

@Component({
  templateUrl: 'circle.component.html',
  styleUrls: ['../base/org.hidden.css']
})
export class CircleComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载圈子列表');

  @Output()
  public selectedCirclesChange = new EventEmitter<Circle[]>();

  private circles: Circle[]; // 表格数据
  private selectedCircle: Circle; // 选中的圈子列表
  private buttons: string[] = []; // 权限按钮id数组
  
  private circleParams: CircleParams = new CircleParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private circleService: CircleService,
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
    this.loadMsgOrgGrid.loaded = false;
    this.circleService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.circleParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.circles = result.data;
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
        this.loadMsgOrgGrid.message = '圈子列表加载失败';
      })
    ;
  }

  goUpdate() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/circle/update', me.selectedCircle.id]);
    }
  }

  goCirclePerson() {
    const me = this;
    if (me.judge()) {
      me.router.navigate(['/circle/circlePerson', me.selectedCircle.id]);
    }
  }

  delete(circle: Circle): void {
    const me = this;
    // 操作判断
    if (me.judge()) {
      me.messageService.confirm('', '确认删除?', function (dialog) {
        me.circleService.delete(me.selectedCircle.id)
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

  recordCheck(circle) {
    this.selectedCircle = circle;

  }


  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedCircle) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedCircle.omit) {
      me.messageService.alert('', '当前记录已删除，不能进行操作！');
      return false;
    }
    return true;
  }
}
