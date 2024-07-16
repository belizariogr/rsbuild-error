import { Buffer } from 'buffer';
import Utils, { doMaskPhone } from '.';
import { Lang } from '../Lang/types';

// export const lpad = (str: string, padString: string, length: number) => {
//     while (str.length < length)
//         str = padString + str;
//     return str;
// }

export const lpad = (str: string, padString: string, length: number) => {
    if (str.length >= length)
        return str;
    const fullStr = padString.repeat(length) + str;
    return fullStr.slice(-length);
}

export const lpadEx = (str: string, padString: string, length: number) => {
    const fullStr = padString.repeat(length) + str;
    return fullStr.slice(-length);
}


export const rpad = (str: string, padString: string, length: number) => {
    while (str.length < length)
        str += padString;
    return str;
}

export const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const generateUUID = () => { // Public Domain/MIT
    let d = new Date().getTime(); // Timestamp
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; // Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16; // random number between 0 and 16
        if (d > 0) { // Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { // Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
}

export const treatAddressPart = (str?: string, last?: boolean) => {
    const s = (str || "").trim();
    if (!s)
        return '';
    return s + ', '
}

export const buildAddress = (street?: string, numb?: string, complement?: string, neighborhood?: string, city?: string, state?: string, country?: string, zip?: string) => {
    let addr = (treatAddressPart(street) + treatAddressPart(numb) + treatAddressPart(complement) + treatAddressPart(neighborhood) + treatAddressPart(city) + treatAddressPart(state) + treatAddressPart(country) + treatAddressPart(zip)).trim();
    if (addr.charAt(addr.length - 1) === ',') {
        addr = addr.slice(0, -1);
    }
    return addr;
}

export const buildContacts = (lang: Lang, phone1?: string, phone2?: string, email?: string, ) => {
    let treatedEmail = email || '';
    if (treatedEmail.includes(',')) {
        treatedEmail = treatedEmail.split(',').join(', ');
    }

    return buildStringLine([
        !phone1 ? null : lang.data.captions.phone + ': ' + doMaskPhone(phone1, lang),
        !phone2 ? null : lang.data.captions.phone + ': ' + doMaskPhone(phone2, lang),
        !treatedEmail ? null : lang.data.captions.email + ': ' + treatedEmail,
    ], ', ');
}


export const buildStringLine = (list: (string | undefined | null)[], separator: string = ','): string => {
    const noEmpty = list.filter(s => !!s);
    if (!noEmpty.length)
        return '';

    return noEmpty.join(separator)
}

export const validateEmail = (email: string) => {
    if (!email.trim())
        return
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const maskVersao = (value: number) => {
    if (!value)
        return;
    const text = value.toString();
    const verMaior: number = parseInt(text.substring(0, 1)) || 1;
    const verMenor: number = parseInt(text.substring(1, 2)) || 0;
    const Ano: number = parseInt(text.substring(2, 4)) || 0;
    const Mes: number = parseInt(text.substring(4, 6)) || 0;
    const Dia: number = parseInt(text.substring(6, 8)) || 0;
    const Sub: number = parseInt(text.substring(8)) || 0;
    return verMaior.toString() + '.' + verMenor.toString() + '.' + Ano.toString() + '.' + Mes.toString() + '.' + Dia.toString() + '.' + Sub.toString();
}

export const strToBase64Ex = (str: string) => {
    return new Buffer(str).toString('base64').replaceAll('=', '');
}


export const getWeightBarcode = (barcode: string) => {
    // a ser implementado
}

export const escapeHttpStr = (str: string) => {
    return encodeURIComponent(str.trim());
}

export const htmlToStr = (str: string) => {
    const regex = /(<([^>]+)>)/gi;
    return str.trim()
        .replaceAll('<br>', '\n')
        .replaceAll('<br/>', '\n')
        .replaceAll('<br />', '\n')
        .replaceAll('</p>', '\n')
        .replace(regex, '')
}

export interface BarcodeInfo {
    id: string;
    idType: string;
    quantity: number;
    unit?: string;
    serial?: string;
    date?: Date;
}

type BatchFieldType = 'Product.Id' | 'Product.TraceCode' | 'Day' | 'Month' | 'Year' | 'Sequential' | 'Text' | 'none';
export interface BatchField {
    kind: BatchFieldType
    size: number
    value: string,
}

const getBatchFieldType = (type: string): BatchFieldType => {
    switch (type) {
        case 'P':
            return 'Product.Id'
        case 'T':
        case 'R':
            return 'Product.TraceCode'
        case 'D':
            return 'Day'
        case 'M':
            return 'Month'
        case 'A':
        case 'Y':
            return 'Year'
        case 'S':
            return 'Sequential'
        case '"':
            return 'Text'
        default:
            return 'none';
    }
}

export const getBatchMaskInfo = (mask: string): BatchField[] => {
    const ret: BatchField[] = [];
    let isText = false;
    for (let i = 0; i < mask.length; i++) {
        let f: BatchField = ret[ret.length - 1];
        if (!f) {
            f = { kind: 'none', size: 0, value: '' };
        }
        const token = mask.charAt(i);
        const kind = getBatchFieldType(token);
        if (isText) {
            if (kind === 'Text') {
                isText = false;
                continue;
            }
            f.value += token;
            f.size++;
            continue;
        }
        if (kind === 'none') {
            throw new Error("Invalid batch mask.");
        }

        if (kind !== f.kind) {
            f = { kind, size: 1, value: '' };
            ret.push(f);
            if (f.kind === 'Text') {
                f.size = 0;
                isText = true;
            }
        } else {
            f.size++;
        }
    }

    if (isText) {
        throw new Error("Invalid batch mask.");
    }

    return ret;
}

export const createBatch = (mask: string, productId: number, traceCode: string, sequential: number, productionId: number, date: Date): string => {
    const info = getBatchMaskInfo(mask);

    const seq = sequential;
    const Y = lpad(date.getFullYear().toString(), '0', 4);
    const M = lpad((date.getMonth() + 1).toString(), '0', 2);
    const D = lpad(date.getDate().toString(), '0', 2);

    let ret = '';
    for (let i = 0; i < info.length; i++) {
        const f = info[i];
        switch (f.kind) {
            case 'Product.Id':
                ret += lpadEx(productId.toString(), '0', f.size);
                break;
            case 'Product.TraceCode':
                ret += lpadEx(traceCode, '0', f.size);
                break;
            case 'Sequential':
                ret += lpadEx(seq.toString(), '0', f.size);
                break;
            case 'Text':
                ret += f.value;
                break;
            case 'Year':
                ret += lpadEx(Y, '0', f.size);
                break;
            case 'Month':
                ret += lpadEx(M, '0', f.size);
                break;
            case 'Day':
                ret += lpadEx(D, '0', f.size);
                break;
        }
    }

    return ret;
}

export type BGURLParams = { [key: string]: string };

export const getURLParams = (param?: string) => {
    if (!param)
        return {};
    const params: BGURLParams = {};
    const rawParams = param.split('&');
    for (let i = 0; i < rawParams.length; i++) {
        const p = rawParams[i].split('=');
        params[p[0]] = p[1];
    }
    return params;
}

export const addToURLParam = (params: BGURLParams, name: string, value: string) => {
    const p = params[name];
    if (!p) {
        params[name] = value;
        return params
    }
    params[name] += '|' + value;
    return params
}

export const buildURLParams = (params: BGURLParams) => {
    const k = Object.keys(params);
    return k.map(k => k + '=' + params[k]).join('&')
}
export const removeDiacritics = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const removeSpecial = (str: string) => {
    return str.replace(/[^a-zA-Z0-9 ]/g, "");
}

export const strToBase64Uint8Array = (str: string) => {
    const padding = '='.repeat((4 - (str.length % 4)) % 4);
    const base64 = (str + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const output = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
        output[i] = rawData.charCodeAt(i);
    }
    return output;
}

export const fileToBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string' && result.includes(',')) {
                return resolve(result.split(',')[1])
            }
            resolve(result)
        }
        reader.onerror = reject;
    })
}

export const getFileExtension = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
}

export const changeFileExtension = (fileName: string, newExtension: string) => {
    const i = fileName.lastIndexOf('.');
    return fileName.substring(0, i) + newExtension;
}
