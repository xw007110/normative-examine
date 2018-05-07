// system
import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {TreeModule, TreeNode} from 'primeng/primeng';
// service
import {OrganizationService} from '../organization/organization.service';

// model
import {ReturnCode} from '../../../model/returnCode';
import {LoadMsg} from '../../../model/load-msg';
import {Page} from '../page/model/page';
import {Person} from './model/person';
import {PersonType} from './model/person-type.enum';
import {PersonService} from './person.service';
import {PersonParams} from './model/person.params';
import {Organization} from '../organization/model/organization';
import {OrganizationSource} from '../organization/model/organization-source.enum';

@Component({
  selector: 'app-person-all',
  templateUrl: 'person.all.component.html',
  styleUrls: ['../org.hidden.css']
})
export class PersonAllComponent implements OnInit {

  private pageParams: Page = new Page();
  private personParams = new PersonParams(); // 查询条件
  
  private persons: Person[];  // 人员列表

  @Input()
  private selectedPersons: Person[];  // 表格中选中的记录
  @Output()
  public selectedPersonsChange = new EventEmitter<Person[]>();

  /** 机构树 */
  private orgTree: TreeNode[] = [];  // 机构树
  private selectedNode: TreeNode; // 机构树选中的节点

  /** 加载信息 */
  private loadMsgOrgTree = new LoadMsg(false, '正在加载机构信息');
  private loadMsgPersonGrid = new LoadMsg(false, '正在加载人员列表');


  constructor(private router: Router,
              private personService: PersonService,
              private orgService: OrganizationService) {

  }

  ngOnInit() {

    this.initOrgRoot();
    this.query();
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
            for (const child of result.data) {
              this.orgTree.push({
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

  // 分页查询
  getPageData(pageNo) {
    this.query();
  }

  query() {
    this.loadMsgPersonGrid.loaded = false;
    if (this.selectedNode) {
      // 如果选择的机构树的节点存在
      const org: Organization = this.selectedNode.data;
      this.personParams.organizationId = org.id;
      this.personParams.type = PersonType.Platform; //只查运管用户
    }
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
    this.selectedPersons = [];
    this.selectedPersons.push(person);
    this.selectedPersonsChange.emit(this.selectedPersons);
  }

}
