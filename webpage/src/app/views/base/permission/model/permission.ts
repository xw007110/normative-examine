export class Permission {
    id: string;
    code: string;
    name: string;
    action: string;
    button: boolean;
    remark: string;
    status: string;
    statusDesc: string;
    createTime: string;
    updateTime: string;
    children: Permission[];
}
