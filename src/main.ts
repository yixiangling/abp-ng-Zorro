import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, ChangeDetectorRef } from '@angular/core';
import { environment } from './environments/environment';
import { RootModule } from './root.module';
import { hmrBootstrap } from './hmr';

import "rxjs/Rx";

import * as moment from 'moment';

import 'moment/min/locales.min';
import 'moment-timezone';

// if (environment.production) {    //之所以去掉这个判断是因为使用modal打开子组件时会出现赋值多次的报错，查原因知道是angular的缺陷，暂时只看到现在这一个解决方案
    enableProdMode();
// }

const bootstrap = () => {
    return platformBrowserDynamic().bootstrapModule(RootModule);
};

/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */

if (environment.hmr) {
    if (module['hot']) {
        hmrBootstrap(module, bootstrap); //HMR enabled bootstrap
    } else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
} else {
    bootstrap(); //Regular bootstrap
}