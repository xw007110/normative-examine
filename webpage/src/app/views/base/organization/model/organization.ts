import { OrganizationSource } from './organization-source.enum';

export class Organization {
   public id: string;
    code: string;
    name: string;
    source: OrganizationSource;
    type: string;
    createTime: string;
    updateTime: string;
    leaf: boolean;
    parentId: string;
    parentName: string;
    remark: string;
    lockup: boolean;
    omit: string;

    constructor() { }
}
