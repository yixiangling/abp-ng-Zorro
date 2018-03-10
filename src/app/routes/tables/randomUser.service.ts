import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpRequest } from '@angular/common/http';

@Injectable()
export class RandomUserService {
    randomUserUrl = 'https://api.randomuser.me/';

    getUsers(PageIndex = 1, pageSize = 10, args?: any): any {
        // return this.http
        //     .get(this.randomUserUrl, { results: pageSize, page: PageIndex, _allow_anonymous: true })
        //     .pipe(catchError(this.handleError));
        
        let options_ : any = {
            method: "get",
            headers: new Headers({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }),
            params: this.parseParams({ results: pageSize, page: PageIndex, _allow_anonymous: true })
        };
        //
        // const result = Observable.forkJoin(
        //     this.http.get(this.randomUserUrl, options_)
        // );
        return this.http.get(this.randomUserUrl, options_);
        //this.http.get(this.randomUserUrl, options_).pipe(catchError(this.handleError));
    }

    handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    constructor(private http: HttpClient) {
    }

    parseParams(params: any): HttpParams {
        let ret = new HttpParams();
        // tslint:disable-next-line:forin
        for (const key in params) {
            let _data = params[key];
            ret = ret.set(key, _data);
        }
        return ret;
    }

}
