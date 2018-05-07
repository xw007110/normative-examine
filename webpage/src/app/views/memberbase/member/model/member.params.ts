export class MemberParams {
    id: string;
    username: string; // 登录名
    name: string; // 用户姓名
    mobile: string;//手机号
    organizationId: string;
    lockup: Boolean; // 锁定状态
    omit: Boolean; // 删除状态
    forbidden: Boolean; // 禁用状态
    authentication: Boolean; // 认证状态

    constructor() {}

}
