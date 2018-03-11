import { ActivatedRouteSnapshot } from '@angular/router';

export interface ReuseTabCached {
    title: string;

    url: string;

    _snapshot: ActivatedRouteSnapshot;

    _handle: any;

    [key: string]: any;
}

export interface ReuseTabNotify {
    active: string;

    [key: string]: any;
}
