import { Permission } from '../../permission/model/permission';
export class Menu {
    label: string;
    expandedIcon = 'fa-folder-open';
    collapsedIcon = 'fa-folder';
    leaf: boolean;
    expanded = true;
    children: Menu[] = [];
    data: Permission;
    constructor() {}
}
