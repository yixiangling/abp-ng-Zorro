
import { UtilsService } from './utils/utils.service';
import { CookieService } from 'ngx-cookie-service';

export enum MultiTenancy  { TENANT = 1 , HOST = 2 }

enum LogLevel { DEBUG = 1, INFO = 2 , WARN = 3 , ERROR = 4 , FATAL = 5 }

export class Abp {

    static appPath = '/';
    static domain = undefined;

    static toAbsAppPath = function (path) {
        if (path.indexOf('/') === 0) {
            path = path.substring(1);
        }

        return Abp.appPath + path;
    };

    static readonly multiTenancy = {
        isEnabled : false,
        tenantIdCookieName: 'Abp.TenantId',
        setGlobal: function(multiTenancy){
            Abp.multiTenancy.isEnabled = multiTenancy.isEnabled;
        },
        setTenantIdCookie: function(tenantId){
            if (tenantId) {

                Abp.utils.setCookieValue(
                    Abp.multiTenancy.tenantIdCookieName,
                    tenantId.toString(),
                    new Date(new Date().getTime() + 5 * 365 * 86400000), // 5 years
                    Abp.appPath,
                    Abp.domain
                );
            } else {
                Abp.utils.deleteCookie(Abp.multiTenancy.tenantIdCookieName, Abp.appPath);
            }
        },
        getTenantIdCookie : function () {
            const value = Abp.utils.getCookieValue(Abp.multiTenancy.tenantIdCookieName);
            if (!value) {
                return null;
            }

            return parseInt(value, null);
        }
    };


    static readonly session = {
        multiTenancySide: MultiTenancy.HOST,
        tenantId: undefined,
        userId: undefined,
        impersonatorUserId: undefined,
        impersonatorTenantId: undefined,
        setGlobal: function(session){
            if ( !session) {
                return;
            }

            Abp.session.multiTenancySide = session.multiTenancySide;
            Abp.session.tenantId = session.tenantId;
            Abp.session.userId = session.userId;
            Abp.session.impersonatorUserId = session.impersonatorUserId;
            Abp.session.impersonatorTenantId = session.impersonatorTenantId;
        }
    };

    static readonly localization = {
        currentCulture: {
            name: undefined
         },
        languages: [ ],
        currentLanguage: {
            name: undefined
         },
        sources: [],
        values: {},
        setGlobal: function(localization){
            if (!localization) {
                return;
            }

            Abp.localization.currentCulture = localization.currentCulture;
            Abp.localization.languages = localization.languages;
            Abp.localization.currentLanguage = localization.currentLanguage;
            Abp.localization.sources = localization.sources;
            Abp.localization.values = localization.values;

            Abp.log.debug(Abp.localization);
        },
        abpWeb : function(){ return Abp.localization.getSource('AbpWeb'); } ,
        defaultSourceName : undefined,
        getSource : function (sourceName) {
            return function (key) {
                const copiedArguments = Array.prototype.slice.call(arguments, 0);
                copiedArguments.splice(1, 0, sourceName);
                return Abp.localization.localize.apply(this, copiedArguments);
            };
        },
        localize : function (key, sourceName) {
            sourceName = sourceName || Abp.localization.defaultSourceName;
            const source = Abp.localization.values[sourceName];

            if (!source) {
                Abp.log.warn('Could not find localization source: ' + sourceName);
                return key;
            }

            const value = source[key];
            if (value === undefined) {
                return key;
            }

            const copiedArguments = Array.prototype.slice.call(arguments, 0);
            copiedArguments.splice(1, 1);
            copiedArguments[0] = value;

            return Abp.utils.formatString.apply(this, copiedArguments);
        },
        isCurrentCulture : function (name) {
            return Abp.localization.currentCulture
                && Abp.localization.currentCulture.name
                && Abp.localization.currentCulture.name.indexOf(name) == 0;
        }
    };

    static readonly features = {
        allFeatures: {},
        setGlobal: function(features){
            if (!features) {
                return;
            }
            Abp.features.allFeatures = features.allFeatures;

        },
        get : function (name) {
            return Abp.features.allFeatures[name];
        },
        getValue : function (name) {
            const feature = Abp.features.get(name);
            if (feature === undefined) {
                return undefined;
            }

            return feature.value;
        },
        isEnabled : function (name) {
            const value = Abp.features.getValue(name);
            return value === 'true' || value === 'True';
        }
    };


    static readonly auth = {
        allPermissions: {},
        grantedPermissions: {},
        setGlobal: function(auth){
            Abp.auth.allPermissions = auth.allPermissions;
            Abp.auth.grantedPermissions = auth.grantedPermissions;
        },
        hasPermission : function (permissionName) {
            return Abp.auth.isGranted.apply(this, arguments);
        },
        isGranted : function (permissionName) {
            return Abp.auth.allPermissions[permissionName] !== undefined && Abp.auth.grantedPermissions[permissionName] !== undefined;
        },
        hasAnyOfPermissions : function () {
            return Abp.auth.isAnyGranted.apply(this, arguments);
        },
        isAnyGranted : function () {
            if (!arguments || arguments.length <= 0) {
                return true;
            }

            for (let i = 0; i < arguments.length; i++) {
                if (Abp.auth.isGranted(arguments[i])) {
                    return true;
                }
            }

            return false;
        },
        hasAllOfPermissions : function () {
            return Abp.auth.areAllGranted.apply(this, arguments);
        },
        areAllGranted : function () {
            if (!arguments || arguments.length <= 0) {
                return true;
            }

            for (let i = 0; i < arguments.length; i++) {
                if (!Abp.auth.isGranted(arguments[i])) {
                    return false;
                }
            }

            return true;
        },
        tokenCookieName : 'Abp.AuthToken',
        setToken : function (authToken, expireDate) {
            Abp.utils.setCookieValue(Abp.auth.tokenCookieName, authToken, expireDate, Abp.appPath, Abp.domain);
        },
        getToken : function () {
            return Abp.utils.getCookieValue(Abp.auth.tokenCookieName);
        },
        clearToken : function () {
            Abp.auth.setToken(null, null);
        }

    };

    static readonly nav = {
        menus: {
        },
        setGlobal: function(nav){
            if (!nav) {
                return;
            }
            Abp.nav.menus = nav.menus;
        }
    };


    static readonly setting = {

        values : { },
        setGlobal: function(setting){
            if (!setting) {
                return;
            }
            Abp.setting.values = setting.values;
        },
        get : function(name){
            return Abp.setting.values[name];
        },
        getBoolean : function(name){
            const value = Abp.setting.get(name);
            return value === 'true' || value === 'True';
        },
        getInt : function(name){
            const value = Abp.setting.values[name];
            return parseInt(value, null);
        }

    };

    static readonly clock = {
        provider: {
            supportsMultipleTimezone:undefined
        },
        setGloabl( clock ) {
            Abp.clock.provider = clock.provider;
        }
    };

    static readonly timing = {

        timeZoneInfo: {
            iana: {
                timeZoneId: null
            }

        },
        setGloabl( timing ) {
            Abp.timing.timeZoneInfo = timing.timeZoneInfo;
            console.log(Abp.timing.timeZoneInfo);
        },
        utcClockProvider : (function () {

            const toUtc = function (date) {
                return Date.UTC(
                    date.getUTCFullYear()
                    , date.getUTCMonth()
                    , date.getUTCDate()
                    , date.getUTCHours()
                    , date.getUTCMinutes()
                    , date.getUTCSeconds()
                    , date.getUTCMilliseconds()
                );
            };

            const now = function () {
                return new Date();
            };

            const normalize = function (date) {
                if (!date) {
                    return date;
                }

                return new Date(toUtc(date));
            };

            // Public interface ///////////////////////////////////////////////////

            return {
                now: now,
                normalize: normalize,
                supportsMultipleTimezone: true
            };
        })(),
        localClockProvider : (function () {

            const toLocal = function (date) {
                return new Date(
                    date.getFullYear()
                    , date.getMonth()
                    , date.getDate()
                    , date.getHours()
                    , date.getMinutes()
                    , date.getSeconds()
                    , date.getMilliseconds()
                );
            };

            const now = function () {
                return toLocal(new Date());
            };

            const normalize = function (date) {
                if (!date) {
                    return date;
                }

                return toLocal(date);
            };

            // Public interface ///////////////////////////////////////////////////

            return {
                now: now,
                normalize: normalize,
                supportsMultipleTimezone: false
            };
        })(),
        unspecifiedClockProvider : (function () {

            const now = function () {
                return new Date();
            };

            const normalize = function (date) {
                return date;
            };

            // Public interface ///////////////////////////////////////////////////

            return {
                now: now,
                normalize: normalize,
                supportsMultipleTimezone: false
            };
        })()
    };

    static readonly security = {
        antiForgery: {
            tokenCookieName: 'XSRF-TOKEN',
            tokenHeaderName: 'X-XSRF-TOKEN',
            getToken : function () {
                return Abp.utils.getCookieValue(Abp.security.antiForgery.tokenCookieName);
            }
        },
        setGlobal: function(security){
            if (!security) {
                return;
            }
            Abp.security.antiForgery = security.antiForgery;

        }
    };

    /* SIMPLE EVENT BUS *****************************************/
    static readonly event = (function () {

        var _callbacks = {};

        var on = function (eventName, callback) {
            if (!_callbacks[eventName]) {
                _callbacks[eventName] = [];
            }

            _callbacks[eventName].push(callback);
        };

        var off = function (eventName, callback) {
            var callbacks = _callbacks[eventName];
            if (!callbacks) {
                return;
            }

            var index = -1;
            for (var i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === callback) {
                    index = i;
                    break;
                }
            }

            if (index < 0) {
                return;
            }

            _callbacks[eventName].splice(index, 1);
        };

        var trigger = function (eventName, ...args) {
            var callbacks = _callbacks[eventName];
            if (!callbacks || !callbacks.length) {
                return;
            }

            //var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(this, args);
            }
        };

        // Public interface ///////////////////////////////////////////////////

        return {
            on: on,
            off: off,
            trigger: trigger
        };
    })();

    static readonly utils = {

        setCookieValue: function (key, value, expireDate, path, domain){
            let cookieValue = encodeURIComponent(key) + '=';

            if (value) {
                cookieValue = cookieValue + encodeURIComponent(value);
            }

            if (expireDate) {
                cookieValue = cookieValue + '; expires=' + expireDate.toUTCString();
            }

            if (path) {
                cookieValue = cookieValue + '; path=' + path;
            }

            if (domain) {
                cookieValue = cookieValue + '; domain=' + domain;
            }

            document.cookie = cookieValue;
        },
        deleteCookie : function (key, path) {
            let cookieValue = encodeURIComponent(key) + '=';

            cookieValue = cookieValue + '; expires=' + (new Date(new Date().getTime() - 86400000)).toUTCString();

            if (path) {
                cookieValue = cookieValue + '; path=' + path;
            }

            document.cookie = cookieValue;
        },
        getCookieValue : function (key) {
            const equalities = document.cookie.split('; ');
            for (let i = 0; i < equalities.length; i++) {
                if (!equalities[i]) {
                    continue;
                }

                const splitted = equalities[i].split('=');
                if (splitted.length !== 2) {
                    continue;
                }

                if (decodeURIComponent(splitted[0]) === key) {
                    return decodeURIComponent(splitted[1] || '');
                }
            }

            return null;
        },
        formatString : function () {
            if (arguments.length < 1) {
                return null;
            }

            let str = arguments[0];

            for (let i = 1; i < arguments.length; i++) {
                const placeHolder = '{' + (i - 1) + '}';
                str = Abp.utils.replaceAll(str, placeHolder, arguments[i]);
            }

            return str;
        },
        replaceAll : function (str, search, replacement) {
            const fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            return str.replace(new RegExp(fix, 'g'), replacement);
        }
    };

    static readonly log = {
        debug(logObject?: any): void {
            Abp.logger('DEBUG: ', LogLevel.DEBUG);
            Abp.logger(logObject, LogLevel.DEBUG);
        },
        info(logObject?: any): void {
            Abp.logger('INFO: ', LogLevel.INFO);
            Abp.logger(logObject, LogLevel.INFO);
        },
        warn(logObject?: any): void {
            Abp.logger('WARN: ', LogLevel.WARN);
            Abp.logger(logObject, LogLevel.WARN);
        },
        error(logObject?: any): void {
            Abp.logger('ERROR: ', LogLevel.ERROR);
            Abp.logger(logObject, LogLevel.ERROR);
        },
        fatal(logObject?: any): void {
            Abp.logger('FATAL: ', LogLevel.FATAL);
            Abp.logger(logObject, LogLevel.FATAL);
        }

    };

    private static logger (logObject, logLevel: LogLevel) {
        if (!window.console || !window.console.log) {
            return;
        }

        if (logLevel !== undefined && logLevel < 1) {
            return;
        }

        console.log(logObject);
    }


}

export namespace abp {
    export namespace localization {

        export interface ILanguageInfo {

            name: string;

            displayName: string;

            icon: string;

            isDefault: boolean;

            isDisabled: boolean;

        }

        export interface ILocalizationSource {

            name: string;

            type: string;

        }

    }

    export namespace features {

        export interface IFeature {

            value: string;

        }

    }


    export namespace timing {

        export interface IClockProvider {

            supportsMultipleTimezone: boolean;

            now(): Date;

            normalize(date: Date): Date;

        }

        export interface ITimeZoneInfo {

            windows: {

                timeZoneId: string;

                baseUtcOffsetInMilliseconds: number;

                currentUtcOffsetInMilliseconds: number;

                isDaylightSavingTimeNow: boolean;

            };

            iana: {

                timeZoneId: string;

            };

        }

        /*
        const utcClockProvider: IClockProvider;

        const localClockProvider: IClockProvider;

        const unspecifiedClockProvider: IClockProvider;

        function convertToUserTimezone(date: Date): Date;

        let timeZoneInfo: ITimeZoneInfo;
        */
    }
}



