import { Person } from '../../person/model/person';
import { AdminStatus } from './admin-status.enum';


export class Admin {
    id: string;
    password: string;
    username: string;
    person = new Person();
    personId: string;
    updateTime: string;
    createTime: string;
    status: AdminStatus;
    lockup: boolean; // 锁定状态
    omit: boolean; // 删除状态
    forbidden: boolean; // 禁用状态
    systemUser:boolean; //系统用户：true
    constructor() { }

}
