import { Injectable } from '@angular/core';
import { Http, XHRBackend, Headers, Request, Response, RequestMethod, RequestOptionsArgs, ResponseOptions, ResponseOptionsArgs, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './message/message.service';
import { LogService } from './log/log.service';
import { TokenService } from './auth/token.service';
import { UtilsService } from './utils/utils.service';

import { CookieService } from 'ngx-cookie-service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface IValidationErrorInfo {

    message: string;

    members: string[];

}

export interface IErrorInfo {

    code: number;

    message: string;

    details: string;

    validationErrors: IValidationErrorInfo[];

}

export interface IAjaxResponse {

    success: boolean;

    result?: any;

    targetUrl?: string;

    error?: IErrorInfo;

    unAuthorizedRequest: boolean;

    __abp: boolean;

}

@Injectable()
export class AbpHttpConfiguration {

    constructor(
        private _messageService: MessageService,
        private _logService: LogService) {

    }

    defaultError = <IErrorInfo>{
        message: 'An error has occurred!',
        details: 'Error details were not sent by server.'
    };

    defaultError401 = <IErrorInfo>{
        message: 'You are not authenticated!',
        details: 'You should be authenticated (sign in) in order to perform this operation.'
    };

    defaultError403 = <IErrorInfo>{
        message: 'You are not authorized!',
        details: 'You are not allowed to perform this operation.'
    };

    defaultError404 = <IErrorInfo>{
        message: 'Resource not found!',
        details: 'The resource requested could not be found on the server.'
    };

    logError(error: IErrorInfo): void {
        this._logService.error(error);
    }

    showError(error: IErrorInfo): any {
        if (error.details) {
            return this._messageService.error(error.details, error.message || this.defaultError.message);
        } else {
            return this._messageService.error(error.message || this.defaultError.message);
        }
    }

    handleTargetUrl(targetUrl: string): void {
        if (!targetUrl) {
            location.href = '/';
        } else {
            location.href = targetUrl;
        }
    }

    handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
        const self = this;

        if (messagePromise) {
            messagePromise.done(() => {
                this.handleTargetUrl(targetUrl || '/');
            });
        } else {
            self.handleTargetUrl(targetUrl || '/');
        }
    }

    handleNonAbpErrorResponse(response: Response) {
        const self = this;

        switch (response.status) {
            case 401:
                self.handleUnAuthorizedRequest(
                    self.showError(self.defaultError401),
                    '/'
                );
                break;
            case 403:
                self.showError(self.defaultError403);
                break;
            case 404:
                self.showError(self.defaultError404);
                break;
            default:
                self.showError(self.defaultError);
                break;
        }
    }

    handleAbpResponse(response: Response, ajaxResponse: IAjaxResponse): Response {

        var newResponse = new ResponseOptions({
            url: response.url,
            body: ajaxResponse,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            type: response.type
        });

        if (ajaxResponse.success) {
            newResponse.body = ajaxResponse.result;

            if (ajaxResponse.targetUrl) {
                this.handleTargetUrl(ajaxResponse.targetUrl);;
            }
        } else {
            if (!ajaxResponse.error) {
                ajaxResponse.error = this.defaultError;
            }

            this.logError(ajaxResponse.error);
            this.showError(ajaxResponse.error);

            if (response.status === 401) {
                this.handleUnAuthorizedRequest(null, ajaxResponse.targetUrl);
            }
        }

        return new Response(newResponse);
    }

    getAbpAjaxResponseOrNull(response: Response): IAjaxResponse | null {
        if(!response || !response.headers) {
            return null;
        }

        var contentType = response.headers.get('Content-Type');
        if (!contentType) {
            this._logService.warn('Content-Type is not sent!');
            return null;
        }

        if (contentType.indexOf("application/json") < 0) {
            this._logService.warn('Content-Type is not application/json: ' + contentType);
            return null;
        }

        var responseObj = response.json();
        if (!responseObj.__abp) {
            return null;
        }

        return responseObj as IAjaxResponse;
    }

    handleResponse(response: Response): Response {
        var ajaxResponse = this.getAbpAjaxResponseOrNull(response);
        if (ajaxResponse == null) {
            return response;
        }

        return this.handleAbpResponse(response, ajaxResponse);
    }

    handleError(error: Response): Observable<any> {
        var ajaxResponse = this.getAbpAjaxResponseOrNull(error);
        if (ajaxResponse != null) {
            this.handleAbpResponse(error, ajaxResponse);
            return Observable.throw(ajaxResponse.error);
        } else {
            this.handleNonAbpErrorResponse(error);
            return Observable.throw('HTTP error: ' + error.status + ', ' + error.statusText);
        }
    }
}

@Injectable()
export class AbpHttp extends Http {

    protected configuration: AbpHttpConfiguration;
    private _tokenService: TokenService = new TokenService();
    private _utilsService: UtilsService = new UtilsService(new CookieService(document));

    constructor(
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        configuration: AbpHttpConfiguration) {
        super(backend, defaultOptions);

        this.configuration = configuration;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = {}; }
        this.normalizeRequestOptions(options);
        return super
            .get(url, options)
            .map(response => this.configuration.handleResponse(response))
            .catch(error => this.configuration.handleError(error));
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = {}; }
        this.normalizeRequestOptions(options);
        return super
            .post(url, body, options)
            .map(response => this.configuration.handleResponse(response))
            .catch(error => this.configuration.handleError(error));
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = {}; }
        this.normalizeRequestOptions(options);
        return super
            .put(url, body, options)
            .map(response => this.configuration.handleResponse(response))
            .catch(error => this.configuration.handleError(error));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = {}; }
        this.normalizeRequestOptions(options);
        return super
            .delete(url, options)
            .map(response => this.configuration.handleResponse(response))
            .catch(error => this.configuration.handleError(error));
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (!options) { options = {}; }
        this.normalizeRequestOptions(options);
        return super
            .request(url, options)
            .map(response => this.configuration.handleResponse(response))
            .catch(error => this.configuration.handleError(error));
    }

    protected normalizeRequestOptions(options: RequestOptionsArgs) {
        if (!options.headers) {
            options.headers = new Headers();
        }
        
        options.headers.append("Pragma","no-cache");
        options.headers.append("Cache-Control","no-cache");
        options.headers.append("Expires", "Sat, 01 Jan 2000 00:00:00 GMT");
        
        this.addXRequestedWithHeader(options);
        this.addAuthorizationHeaders(options);
        this.addAspNetCoreCultureHeader(options);
        this.addAcceptLanguageHeader(options);
        this.addTenantIdHeader(options);
    }

    protected addXRequestedWithHeader(options: RequestOptionsArgs) {
        if (options.headers) {
            options.headers.append('X-Requested-With', 'XMLHttpRequest');
        }
    }

    protected addAspNetCoreCultureHeader(options: RequestOptionsArgs) {
        let cookieLangValue = this._utilsService.getCookieValue("Abp.Localization.CultureName");
        if (cookieLangValue && options.headers && !options.headers.has('.AspNetCore.Culture')) {
            options.headers.append('.AspNetCore.Culture', cookieLangValue);
        }
    }

    protected addAcceptLanguageHeader(options: RequestOptionsArgs) {
        let cookieLangValue = this._utilsService.getCookieValue("Abp.Localization.CultureName");
        if (cookieLangValue && options.headers && !options.headers.has('Accept-Language')) {
            options.headers.append('Accept-Language', cookieLangValue);
        }
    }

    protected addTenantIdHeader(options: RequestOptionsArgs) {
        let cookieTenantIdValue = this._utilsService.getCookieValue('Abp.TenantId');
        if (cookieTenantIdValue && options.headers && !options.headers.has('Abp.TenantId')) {
            options.headers.append('Abp.TenantId', cookieTenantIdValue);
        }
    }

    protected addAuthorizationHeaders(options: RequestOptionsArgs): void {
        let authorizationHeaders = options.headers ? options.headers.getAll('Authorization'): null;
        if (!authorizationHeaders) {
            authorizationHeaders = [];
        }

        if (!this.itemExists(authorizationHeaders, (item: string) => item.indexOf('Bearer ') == 0)) {
            let token = this._tokenService.getToken();
            if (options.headers && token) {
                options.headers.append('Authorization', 'Bearer ' + token);
            }
        }
    }

    private itemExists<T>(items: T[], predicate: (item: T) => boolean): boolean {
        for (let i = 0; i < items.length; i++) {
            if (predicate(items[i])) {
                return true;
            }
        }

        return false;
    }
}
