export class Authentication {
    id: string;
    authentication: string; // 认证状态 (1:未审核;2:审核已通过;3:审核未通过)
    orgTempName: string;
    orgId: string;
    personTel: string;
    personDepartment: string;
    personJob: string;

    constructor() {}

}