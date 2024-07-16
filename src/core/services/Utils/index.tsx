import Dataset from "../Dataset/Dataset";
import { Record, Schema, Field, IImage, RouteArray, Route, IConfig } from "../../types";
import { Empresa, Permissions, User, UserPermission } from "../User/types";
import { ApiInterface } from "../Api/types";
import { getLangByCountry, getModuleLabel } from "../Lang";
import { Lang } from "../Lang/types";
import { formatDateTime, parseUTCDate } from "./date";
import { MaskString, patternCount } from "./Mask";
// import { CountryLang } from "../../../lang";
import React from "react";
import Config from "../../../config";
import { PDFCompanyInfo } from "../../lib/PDFReport/types";
import { buildAddress, buildContacts, buildStringLine } from "./strings";
import { convertImage } from "./workarounds";

export const getHost = () => {
    return window.location.host;
}

export const getAccount = (config: IConfig): string => {
    if (!!config && !!config.debug && !!config.debug_account)
        return config?.debug_account;
    if (!config.multiDomain) {
        return localStorage.getItem('account') || ''
    }
    const defParts = (config.host || "").split('.');
    const host = window.location.host;
    const parts = host.split('.');
    if (parts.length <= defParts.length || parts.length - 1 > defParts.length)
        return ''
    const acc = parts[0];
    if (acc === 'app')
        return '';
    return parts[0];
}

export const getRouteByPath = (routes: RouteArray, path: string): Route | undefined => {
    for (let i = 0; i < routes.length; i++) {
        const r = routes[i];
        if (r.children) {
            const res = getRouteByPath(r.children, path);
            if (!!res)
                return res;
            continue;
        }
        if (r.path === path)
            return r;
    }
}

export const getCurrentRoute = (routes: RouteArray, id: any): Route | undefined => {
    let path = window.location.pathname;
    if (!!id) {
        const parts = path.split('/');
        parts.splice(parts.length - 1, parts.length);
        path = parts.join('/');
    }
    return getRouteByPath(routes, path);
}

export const getLinks = (title: string, id: any, routes: RouteArray, lang: Lang) => {
    const currentRoute = getCurrentRoute(routes, id);
    const links: any[] = [];

    if (!currentRoute) {
        links.push({ label: title, path: '' });
        return links;
    }

    links.push({ label: title, path: !!id ? currentRoute.path : '' });
    if (!!id) {
        if (id === (Config.newPath || 'new'))
            links.push({ label: lang.data.captions.new, path: '' });
        else
            links.push({ label: id, path: '' });
    }
    if (!!currentRoute.owner) {
        let ownerPath = '';
        if (!!currentRoute.owner.children)
            ownerPath = currentRoute.owner.children[0].path || '';
        links.unshift({ label: getModuleLabel(lang, '', currentRoute.owner.internalName || currentRoute.owner.name || '', currentRoute.owner.internalName || currentRoute.owner.name || ''), path: ownerPath });
    }
    return links;
}

export const setCookie = (name: string, value: string, days?: number, domain?: string) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    let domainText = "; path=/";
    if (domain) {
        domainText = "; domain=" + domain;
    }

    document.cookie = name + "=" + (value || "") + expires + domainText;
}
export const getCookie = (name: string) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
}
export const removeCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export const getStorage = (name: string, defaultValue?: string, group?: string, module?: string, accountId?: number, userId?: number): string => {
    const key = (!accountId ? '' : accountId + 'a.') + (!userId ? '' : userId + 'u.') + (!group ? '' : group + '.') + (!module ? '' : module + '.') + name;
    const val = localStorage.getItem(key);
    if (!val)
        return defaultValue || '';
    return val;
}

export const getIntStorage = (name: string, defaultValue?: number, group?: string, module?: string, accountId?: number, userId?: number): number => {
    const key = (!accountId ? '' : accountId + 'a.') + (!userId ? '' : userId + 'u.') + (!group ? '' : group + '.') + (!module ? '' : module + '.') + name;
    const val = localStorage.getItem(key);
    if (!val)
        return defaultValue || 0;
    return parseInt(val);
}


export const getBoolStorage = (name: string, defaultValue?: boolean, group?: string, module?: string, accountId?: number, userId?: number): boolean => {
    const key = (!accountId ? '' : accountId + 'a.') + (!userId ? '' : userId + 'u.') + (!group ? '' : group + '.') + (!module ? '' : module + '.') + name;
    const val = localStorage.getItem(key);
    if (!val)
        return defaultValue || false;
    return parseInt(val) === 1;
}

export const setStorage = (name: string, value: any, group?: string, module?: string, accountId?: number, userId?: number) => {
    const key = (!accountId ? '' : accountId + 'a.') + (!userId ? '' : userId + 'u.') + (!group ? '' : group + '.') + (!module ? '' : module + '.') + name;
    if (value === undefined || value === null || value === '')
        localStorage.removeItem(key);
    else if (typeof value === 'object')
        localStorage.setItem(key, JSON.stringify(value));
    else
        localStorage.setItem(key, value);
}


export const setBoolStorage = (name: string, value?: boolean, group?: string, module?: string, accountId?: number, userId?: number) => {
    const key = (!accountId ? '' : accountId + 'a.') + (!userId ? '' : userId + 'u.') + (!group ? '' : group + '.') + (!module ? '' : module + '.') + name;
    if (!value)
        localStorage.removeItem(key);
    else
        localStorage.setItem(key, '1');
}

export const getPermissions = (perm: number) => {
    return {
        list: (perm & 1) === 1,
        record: (perm & 2) === 2,
        insert: (perm & 4) === 4,
        update: (perm & 8) === 8,
        delete: (perm & 16) === 16
    }
}

export const getPermissionsValue = (perm: Permissions) => {
    return (perm.list ? 1 : 0) + (perm.record ? 2 : 0) + (perm.insert ? 4 : 0) + (perm.update ? 8 : 0) + (perm.delete ? 16 : 0);
}

export const mergePermissionsValue = (perm1: Permissions, perm2: Permissions) => {
    return {
        list: perm1.list || perm2.list,
        record: perm1.record || perm2.record,
        insert: perm1.insert || perm2.insert,
        update: perm1.update || perm2.update,
        delete: perm1.delete || perm2.delete
    }
}

export const setPermissions = (user: User, obj: any) => {
    user.isAdmin = !!obj.isAdmin;
    if (!user.permissions)
        user.permissions = [];
    if (!obj.permissions)
        return;
    obj.permissions.forEach((perm: any) => {
        let opts = [];
        if (perm.o) {
            opts = perm.o.split(';')
        }

        const newPerm: UserPermission = {
            resource: perm.r,
            module: perm.m,
            permissions: getPermissions(perm.p),
            options: opts
        };
        user.permissions.push(newPerm);
    });
}

export const formatDataset = (dataset: Record[], schema: Schema): Record[] => {
    return dataset;
}

export const getField = (name: string, dataset: Dataset): Field | undefined => {
    return dataset.fields.find((f) => f.name.toLowerCase() === name.toLowerCase());
}

export const maskValue = (val: any, mask: string): string => {
    const masks = mask.split(';');
    const value = val + '';
    mask = '';
    for (let i = 0; i < masks.length; i++) {
        const m = masks[i];
        const count = patternCount(m);
        if (value.length === count) {
            mask = m;
            break;
        }
    }
    return MaskString(val, mask);
}

// export const getCountryPhoneMask = (country: number) => {
//     return (CountryLang[country] as Lang)?.data?.masks?.phone || '';
// }

// export const formatPhone = (phoneNumber: string, country?: number) => {
//     return maskValue(phoneNumber, getCountryPhoneMask(country || 1058));
// }

export const formatValue = (val: any, field: Field, lang: Lang): string => {
    if (!field.required && !field.zeroEmpty && (val === undefined || val === null))
        return val;

    switch (field.dataType) {
        case "bool":
            return val === "1" || val === 1 || val === 'true' || val === true ? lang.data.formats.true : lang.data.formats.false;
        case "date":
            if (!(val instanceof Date))
                val = parseUTCDate(val, 'yyyy-MM-dd');
            return formatDateTime(val, field.displayFormat || lang.data.formats.date, lang);
        case "time":
            if (!(val instanceof Date))
                val = new Date(val); // parseDate(val, 'yyyy-MM-ddThh:mm:ss');
            return formatDateTime(val, field.displayFormat || lang.data.formats.time, lang);
        case "datetime":
            if (!(val instanceof Date)) {
                val = new Date(val); //parseDate(val, 'yyyy-MM-ddThh:mm');
            }
            return formatDateTime(val, field.displayFormat || lang.data.formats.datetime, lang);
        case "float":
            if (field.zeroEmpty && !val)
                val = 0;
            return formatNumber(val, field.displayFormat || '', { decimalCount: 2, decimalSeparator: lang.data.formats.decimalSeparator, showThousandSeparator: true, thousandSeparator: lang.data.formats.thousandSeparator })
        case "integer":
            if (field.zeroEmpty && !val)
                val = 0;
            return formatNumber(val, field.displayFormat || '', { decimalCount: 0, decimalSeparator: lang.data.formats.decimalSeparator, showThousandSeparator: true, thousandSeparator: lang.data.formats.thousandSeparator })
    }
    if (field.dataType === 'string' && !!field.mask)
        return maskValue(val, field.mask);
    return val;
}

export const getOptionLangText = (val: any, defaultText: string, field: Field, dataset: Dataset) => {
    const modules = dataset.lang?.modules;
    if (!modules)
        return defaultText;
    const mod = modules[dataset.group];
    if (!mod)
        return defaultText;
    const langFields = mod[dataset.name]?.fields;
    if (!langFields)
        return defaultText;
    const langField = langFields[field.name];
    if (!langField)
        return defaultText;
    const options = langField.options;
    if (!options)
        return defaultText;
    return options[val] || defaultText;

}

export const formatStr = (str: string, values: any[]) => {
    let arr = str.split('%s');
    if (arr.length <= 1)
        return str;
    let formatted = arr[0];
    for (let i = 1; i < arr.length; i++)
        formatted += values[i - 1] + arr[i];
    return formatted;
}

export const getNumber = (n: string) => {
    if (!n)
        return '';
    if (typeof n !== 'string')
        n = '';
    return Number(n.replace(/\D/g, '')).toString();
}

export const getDigits = (n: string) => {
    return n.replace(/\D/g, '');
}

export const getPhoneDigits = (phone: string): string => {
    return phone.replace(/\D/g, '');
}

export const getPhoneMask = (val: string, masks: string[]): string => {
    const l = getPhoneDigits(val).length;

    for (let i = 0; i < masks.length; i++) {
        const m = masks[i];
        const mLen = getPhoneDigits(m).length;

        if (mLen === l)
            return m;
    }
    return '';
}

export const getPhoneValue = (text: string, value: any, record?: any, field?: Field, dataset?: Dataset, lang?: Lang, option?: any, classes?: any) => {
    if (!value)
        return;
    let p = { code: '', number: value };
    if (value.includes(';')) {
        const s = value.split(';')
        p.code = s[0];
        p.number = s[1];
    }
    let country = lang?.phoneCodes[p.code] || '';
    if (country) {
        if (country.mask)
            return maskValue(p.number, country.mask)
        return p.number;

    }
    const cLang = getLangByCountry(record.PaisId);
    if (!!cLang)
        return maskValue(value, cLang.data.masks.phone);
    return maskValue(value, lang?.data.masks.phone || '');
}

export const doMaskPhone = (value: any, lang: Lang) => {
    if (!value)
        return;
    let p = { code: '', number: value };
    if (value.includes(';')) {
        const s = value.split(';')
        p.code = s[0];
        p.number = s[1];
    }
    let country = lang.phoneCodes[p.code];
    if (country) {
        if (country.mask)
            return maskValue(p.number, country.mask)
        return p.number;
    }
    return maskValue(value, lang.data.masks.phone);
}

export const maskTokenMatch = (value: string, token: string): boolean => {
    if (!token)
        return true;
    switch (token) {
        case '9':
            const d = value.match(/\d/);
            return !!d;
        case 'a':
            const c = value.match(/[a-zA-Z]/);
            return !!c;
        case '*':
            return true
    }
    return false;
}

export const unmask = (maskedValue: string, mask: string) => {
    let unmasked = '';
    for (let i = 0; i < maskedValue.length; i++) {
        const c = maskedValue[i];
        const token = mask[i];
        if (maskTokenMatch(c, token))
            unmasked += c;
    }
    return unmasked;
}

export const getMaskTokens = (mask: string) => {
    return mask.replace(/[^a9*]/g, '');
}

export const getMask = (val: string, masks: string[]): string => {
    const len = (val || '').length;
    for (let i = 0; i < masks.length; i++) {
        const mask = masks[i];
        const tokens = getMaskTokens(mask);
        if (len === tokens.length)
            return mask;
    }
    return '';
}

export const lpad = (str: string, padString: string, length: number) => {
    while (str.length < length)
        str = padString + str;
    return str;
}
export const rpad = (str: string, padString: string, length: number) => {
    while (str.length < length)
        str += padString;
    return str;
}

export const numberWithThousandSep = (number: string, sep: string, isDecimal?: boolean) => {
    var b = number + "";
    var r = '';
    sep = sep || ',';
    if (b.length <= 3)
        return number;
    while (b) {
        if (!!isDecimal) {
            if (b.length <= 3) {
                r = r + sep + b;
                b = '';
            } else {
                r += (r ? sep : '') + b.slice(0, 3);
                b = b.slice(3, b.length);
            }
        } else {
            if (b.length <= 3) {
                r = b + sep + r;
                b = '';
            } else {
                r = b.slice(b.length - 3, b.length) + (r ? sep : '') + r;
                b = b.slice(0, b.length - 3);
            }
        }
    }
    return r;
}

export type FormatSettings = {
    zerosBefore?: number,
    decimalCount?: number,
    showThousandSeparator?: boolean,
    thousandSeparator?: string,
    decimalSeparator?: string,
    forceShowDecimals?: boolean,
}

export const getFormatSettings = (lang: Lang) => {
    return { decimalCount: 2, decimalSeparator: lang.data.formats.decimalSeparator, showThousandSeparator: true, thousandSeparator: lang.data.formats.thousandSeparator }
}

const getFormatProps = (format: string, formatSettings: FormatSettings) => {

    const getTokens = (n: string) => n.match(/([0#])/g) || [];
    if (format === '')
        return;
    let buf = format.split('.');
    if (buf.length >= 2)
        formatSettings.decimalCount = buf[1].split("0").length - 1;
    else
        formatSettings.decimalCount = 0;
    formatSettings.showThousandSeparator = buf[0].split(",").length - 1 > 0;
    formatSettings.forceShowDecimals = format.includes(".");
    formatSettings.zerosBefore = getTokens(buf[0]).length;
}

export const formatNumber = (value: any, format?: string, formatSettings?: FormatSettings): string => {
    if ((!format && !formatSettings) || (value === undefined || value === null))
        return value;
    let val = 0;
    const f: FormatSettings = { ...formatSettings };
    f.zerosBefore = f.zerosBefore || 0;
    f.decimalCount = f.decimalCount || 0;
    f.decimalSeparator = f.decimalSeparator || '.';
    f.thousandSeparator = f.thousandSeparator || ',';
    f.showThousandSeparator = f.showThousandSeparator !== undefined ? f.showThousandSeparator : false;

    getFormatProps(format || '', f);
    const divRest = Math.abs(Number(value) % 1);

    if (f.forceShowDecimals && divRest !== 0 && f.decimalCount === 0) {
        let dec = divRest.toFixed(3);
        if (dec.match(/\./)) {
            dec = dec.replace(/\.?0+$/, '');
        }
        const stDec = dec.length - 2;
        f.decimalCount = Number(stDec);
    }

    if (!isNaN(Number(value))) {
        let aux = Math.pow(10, f.decimalCount);
        val = Math.round(value * aux);
    } else if (value) {
        val = parseInt(getDigits(value));
    }
    let neg = false;
    let showPlus = (format?.startsWith('+') && val > 0) || false;
    if (val < 0) {
        neg = true;
        val = -(val);
    }

    let v = val.toString();

    if (v.length <= f.decimalCount)
        return (neg ? '-' : (showPlus && val > 0 ? '+' : '')) + '0' + (f.decimalCount > 0 ? f.decimalSeparator : '') + lpad(v, '0', f.decimalCount);
    else {
        if (v.length >= 15)
            v = v.slice(0, 14);
        let i = String(Number(v.slice(0, v.length - f.decimalCount)));
        if (f.showThousandSeparator)
            i = numberWithThousandSep(i, f.thousandSeparator);
        let d = v.slice(v.length - f.decimalCount, v.length);
        if (f.showThousandSeparator)
            d = numberWithThousandSep(d, f.thousandSeparator, true);
        return (neg ? '-' : (showPlus ? '+' : '')) + lpad(i, '0', f.zerosBefore) + (f.decimalCount > 0 ? f.decimalSeparator : '') + d;
    }
}

export const formatNumberLang = (value: number, format: string, lang: Lang, decimalCount?: number) => {
    return formatNumber(value, format, { decimalCount: decimalCount || 2, decimalSeparator: lang.data.formats.decimalSeparator, showThousandSeparator: true, thousandSeparator: lang.data.formats.thousandSeparator })
}

export const fixNumber = (val: any, fs?: FormatSettings): string => {
    let v = Number(val);
    if (!val || isNaN(val))
        v = 0;
    const decimals = fs?.decimalCount || 0;
    return v.toFixed(decimals);
    //
    // const int = Math.trunc(v);
    // const dec = (v % 1).toFixed(decimals).substring(2, decimals + 2);
    // return int.toString() + dec;
}

export const fixedNumber = (val: string, fs?: FormatSettings): string => {
    let digits = getNumber(val);
    if (!digits)
        digits = '0';
    if (!fs)
        return digits;
    const decimals = fs.decimalCount || 0;
    if (digits.length <= decimals)
        digits = lpad(digits, '0', decimals + 1)
    return digits;
}

export const round = (value: number, decimals?: number): number => {
    if (!value || isNaN(value))
        return 0;
    if (decimals === undefined)
        decimals = 2;
    const aux = Math.pow(10, decimals);
    const r = value * aux;
    return Math.round(r) / aux;
}

export const roundEx = (value: number): number => {
    if (!value || isNaN(value))
        return 0;
    const r = Math.round(value) / 10;
    const frac = Utils.financial(r - Math.floor(r));
    let i = Math.floor(frac * 10);
    if (i > 0 && i < 3)
        i = 0 - i;
    else if (i > 2 && i < 8)
        i = 5 - i
    else if (i >= 8)
        i = 10 - i;
    const v = r * 10 + i
    return v;
}


export const parseNumber = (val: string, fs?: FormatSettings): number | undefined => {
    let digits = getNumber(val);
    if (!digits)
        return undefined;
    if (!fs || !fs.decimalCount)
        return parseInt(digits);
    let intPart: string = '0.';
    let decPart: string = '0'.repeat(fs.decimalCount);
    if (digits.length < fs.decimalCount + 1) {
        decPart = lpad(digits, '0', fs.decimalCount);
        return parseFloat(intPart + decPart);
    }
    decPart = digits.substring(digits.length - fs.decimalCount, digits.length);
    intPart = digits.substring(0, digits.length - fs.decimalCount);
    return parseFloat(intPart + '.' + decPart);
}

export const parseNumberEx = (val: string, fs?: FormatSettings): number | undefined => {
    const valarr = val.split(fs?.decimalSeparator || '.');
    let intPart: string = '0.';
    let decPart: string = '0';
    if (valarr.length >= 1)
        intPart = valarr[0];
    if (valarr.length > 1)
        decPart = valarr[1];
    return parseFloat(intPart + '.' + decPart);
}

// export const buildNumberMaskNumber = (val: number, fs?: FormatSettings) => {
//     if (!fs || !val)
//         return '';
//     const strNumber = val.toString()
//     let v = getNumber(strNumber);

//     const build = (int: number, dec: number) => {
//         let m = Math.trunc(int / 3);
//         let r = int % 3;
//         let mask = '';
//         for (let i = 0; i < m; i++)
//             mask = '9'.repeat(3) + (!!mask ? fs.thousandSeparator : '') + mask;
//         if (r > 0)
//             mask = '9'.repeat(r) + (!!mask ? fs.thousandSeparator : '') + mask;
//         if (dec > 0)
//             mask += fs.decimalSeparator + '9'.repeat(fs.decimalCount || 0)
//         return mask;

//     }
//     const decimals = fs.decimalCount || 0;
//     let intPart: string = '0';
//     if (v.length > decimals)
//         intPart = v.substring(0, v.length - decimals);
//     return (strNumber.startsWith('+') ? '+' : '') + (strNumber.startsWith('-') ? '-' : '') + build(intPart.length, decimals);
// }


export const buildNumberMask = (val: string, fs?: FormatSettings) => {
    if (!fs || !val)
        return '';
    let v = getNumber(val);

    const build = (int: number, dec: number) => {
        let m = Math.trunc(int / 3);
        let r = int % 3;
        let mask = '';
        for (let i = 0; i < m; i++)
            mask = '9'.repeat(3) + (!!mask ? fs.thousandSeparator : '') + mask;
        if (r > 0)
            mask = '9'.repeat(r) + (!!mask ? fs.thousandSeparator : '') + mask;
        if (dec > 0)
            mask += fs.decimalSeparator + '9'.repeat(fs.decimalCount || 0)
        return mask;

    }
    const decimals = fs.decimalCount || 0;
    let intPart: string = '0';
    if (v.length > decimals)
        intPart = v.substring(0, v.length - decimals);
    return (val.startsWith('+') ? '+' : '') + (val.startsWith('-') ? '-' : '') + build(intPart.length, decimals);
}

export const replaceOptionArray = (obj: any, key: string, newArr: any[]) => {
    if (!Array.isArray(obj[key]))
        obj[key] = [];
    obj[key].length = 0;
    newArr.forEach((item: any) => {
        obj[key].push(item)
    });
}

export const replaceObjProps = (obj: any, newObj: any) => {
    const oldKeys = Object.keys(obj);
    const newKeys = Object.keys(newObj);

    for (let i = 0; i < oldKeys.length; i++) {
        const prop = oldKeys[i];
        if (newKeys.indexOf(prop) === -1)
            delete obj[prop];
    }
    for (let i = 0; i < newKeys.length; i++) {
        const prop = newKeys[i];
        obj[prop] = newObj[prop];
    }
}

export const compareOptionValue = (val: any, optVal: any, key: string) => {
    if ((!val && !optVal) || (val === optVal))
        return true;
    if (!!optVal && !!val && typeof optVal === 'object') {
        const v = optVal[key];
        if (val === v)
            return true;
    }
    return false;
}


export const getOption = (val: any, options: any[], key: string) => {
    const res = options.filter((i) => i[key] === val);
    if (res.length > 0)
        return res[0];
    return;
}

export const getOptionText = (val: any, options: any[], key: string, textProp: string) => {
    let text = '';
    const res = options.filter((i) => i[key] === val);
    if (res.length > 0)
        text = res[0][textProp];
    if (!text)
        text = val;
    return text;
}

export const buildImageArray = (imgs: any, api: ApiInterface): IImage[] => {
    const arr: IImage[] = [];
    if (Array.isArray(imgs))
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            arr.push({ id: img.Id, source: img.Thumbnail, full: img.URL });
        }
    return arr;
}

export const cloneObj = (obj: any) => {
    if (!obj)
        return obj;
    const ret: any = { ...obj };
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (obj[k] instanceof Date)
            ret[k] = new Date(obj[k]);
        else if (Array.isArray(obj[k]))
            ret[k] = cloneArr(obj[k]);
        else if (typeof obj[k] === 'object' && !React.isValidElement(obj[k])) {
            ret[k] = cloneObj(obj[k]);
        }
    }
    return ret;
}

export const cloneArr = (arr: any): any[] => {
    if (!arr)
        return arr;
    const ret: any[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Date) {
            ret.push(new Date(arr[i]));
        }
        else if (Array.isArray(arr[i])) {
            ret.push(cloneArr(arr[i]));
        }
        else if ((typeof arr[i] === 'object') && !React.isValidElement(arr[i])) {
            ret.push(cloneObj(arr[i]));
        }
        else
            ret.push(arr[i])
    }
    return ret;
}

export const setRoutePath = (r: Route) => {
    if (r.children) {
        r.pathGenerated = true;
        r.path = '';
        return;
    }

    if (!r.pathGenerated) {
        r.path = '/' + (!!r.group ? (r.group + '/') : '') + (r.path || r.name);
        r.label = r.label || r.name;
        r.pathGenerated = true;
    }
}

export const getRoutes = (routes: RouteArray, root?: Route) => {
    routes.forEach((r, index) => {
        if (!root && !!r.children) {
            r.isGroup = true;
            getRoutes(r.children, r)
            return;
        }
        // if (r.name === 'settings') {
        //     console.log(r)
        // }
        r.group = root?.name;
        r.owner = root;
        r.isGroup = false;
        r.children = undefined;
        setRoutePath(r);
        if (!r.readOnly && !r.isGroup) {
            const editRoute = { ...r };
            editRoute.path = editRoute.path + '/:id';
            editRoute.menu = false;
            routes.push(editRoute);
        }
    });
    return routes;
}


export const financial = (value: number) => {
    if (!value)
        return 0;
    return Number.parseFloat(value.toFixed(2));
}

export const fixFloat = (value: number, decimalCount: number = 3) => {
    if (!value)
        return 0;
    return Number.parseFloat(value.toFixed(decimalCount));
}

export const proportional = (total: number, itemTotal: number, value: number) => {
    if (total === 0)
        return 0;
    return itemTotal * value / total;
}

export const secondsToTime = (sec_num: number, ignoreSeconds: boolean, showDays: boolean): string => {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    let minStr = minutes.toString();
    let secStr = seconds.toString();
    if (minutes < 10)
        minStr = "0" + minStr;
    if (seconds < 10)
        secStr = "0" + secStr;
    let result = hours + ':' + minStr;
    if (showDays && hours > 24) {
        let days = Math.floor(hours / 24);
        hours = hours % 24;
        result = days + 'D, ' + hours + ':' + minStr;
    }
    if (!ignoreSeconds)
        result += ':' + secStr;
    return result;
}

export const calculaPrecoTabela = (precoBase: number, tabelaId?: number, percPadraoTabela?: number, tabelas?: any[],) => {
    precoBase = precoBase || 0;
    if (!tabelaId)
        return precoBase;
    const tab = tabelas?.find((t: any) => t.TabelaId === tabelaId);
    if (!tab) {
        if (!percPadraoTabela)
            return precoBase;
        return precoBase + precoBase / 100 * percPadraoTabela;
    }
    if (!tab.Vista)
        return precoBase;
    if (tab.Tipo === 2)
        return tab.Vista;
    return precoBase + precoBase / 100 * tab.Vista;
}

export const calculaLucro = (tipo: number, custo: number, preco: number, adicionais: number) => {
    if (tipo === 3)
        return;
    custo = custo || 0;
    preco = preco || 0;
    if (custo === 0)
        return 100;
    else
        return Utils.round(((preco / custo) - adicionais / 100) * 100 - 100, 2);
}

export const getManifestObj = (appName: string, name: string, account: string) => {
    return {
        short_name: name,
        name: name + " | " + appName,
        icons: [
            {
                src: Config.protocol + '://' + Config.host + "/favicon.svg",
                sizes: "150x150",
                type: "image/svg+xml"
            },
        ],
        start_url: Config.protocol + '://' + account + '.' + Config.host,
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000"
    }
}

export const updateManifest = (manifest_obj: any, manifest_placeholder: string) => {
    const stringManifest = JSON.stringify(manifest_obj);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    const obj = document?.querySelector(`${manifest_placeholder}`);
    obj?.setAttribute("href", manifestURL);
}

export const buildCompany = async (lang: Lang, empresa: Empresa) => {
    let address = buildAddress(empresa.Endereco, empresa.Numero, empresa.Complemento, empresa.Bairro, empresa.CidadeNome, empresa.EstadoSigla, undefined, empresa.CEP);
    let contact = buildContacts(lang, empresa.Telefone1, empresa.Telefone2, empresa.Email);
    let additional = '';
    if (empresa.PaisId === 1058) {
        additional = buildStringLine([
            !empresa.CpfCnpj ? null : 'CNPJ: ' + maskValue(empresa.CpfCnpj, lang.data.masks.cpfcnpj),
            !empresa.InscricaoEstadual ? null : 'Insc. Estadual: ' + empresa.InscricaoEstadual,
        ], ', ');
    }
    let logo = empresa.LogoPNG
    try {

        if (!logo) {
            logo = empresa.LogoURL || '';
            if (!!logo) {
                logo = await convertImage(logo);
                empresa.LogoPNG = logo;
            }
        }
    } catch (err) {
        logo = undefined
    }

    return {
        name: empresa.NomeFantasia || empresa.NomeEmpresa,
        address,
        additional,
        contact,
        logoURL: logo
    } as PDFCompanyInfo;
}


const Utils = {
    getAccount,
    getLinks,
    setCookie,
    getCookie,
    getStorage,
    setStorage,
    removeCookie,
    setPermissions,
    getFormatSettings,
    formatDataset,
    formatStr,
    formatValue,
    getOptionLangText,
    formatDateTime,
    secondsToTime,
    formatNumber,
    formatNumberLang,
    getField,
    //getValidationSchema,
    getNumber,
    getDigits,
    getPhoneDigits,
    getPhoneMask,
    getPhoneValue,
    doMaskPhone,
    unmask,
    getMask,
    round,
    roundEx,
    fixNumber,
    fixedNumber,
    financial,
    fixFloat,
    proportional,
    parseNumber,
    parseNumberEx,
    buildNumberMask,
    // buildNumberMaskNumber,
    replaceOptionArray,
    replaceObjProps,
    compareOptionValue,
    getOption,
    getOptionText,
    buildImageArray,
    cloneObj,
    cloneArr,
    setRoutePath,
    getRoutes,
    calculaPrecoTabela,
    calculaLucro,
    updateManifest,
    getManifestObj,
}

export default Utils;