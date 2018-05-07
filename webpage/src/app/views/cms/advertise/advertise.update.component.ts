// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// service
import {AdvertiseService} from './advertise.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {ReturnCode} from '../../../model/returnCode';
import {Advertise} from './model/advertise';

@Component({
  templateUrl: 'advertise.update.component.html'
})
export class AdvertiseUpdateComponent implements OnInit {
  public form: FormGroup;

  bsModalRef: BsModalRef;


  @Input()
  private advertise = new Advertise();

  constructor(private router: Router,
              private advertiseService: AdvertiseService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private messageService: MessageModalService,
              public fb: FormBuilder) {

    
  }

  // createForm() {
  //   this.form = this.fb.group({
  //     id: [''],
  //     img: [''],
  //     sort: ['', [Validators.required,Validators.pattern('^[0-9]*[1-9][0-9]*$')] ],
  //     type: ['', Validators.required],
  //     title: ['', Validators.required],
  //     content: ['', Validators.required]
  //   });
  // }


  ngOnInit() {
    const me = this;
    const id = me.route.snapshot.paramMap.get('id')
    me.advertiseService.get(id)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            me.advertise = result.data;
           
          } else {
            me.messageService.alert('', returnCode.message);
          }
        }
      )

  }

  public doUpdate() {
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
    const me = this;
    me.messageService.confirm('', '确认修改', function (dialog) {
      me.advertiseService.update(me.advertise)
        .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
          if (returnCode.code === '0000') {
            me.messageService.alert('', returnCode.message);
            me.router.navigate(['/base/advertise/list']);
          } else {
            me.messageService.alert('', returnCode.message);
          }
        })
        .catch(error => {
          me.messageService.alert('', '修改发生异常');
        })
    });

  }

}

