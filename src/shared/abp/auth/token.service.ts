import { Injectable } from '@angular/core';
import { Abp } from './../abp';

@Injectable()
export class TokenService {

    getToken(): string {
        return Abp.auth.getToken();
    }

    getTokenCookieName(): string {
        return Abp.auth.tokenCookieName;
    }

    clearToken(): void {
        Abp.auth.clearToken();
    }

    setToken(authToken: string, expireDate?: Date): void {
        Abp.auth.setToken(authToken, expireDate);
    }

}
