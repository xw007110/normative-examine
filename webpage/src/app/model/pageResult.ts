
import { ReturnCode } from './returnCode';

export class PageResult<T> {

    public returnCode: ReturnCode;
    public total: number;
    public data: T;

    constructor() {}

}
