import { OrganizationSource } from '../../organization/model/organization-source.enum';

export class AdminParams {
    username: string;
    organizationId: string;
    organizationSource: OrganizationSource;
    lockup: Boolean; // 锁定状态
    omit: Boolean; // 删除状态
    forbidden: Boolean; // 禁用状态

    constructor() {}

}
