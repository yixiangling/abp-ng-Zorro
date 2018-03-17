import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UtilsService {

    constructor (
        private cookie: CookieService
    ) {

    }

    getCookieValue(key: string): string {
        return this.cookie.get(key);
    }

    setCookieValue(key: string, value: string, expireDate?: Date, path?: string): void {
        this.cookie.set(key, value, expireDate, path);
    }

    deleteCookie(key: string, path?: string): void {
        this.cookie.delete(key, path);
    }

}
