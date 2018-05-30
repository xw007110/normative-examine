import { Injectable } from '@angular/core';
import {
    Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import { Utils } from '../util/utils';
import { SpinService } from '../spin/spin.service';
import { ToastService } from '../toast/toast.service';
import { ToastConfig, ToastType } from '../toast/toast-model';


/**
 * http服务
 */
@Injectable()
export class HttpService {

    constructor(private http: Http, private spinService: SpinService, private toastService: ToastService, ) {}

    public request(url: string, options: RequestOptionsArgs, success: Function, error: Function): any {
        this.spinService.spin(true);
        this.http.request(url, options).subscribe(res => {
            this.spinService.spin(false);
            if(res.json().success == true && res.json().code == 0){
                success(res.ok, res.json(), res);
            }else{
                const toastCfg = new ToastConfig(ToastType.ERROR, '', res.json().message, 3000);
                this.toastService.toast(toastCfg);
            }
        }, err => {
            this.spinService.spin(false);
            // 处理请求失败
            let msg = this.requestFailed(url, options, err);
            const toastCfg = new ToastConfig(ToastType.ERROR, '', msg, 3000);
            this.toastService.toast(toastCfg);
        });

    }

    public get(url: string, paramMap: any = null, success: Function =
        function(successful, data, res){}, error: Function = function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Get,
            search: this.buildURLSearchParams(paramMap)
        }), success, error);
    }

    public post(url: string, body: any = null, success: Function =
        function(successful, data, res){}, error: Function = function(successful, msg, err){}): any {

        return this.request(url, new RequestOptions({
            method: RequestMethod.Post,
            body: body,
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }), success, error);
    }

    public postFormData(url: string, paramMap: any = null, success: Function =
        function(successful, data, res){}, error: Function = function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Post,
            search: this.buildURLSearchParams(paramMap).toString(),
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }), success, error);
    }

    public put(url: string, body: any = null, success: Function =
        function(successful, data, res){}, error: Function = function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Put,
            body: body
        }), success, error);
    }

    public delete(url: string, paramMap: any = null, success: Function =
        function(successful, data, res){}, error: Function = function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Delete,
            search: this.buildURLSearchParams(paramMap).toString()
        }), success, error);
    }

    public patch(url: string, body: any = null,
        success: Function= function(successful, data, res){},
        error: Function= function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Patch,
            body: body
        }), success, error);
    }

    public head(url: string, paramMap: any = null,
        success: Function= function(successful, data, res){},
        error: Function= function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Head,
            search: this.buildURLSearchParams(paramMap).toString()
        }), success, error);
    }

    public options(url: string, paramMap: any = null,
        success: Function= function(successful, data, res){},
        error: Function= function(successful, msg, err){}): any {
        return this.request(url, new RequestOptions({
            method: RequestMethod.Options,
            search: this.buildURLSearchParams(paramMap).toString()
        }), success, error);
    }

    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    private  buildURLSearchParams(paramMap): URLSearchParams {
        const params = new URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            if (val instanceof Date) {
                val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            }
            params.set(key, val);
        }
        return params;
    }

    /**
     * 处理请求失败事件
     * @param url
     * @param options
     * @param err
     */
    private requestFailed(url: string, options: RequestOptionsArgs, err) {
        let msg = '请求发生异常';
        const status = err.status;
        if (status === 0) {
            msg = '请求失败，请求响应出错';
        } else if (status === 404) {
            msg = '请求失败，未找到请求地址';
        } else if (status === 500) {
            msg = '请求失败，服务器出错，请稍后再试';
        } else {
            msg = '未知错误，请检查网络';
        }

        return msg;

    }
    
}