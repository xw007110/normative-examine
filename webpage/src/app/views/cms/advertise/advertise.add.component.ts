// 系统
import {Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UEditorComponent} from 'ngx-ueditor';
import {FileUploadModule} from 'primeng/primeng'

// model
import {AdvertiseService} from './advertise.service';
import {ReturnCode} from '../../../model/returnCode';
import {Advertise} from './model/advertise';
import { MessageModalService } from '../../../components/app-common/app-modal/message.modal.service';
import { InterBankConfig } from '../../../providers/interbank-config';
@Component({
  templateUrl: 'advertise.add.component.html'
})
export class AdvertiseAddComponent {
  public form: FormGroup;

  @ViewChild('full') full: UEditorComponent;

  @Input()
  private advertise = new Advertise();

  // private config = {
  //   'imageUrlPrefix': 'http://32.51.152.201:7081/interbank-file-ws/api/resource/upload',
  // };
  // private slideFlag:boolean=false;
  // private jumpFlag:boolean=true;
  private imageUrlPrefix:string;
  constructor(private router: Router,
              private advertiseService: AdvertiseService,
              public fb: FormBuilder,
              private messageService: MessageModalService,  
              private config:InterBankConfig                          
            ) {
    this.imageUrlPrefix = config.API.uploadUrl;
    this.advertise.type = '1';
    //this.createForm();

  }

  // createForm() {
  //   this.form = this.fb.group({
  //     img: ['', Validators.required],
  //     sort: ['', [Validators.required,Validators.pattern('^[0-9]*[1-9][0-9]*$')]],
  //     type: [''],
  //     title: ['', Validators.required],
  //     content: ['']
  //   });
  //   this.form.controls['type'].setValue('1');
  // }

  // public typeChange(){
  //   if(this.form.controls['type'].value=='1'||this.form.controls['type'].value=='3'){
  //     this.slideFlag = false;
  //     this.jumpFlag = false;
  //     console.log(this.form.controls['type'].value);
  //   }else{
  //     this.slideFlag = true;
  //     this.jumpFlag =true;
  //     this.form.removeControl('img');
  //     console.log(this.form.controls['type'].value);
  //   }
    
    
  // }
  public doAdd() {
    if(!this.advertise.img&&this.advertise.type!='2'&&this.advertise.type!='4'&&this.advertise.type!='5'){
      this.messageService.alert('', '图片请选择并上传');   
      return;  
    }
    if(!this.advertise.sort&&this.advertise.type!='2'&&this.advertise.type!='3'&&this.advertise.type!='4'&&this.advertise.type!='5'){
      this.messageService.alert('', '序号不能为空');  
      return;  
    }
    
    if(this.advertise.sort&&this.advertise.type!='2'&&this.advertise.type!='3'&&this.advertise.type!='4'&&this.advertise.type!='5'){
      let myReg=/^[0-9]*[1-9][0-9]*$/;          /**数字 */ 
      let valid = true;
      if(!myReg.test(this.advertise.sort)){
        this.messageService.alert('', '序号请输入正整数');   
        return;
      }
      
    }
    if(!this.advertise.title){
      this.messageService.alert('', '标题不能为空');   
      return;  
    }
    if(!this.advertise.content){
      this.messageService.alert('', '内容不能为空');   
      return;  
    }
    
    this.advertiseService.add(this.advertise)
      .then(result => {
        const returnCode: ReturnCode = result.returnCode;
        if (returnCode.code === '0000') {
          this.router.navigate(['/cms/advertise/list']);
          this.form.controls['img'].setValue('');
        } else {
          this.messageService.alert('', returnCode.message);     
          

        }
      })
      .catch()
    ;

  }

  // 上传图片返回结果赋值给img
  public onBasicUpload(event) {
    this.advertise.img = JSON.parse(event.xhr.response).data;
    this.messageService.alert('', '上传成功');  
  }

  reset(){
    const me = this;
    me.form.reset();
  }
}

