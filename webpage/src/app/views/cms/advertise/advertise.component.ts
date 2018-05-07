// 系统
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
// model
import {Advertise} from './model/advertise';
import {AdvertiseParams} from './model/advertise.params';
import {Page} from '../../base/page/model/page';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';
// service
import {AdvertiseService} from './advertise.service';
import {StorageService} from '../../../providers/storage.service';

@Component({
  templateUrl: 'advertise.component.html',
  styleUrls: ['../../base/org.hidden.css']
})
export class AdvertiseComponent implements OnInit {
  @Input('isLoading')
  isLoading: boolean; // 加载标志

  /** 加载信息 */
  private loadMsgOrgGrid = new LoadMsg(false, '正在加载广告列表');

  @Input()
  private disabledButtons = ''; // query,add,delete,update
  @Output()
  public selectedAdvertisesChange = new EventEmitter<Advertise[]>();

  private advertises: Advertise[]; // 表格数据
  private selectedAdvertise: Advertise;

  private start = 0; // 开始页
  private limit = 10; // 每页条数
  private buttons: string[] = []; // 权限按钮id数组
  private advertiseParams: AdvertiseParams = new AdvertiseParams(); // 过滤参数
  private pageParams: Page = new Page();

  constructor(private router: Router,
              private advertiseService: AdvertiseService,
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
    this.selectedAdvertise = null; // 将选中的对象清空
    this.loadMsgOrgGrid.loaded = false;
    this.advertiseService.page(this.pageParams.curPage - 1, this.pageParams.pageData, this.advertiseParams)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.advertises = result.data;
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
        this.loadMsgOrgGrid.message = '广告列表加载失败';
      })
    ;
  }

  goUpdate() {
    const me = this;
    if (me.judge()) {
      this.router.navigate(['/cms/advertise/update', me.selectedAdvertise.id]);
    }
  }

  delete(advertise: Advertise): void {
    const me = this;
    if (me.judge()) {
      this.messageService.confirm('', '确认删除？', function (dialog) {
        me.advertiseService.delete(me.selectedAdvertise.id)
          .then(result => {
            dialog.close();
            if (result.returnCode.code === '0000') {
              me.messageService.alert('', '删除成功');
              me.query();
            } else {
              me.messageService.alert('删除失败', result.returnCode.message);
            }
          })
          .catch(error => {
            me.messageService.alert('删除失败', '删除发生异常');
          })
        ;
      });
    }
  }


  recordCheck(advertise) {
    this.selectedAdvertise = advertise;
  }

  lockup(): void {
    const me = this;
    // 操作判断
    if (!me.selectedAdvertise) {
      this.messageService.alert('', '请选择一条记录');
      return;
    }
    me.selectedAdvertise.lockup = !me.selectedAdvertise.lockup;
    me.advertiseService.lockup(me.selectedAdvertise)
      .then(result => {
        if (result.returnCode.code === '0000') {
          me.messageService.alert('', '操作成功');
          //me.query();
        } else {
          me.messageService.alert('', result.returnCode.message);
          me.selectedAdvertise.lockup = !me.selectedAdvertise.lockup;
        }
      })
      .catch(error => {
        me.messageService.alert('', '操作发生异常');
        me.selectedAdvertise.lockup = !me.selectedAdvertise.lockup;
      });
  }

  // 操作判断
  judge() {
    const me = this;
    if (!me.selectedAdvertise) {
      me.messageService.alert('', '请选择一条记录');
      return false;
    }
    if (me.selectedAdvertise.lockup) {
      me.messageService.alert('', '当前记录锁定，不能进行操作！');
      return false;
    }
    return true;
  }

}
