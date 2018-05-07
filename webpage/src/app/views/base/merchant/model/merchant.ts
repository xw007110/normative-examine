export class Merchant {
   id: string;
   code: string;
   name: string;
   source: string;
   type: string;
   createTime: string;
   updateTime: string;
   leaf: boolean;
   parentId: string;
   parentName: string;
   remark: string;
   lockup: string;
   omit: string;

    constructor() {

    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getLeaf(): boolean {
        return this.leaf;
    }

}
