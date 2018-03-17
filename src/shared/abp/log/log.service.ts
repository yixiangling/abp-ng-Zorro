import { Injectable } from '@angular/core';

import { Abp } from './../abp';


@Injectable()
export class LogService {



    debug(logObject?: any): void {
        Abp.log.debug(logObject);
    }

    info(logObject?: any): void {
        Abp.log.info(logObject);
    }

    warn(logObject?: any): void {
        Abp.log.warn(logObject);
    }

    error(logObject?: any): void {
        Abp.log.error(logObject);
    }

    fatal(logObject?: any): void {
        Abp.log.fatal(logObject);
    }
}
