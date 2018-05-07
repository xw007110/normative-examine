import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterBankConfig} from '../../../providers/interbank-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UEditorModule} from 'ngx-ueditor';
import {FileUploadModule} from 'primeng/primeng';

import {AdvertiseComponent} from './advertise.component';
import {AdvertiseService} from './advertise.service'
import {PageModule} from '../../base/page/page.module';
import {AdvertiseRoutingModule} from './advertise-routing.module';
import {AdvertiseDetailComponent} from './advertiseDetail.component';
import {AdvertiseAddComponent} from './advertise.add.component';
import {AdvertiseUpdateComponent} from './advertise.update.component';

// Loading Buttons
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  imports: [
    AdvertiseRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    PageModule,
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/ueditor/',
      // 默认全局配置项
      options: {
        //serverUrl: 'http://32.51.154.105:7081/interbank-file-ws/api/resource/upload',
        serverUrl: 'http://218.2.101.90:7081/interbank-file-ws/api/resource/upload',
        // serverUrl: '/assets/ueditor/net/config.json',
        //imageUrl: 'http://32.51.154.105:7081/interbank-file-ws/api/resource/upload',
        imageUrl: 'http://218.2.101.90:7081/interbank-file-ws/api/resource/upload',
        imageActionName: 'uplaodimage',
        imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
        //imageUrlPrefix: 'http://32.51.154.105:7081/interbank-file-ws/api/resource/upload',
        imageUrlPrefix: 'http://218.2.101.90:7081/interbank-file-ws/api/resource/upload',
        themePath: 'assets/ueditor/themes/',
        // toolbars: [['FullScreen', 'simpleupload', 'Source', 'Undo', 'Redo', 'Bold', 'test']],
        lang: 'zh-cn'
      },
    }),
    LaddaModule
  ],
  declarations: [
    AdvertiseComponent,
    AdvertiseDetailComponent,
    AdvertiseAddComponent,
    AdvertiseUpdateComponent
  ],
  providers: [
    AdvertiseService,
    InterBankConfig
  ]
})
export class AdvertiseModule {


}
