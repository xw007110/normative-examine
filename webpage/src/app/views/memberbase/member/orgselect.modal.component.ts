// 系统
import {Component, OnInit, ElementRef} from '@angular/core';
import {TreeModule, TreeNode} from 'primeng/primeng';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {OrganizationSource} from '../../base/organization/model/organization-source.enum';
import {LoadMsg} from '../../../model/load-msg';
import {ModalAction} from '../../../components/app-common/app-modal/modal.action';
import { Organization } from 'app/views/base/organization/model/organization';


@Component({
  template: `
    <div class="modal-header">
    <orgTree [type]="orgType" (queryOrg)="queryOrg($event)"></orgTree>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">关闭</button>
      <button type="button" class="btn btn-default" (click)="action.ok()">确定</button>
    </div>
  `
})
export class OrgSelectModalComponent {
  loadMsgOrgTree = new LoadMsg(false, '正在加载机构信息');
  
  selectedNode: TreeNode;
  message: string;
  action = new ModalAction();
 
  private orgType: string; // 机构类型
  
  constructor(private el: ElementRef,
              public bsModalRef: BsModalRef,
              //private orgService: OrganizationService
            ) {
                this.orgType = OrganizationSource.Member; // 运管
                
  }
  
  queryOrg(event){
    this.selectedNode = event;
  }
  // ngOnInit() {
  //   this.initOrgRoot();
  // }

  // private initOrgRoot(): void {
  //   // 根机构
  //   const rootOrg = new Organization();
  //   rootOrg.id = 'root';
  //   rootOrg.type = OrganizationSource.Operate;
  //   this.orgService.getChildren(rootOrg)
  //     .then(
  //       result => {
  //         const returnCode: ReturnCode = result.returnCode;
  //         if (returnCode.code === '0000') {
  //           const childrenOrgTrees: TreeNode[] = [];
  //           this.orgTree.push({
  //             label: '运管机构',
  //             expandedIcon: 'fa-folder-open',
  //             expanded: true,
  //             collapsedIcon: 'fa-folder',
  //             leaf: false,
  //             data: {'id': '', 'name': '运管机构'},
  //             children: []
  //           });
  //           for (const child of result.data) {
  //             this.orgTree[0].children.push({
  //               label: child.name,
  //               expandedIcon: 'fa-folder-open',
  //               collapsedIcon: 'fa-folder',
  //               leaf: child.leaf,
  //               data: child
  //             });
  //           }
  //         } else {
  //           this.loadMsgOrgTree.message = returnCode.message;
  //         }
  //         this.loadMsgOrgTree.loaded = true; // 机构树加载完成
  //       });
  // }

  // nodeSelect(event): void {
  //   this.message = '';
  // }

  // loadOrgChildren(event): void {
  //   const node = event.node;
  //   if (node) {
  //     if (node.children) {
  //       return;
  //     }
  //     const org: Organization = event.node.data;
  //     this.orgService.getChildren(org)
  //       .then(
  //         result => {
  //           const returnCode: ReturnCode = result.returnCode;
  //           if (returnCode.code === '0000') {
  //             const childrenOrgTrees: TreeNode[] = [];
  //             for (const child of result.data) {
  //               childrenOrgTrees.push({
  //                 label: child.name,
  //                 expandedIcon: 'fa-folder-open',
  //                 collapsedIcon: 'fa-folder',
  //                 leaf: child.leaf,
  //                 data: child
  //               });
  //             }
  //             event.node.children = childrenOrgTrees;
  //           }
  //         }
  //       );
  //   }
  // }

}


