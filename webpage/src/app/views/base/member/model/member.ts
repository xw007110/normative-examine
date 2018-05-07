import { Person } from '../../person/model/person';


export class Member {
    id: string;
    password: string;
    username: string;
    mobile: string;
    person= new Person();
    status: string;
    updateTime: string;
    createTime: string;
    lockup: Boolean; // 锁定状态
    omit: Boolean; // 删除状态
    forbidden: Boolean; // 禁用状态
    authentication: string; // 认证状态 (1:未认证;2:审核已通过;3:审核拒绝;4:认证中)
    orgTempName: string;
    orgId: string;

    constructor() {}

}
