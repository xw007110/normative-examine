import {Menu} from '../../permission/model/menu';
import {Permission} from '../../permission/model/permission';

export class Role {
  id: string;
  code: string;
  name: string;
  type: string;
  typeDesc: string;
  createTime: string;
  updateTime: string;
  permissions: Permission[] = [];
  remark: string;
  checked: boolean;
  lockup: boolean; // 锁定状态
  omit: boolean; // 删除状态
  constructor() {
  }

}
