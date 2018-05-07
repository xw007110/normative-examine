import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {InterBankConfig} from '../../../providers/interbank-config';
import {PageResult} from '../../../model/pageResult';
import {Result} from '../../../model/result';

import {MessageTemplate} from './model/messageTemplate';
import {MessageTemplateParams} from './model/messageTemplate.params'


@Injectable()
export class MessageTemplateService {

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient, private config: InterBankConfig) {
  }

  public page(start: number, limit: number): Promise<PageResult<MessageTemplate[]>> {
    let pageUrl = `${this.config.API.messageTemplateService.page}?start=${start}&limit=${limit}`;
    return this.http
      .get(pageUrl)
      .toPromise()
      .then(response => response as PageResult<MessageTemplate[]>);
  }

  public get(id: string): Promise<Result<MessageTemplate>> {
    const getUrl = `${this.config.API.messageTemplateService.base}/${id}`;
    return this.http
      .get(getUrl)
      .toPromise()
      .then(response => response as PageResult<MessageTemplate>);
  }

  public add(messageTemplate: MessageTemplate): Promise<Result<MessageTemplate>> {
    const addUrl = this.config.API.messageTemplateService.base;
    return this.http
      .post(addUrl, JSON.stringify(messageTemplate))
      .toPromise()
      .then(response => response as Result<MessageTemplate>)
      ;
  }

  public update(messageTemplate: MessageTemplate): Promise<Result<MessageTemplate>> {
    const pageUrl = `${this.config.API.messageTemplateService.base}/${messageTemplate.id}`;
    return this.http
      .put(pageUrl, JSON.stringify(messageTemplate))
      .toPromise()
      .then(response => response as PageResult<MessageTemplate>);
  }

  public delete(id: string): Promise<Result<MessageTemplate>> {
    const pageUrl = `${this.config.API.messageTemplateService.base}/${id}`;
    return this.http
      .delete(pageUrl)
      .toPromise()
      .then(response => response as Result<MessageTemplate>);
  }
}
