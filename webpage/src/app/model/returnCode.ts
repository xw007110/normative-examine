export class ReturnCode {

     code: string;
     message: string;

     get success(): boolean {
         console.log('code');
         console.log(this.code);
        if ('0000' === this.code) {
            return true;
        } else {
            return false;
        }
     }

     constructor() {}
}
