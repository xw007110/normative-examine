import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MessageModalService } from './app-modal/message.modal.service';
import { ConfirmModalComponent } from './app-modal/confirm.modal.component';
import { AlertModalComponent } from './app-modal/alert.modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ConfirmModalComponent,
        AlertModalComponent
    ],
    exports: [
        ConfirmModalComponent,
        AlertModalComponent
    ],
    providers: [
        MessageModalService
    ],
    entryComponents: [
        ConfirmModalComponent,
        AlertModalComponent
    ]
})
export class AppCommonModule {

}
