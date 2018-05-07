// system
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Admin } from '../base/admin/model/admin';

// service
import { StorageService } from '../../providers/storage.service';
import { AdminService } from '../base/admin/admin.service';
import { MessageModalService } from '../../components/app-common/app-modal/message.modal.service';

import { ReturnCode } from '../../model/returnCode';
import { ResetPwdAdmin } from '../base/admin/model/resetPwdAdmin';

@Component({
    templateUrl: 'resetPwd.component.html'
})
export class ResetPwdComponent {

    private reAdmin: ResetPwdAdmin = new ResetPwdAdmin();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminService,
        private storageService: StorageService,
        private messageService: MessageModalService

    ) {

    }


    doResetPwd() {
        const me = this;
        if (me.reAdmin.password === me.reAdmin.rePassword) {
            me.messageService.confirm('', '确认重置', function (dialog) {
                me.adminService.updatePassword(me.reAdmin)
                    .then(result => {
                        const returnCode: ReturnCode = result.returnCode;
                        dialog.close();
                        if (returnCode.code === '0000') {
                            me.messageService.alert('', '重置成功');
                            me.router.navigate(['/login']);
                        } else {
                            me.messageService.alert('', '重置失败');
                        }

                    })
                    .catch( error => {
                        me.messageService.alert('', '重置密码发生异常');
                    })
            });
        } else {
            me.messageService.alert('', '两次新密码输入不一致');
        }
    }
}
