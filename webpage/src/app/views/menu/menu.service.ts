
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {TreeNode} from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {

  constructor(private http: Http) {}

  getFiles() {
    return this.http.get('files.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data);
  }
}
