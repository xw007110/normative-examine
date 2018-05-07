import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { InterBankConfig } from '../../providers/interbank-config';
import { Result } from '../../model/result';

import { LoginRequest } from './model/login.request';
import { LoginResponse } from './model/login.response';

@Injectable()
export class LoginService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private config: InterBankConfig) {}

    public login(username: string, password: string): Promise<Result<LoginResponse>>  {

        const loginUrl = this.config.API.login;
        const params = {
            username: username,
            password: password
        }

        return this.http
            .post(loginUrl, JSON.stringify(params), {headers: this.headers})
            .toPromise()
            .then( response => response.json() as Result<LoginResponse>)
        ;
    }

}

