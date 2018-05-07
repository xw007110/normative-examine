import { OrganizationSource } from './organization-source.enum';

export class OrganizationParams {
    parentId: string;
    name: string;
    type: string;
    lockup: string;
    omit: string;

    constructor() { }
}
