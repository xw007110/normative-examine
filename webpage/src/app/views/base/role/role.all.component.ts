import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange, OnChanges} from '@angular/core';
// model
import { ReturnCode } from '../../../model/returnCode';
import { LoadMsg } from '../../../model/load-msg';
import { Role } from './model/role';
import { RoleParams } from './model/role.params';
import { RoleService } from './role.service';

@Component({
    selector: 'app-role-all',
    templateUrl: './role.all.component.html'
})
export class RoleAllComponent implements OnInit {

    roleParams = new  RoleParams();

    @Input()
    allRoles: Role[] = [];  // 角色列表

    @Input()
    selectedRoles: Role[] = []; // 选择的角色
    @Output()
    private selectedRolesChange = new EventEmitter<Role[]>();

    constructor(
        private roleService: RoleService
    ) {}

    ngOnInit(): void {
    }

    recordCheck(role) {
        let has = false;
        for (let index = 0; index < this.selectedRoles.length; index++) {
            const selectId = this.selectedRoles[index].id;
            if (selectId === role.id) {
                has = true;
                this.selectedRoles.splice(index, 1);
                break;
            } else {
                has = false;
            }
        }

        if (!has) {
            this.selectedRoles.push(role);
        }
        this.selectedRolesChange.emit(this.selectedRoles);
    }
}
