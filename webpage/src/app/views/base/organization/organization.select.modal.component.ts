// 系统
import {Component, OnInit, ElementRef} from '@angular/core';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

// service
import {OrganizationService} from './organization.service';

// model
import {LoadMsg} from '../../../model/load-msg';
import {Result} from '../../../model/result';
import {ReturnCode} from '../../../model/returnCode';
import {Organization} from './model/organization';
import {OrganizationSource} from './model/organization-source.enum';
import {ModalAction} from '../../../components/app-common/app-modal/modal.action';

@Component({
  template: `
    <div class="modal-header">
      <h6 class="modal-title pull-left">机构列表</h6>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div *ngIf="!loadMsgOrgTree.loaded">
        {{loadMsgOrgTree.message}}
      </div>
      <div class="alert alert-danger" role="alert" *ngIf="message">{{message}}</div>
      <p-tree
        *ngIf="loadMsgOrgTree.loaded"
        [value]="orgTree"
        selectionMode="single"
        [(selection)]="selectedNode"
        (onNodeExpand)="loadOrgChildren($event)"
        (onNodeSelect)="nodeSelect($event)"
        [style]="{'width':'100%','border':'none'}">
        >
      </p-tree>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">关闭</button>
      <button type="button" class="btn btn-default" (click)="action.ok()">确定</button>
    </div>
  `
})
export class OrganizationSelectModalComponent implements OnInit {
  loadMsgOrgTree = new LoadMsg(false, '正在加载机构信息');
  orgTree: TreeNode[] = [];
  selectedNode: TreeNode;
  message: string;
  action = new ModalAction();

  constructor(private el: ElementRef,
              public bsModalRef: BsModalRef,
              private orgService: OrganizationService) {
  }

  ngOnInit() {
    this.initOrgRoot();
  }

  private initOrgRoot(): void {
    // 根机构
    const rootOrg = new Organization();
    rootOrg.id = 'root';
    rootOrg.type = OrganizationSource.Operate;
    this.orgService.getChildren(rootOrg)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            const childrenOrgTrees: TreeNode[] = [];
            this.orgTree.push({
              label: '运管机构',
              expandedIcon: 'fa-folder-open',
              expanded: true,
              collapsedIcon: 'fa-folder',
              leaf: false,
              data: {'id': '', 'name': '运管机构'},
              children: []
            });
            for (const child of result.data) {
              this.orgTree[0].children.push({
                label: child.name,
                expandedIcon: 'fa-folder-open',
                collapsedIcon: 'fa-folder',
                leaf: child.leaf,
                data: child
              });
            }
          } else {
            this.loadMsgOrgTree.message = returnCode.message;
          }
          this.loadMsgOrgTree.loaded = true; // 机构树加载完成
        });
  }

  nodeSelect(event): void {
    this.message = '';
  }

  loadOrgChildren(event): void {
    const node = event.node;
    if (node) {
      if (node.children) {
        return;
      }
      const org: Organization = event.node.data;
      this.orgService.getChildren(org)
        .then(
          result => {
            const returnCode: ReturnCode = result.returnCode;
            if (returnCode.code === '0000') {
              const childrenOrgTrees: TreeNode[] = [];
              for (const child of result.data) {
                childrenOrgTrees.push({
                  label: child.name,
                  expandedIcon: 'fa-folder-open',
                  collapsedIcon: 'fa-folder',
                  leaf: child.leaf,
                  data: child
                });
              }
              event.node.children = childrenOrgTrees;
            }
          }
        );
    }
  }

}


