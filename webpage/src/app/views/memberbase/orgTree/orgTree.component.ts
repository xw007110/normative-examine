import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ReturnCode} from '../../../model/returnCode';
import {OrganizationSource} from '../../base/organization/model/organization-source.enum';
import {Organization} from '../../base/organization/model/organization';
import {TreeNode} from 'primeng/primeng';
import {OrganizationService} from '../../base/organization/organization.service';
import {LoadMsg} from '../../../model/load-msg';

@Component({
  selector: 'orgTree',
  templateUrl: './orgTree.component.html',
  styleUrls: ['../org.hidden.css']
})
export class OrgTreeComponent implements OnInit {
  // 机构类型
  @Input('type')
  type;
  @Output()
  queryOrgList: EventEmitter<String> = new EventEmitter;
  @Output()
  queryOrg: EventEmitter<Organization> = new EventEmitter;

  private orgTree: TreeNode[] = [];
  private selectedNode: TreeNode; // 选中的节点
  /** 加载信息 */
  private loadMsgOrgTree = new LoadMsg(false, '正在加载机构信息');

  constructor(private orgService: OrganizationService) {

  }

  ngOnInit(): void {
    this.initOrgRoot();
  }

  private initOrgRoot(): void {
    // 根机构
    const rootOrg = new Organization();
    rootOrg.id = 'root';
    rootOrg.type = this.type;
    const rootName = this.type === '1' ? '运管机构' : '会员机构';
    this.orgService.getChildren(rootOrg)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            const childrenOrgTrees: TreeNode[] = [];
            this.orgTree.push({
              label: rootName,
              expandedIcon: 'fa-folder-open',
              expanded: true,
              collapsedIcon: 'fa-folder',
              leaf: false,
              data: {'id': 'root', 'name': rootName},
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
            this.loadMsgOrgTree.loaded = true; // 机构树加载完成
          } else {
            this.loadMsgOrgTree.loaded = false;
            this.loadMsgOrgTree.message = returnCode.message;
          }
        })
      .catch(error => {
        this.loadMsgOrgTree.loaded = false;
        this.loadMsgOrgTree.message = '机构信息加载失败';
      })
    ;
  }

  private loadOrgChildren(event): void {
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
          });
    }
  }

  private queryOrgData(pageNo) {
    const self = this;
    self.queryOrgList.emit(self.selectedNode.data.id);
    self.queryOrg.emit(self.selectedNode.data);

  }
}
