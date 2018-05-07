import { Organization } from '../../organization/model/organization';
import { PersonType } from './person-type.enum';

export class Person {
    id: string;
    email: string;
    mobile: string;
    name: string;
    username:string;
    organizationId: string;
    organizationName: string;
    remark: string;
    sex: string;
    birthday: string;
    tel: string;
    type: string;
    job: string;
    departmentName: string;
    address: string;
    createTime: string;
    updateTime: string;
    lockup: Boolean; // 锁定状态
    omit: Boolean; // 删除状态

    constructor() {
    }

}
