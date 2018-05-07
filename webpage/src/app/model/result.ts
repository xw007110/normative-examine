
import { ReturnCode } from './returnCode';

export class Result<T> {

    public returnCode: ReturnCode;
    public data: T

    constructor() {}

}
