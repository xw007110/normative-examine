
export class Permission {

id: string;
code: string;
name: string;
action: string;
remark: string;
isbutton: boolean;
status: string;
children: Array<Permission>;

constructor() {}

getId(): string {
    return this.id;
}

getName(): string {
    return this.name;
}

getCode(): string {
    return this.code;
}

getAction(): string {
    return this.action;
}
getRemark(): string {
    return this.remark;
}

getIsbutton(): boolean {
    return this.isbutton;
}

getStatus(): string {
    return this.status;
}

getChildren(): Array<Permission> {
    return this.children;
}

}
