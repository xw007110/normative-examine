// 系统
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

// service
import {KeywordsService} from './keywords.service';
import {MessageModalService} from '../../../components/app-common/app-modal/message.modal.service';

// model
import {ReturnCode} from '../../../model/returnCode';
import {Keywords} from './model/keywords';

@Component({
  templateUrl: 'keywords.update.component.html'
})
export class KeywordsUpdateComponent implements OnInit {
  public form: FormGroup;

  bsModalRef: BsModalRef;


  @Input()
  private keywords = new Keywords();

  constructor(private router: Router,
              private keywordsService: KeywordsService,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private messageService: MessageModalService,
              public fb: FormBuilder) {

    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      keyword: ['', Validators.required]
    });
  }


  ngOnInit() {
    const me = this;
    const id = me.route.snapshot.paramMap.get('id')
    me.keywordsService.get(id)
      .then(
        result => {
          const returnCode: ReturnCode = result.returnCode;
          if (returnCode.code === '0000') {
            me.keywords = result.data;
            me.form.controls['id'].setValue(me.keywords.id);
            me.form.controls['keyword'].setValue(me.keywords.keyword);
            
          } else {
            console.log(returnCode.message);
          }
        }
      )

  }

  public doUpdate() {
    const param ={
      "keyword": this.form.controls['keyword'].value
    }
    const me = this;
    me.messageService.confirm('', '确认修改', function (dialog) {
      me.keywordsService.update(me.keywords.id,param)
        .then(result => {
          const returnCode: ReturnCode = result.returnCode;
          dialog.close();
          if (returnCode.code === '0000') {
            me.messageService.alert('', returnCode.message);
            me.router.navigate(['/sys/keyword/list']);
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

