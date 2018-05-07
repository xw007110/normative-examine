import { Organization } from '../../organization/model/organization';
import { PersonType } from './person-type.enum';

export class PersonParams {

    name: string;
    organizationId: string;
    type: PersonType;
    lockup: Boolean; // 锁定状态
    omit: Boolean; // 删除状态

    constructor() {}

}
