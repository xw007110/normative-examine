// system
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// model
import { InterBankConfig } from '../../../providers/interbank-config';
import { Menu } from './model/menu';
import { Result } from '../../../model/result';

@Injectable()
export class MenuService {

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http, private config: InterBankConfig) {}

    getMenus(): Promise<Result<Menu[]>> {
        const url = '';
        return this.http
            .get(url, { headers: this.headers})
            .toPromise()
            .then( response => response.json() as Result<Menu[]>)
            ;
    }
}
