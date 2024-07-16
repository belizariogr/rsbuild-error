import { endOfWeek, startOfWeek } from "date-fns";
import { Lang } from "../Lang/types";
import { lpad } from "./strings";

export const _isInteger = (val: string) => {
    const s = val.replace(/\d/g, '');
    return s.length === 0;
}

const LZ = (x: number): string => {
    return (x < 0 || x > 9 ? "" : "0") + x.toString()
}

const _getInt = (str: string, i: number, minlength: number, maxlength: number): string => {
    for (let x = maxlength; x >= minlength; x--) {
        let token = str.substring(i, i + x);
        if (token.length < minlength)
            return '';
        if (_isInteger(token))
            return token;
    }
    return '';
}

type IDateValues = {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export const getDateFromFormat = (val: string, format: string): Date | undefined => {
    const v = getDateValues(val, format);
    if (!v)
        return;
    const { year, month, day, hours, minutes, seconds, milliseconds } = v;
    let d = new Date('2000-01-02');
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(day);
    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);
    d.setMilliseconds(milliseconds);
    return d;
}

export const getUTCDateFromFormat = (val: string, format: string): Date | undefined => {
    const v = getDateValues(val, format);
    if (!v)
        return;
    const { year, month, day, hours, minutes, seconds, milliseconds } = v;
    let d = new Date('2000-01-02');
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(day);
    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);
    d.setMilliseconds(milliseconds);
    const offset = d.getTimezoneOffset();
    const time = d.getTime();
    d.setTime(time + offset * 1000 * 60);
    return d;
}



export const getDateValues = (val: string, format: string): IDateValues | undefined => {
    let i_val = 0;
    let i_format = 0;
    let c = "";
    let token = "";
    let x, y;
    let now = new Date();

    let yearStr = '';
    let year = now.getFullYear();

    let monthStr = '';
    let month = now.getMonth() + 1;

    let dayStr = '';
    let day = 1;

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    let hhStr = '';
    let mmStr = '';
    let ssStr = '';

    let ampm = "";
    while (i_format < format.length) {
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) === c) && (i_format < format.length))
            token += format.charAt(i_format++);
        if (token === "yyyy" || token === "yy" || token === "y") {
            if (token === "yyyy") {
                x = 4;
                y = 4;
            }
            if (token === "yy") {
                x = 2;
                y = 2;
            }
            if (token === "y") {
                x = 2;
                y = 4;
            }
            yearStr = _getInt(val, i_val, x || 0, y || 0);
            if (yearStr === '')
                return;
            i_val += yearStr.length;
            year = Number.parseInt(yearStr);
            if (yearStr.length === 2) {
                if (year > 70) {
                    year = 1900 + year;
                } else {
                    year = 2000 + year;
                }
            }
        } else if (token === "MMM" || token === "NNN") {
            return;
            // month = 0;
            // for (let i = 0; i < lang.data.dates.months.length; i++) {
            //     const month_name = lang.data.dates.months[i];
            //     if (val.substring(i_val, i_val + month_name.length).toLowerCase() === month_name.toLowerCase()) {
            //         if (token === "MMM" || (token === "NNN" && i > 11)) {
            //             month = i + 1;
            //             if (month > 12) {
            //                 month -= 12;
            //             }
            //             i_val += month_name.length;
            //             break;
            //         }
            //     }
            // }
            // if ((month < 1) || (month > 12)) {
            //     return;
            // }
            // } else if (token === "EE" || token === "E") {
            //     for (let i = 0; i < lang.data.dates.days.length; i++) {
            //         const day_name = lang.data.dates.days[i];
            //         if (val.substring(i_val, i_val + day_name.length).toLowerCase() === day_name.toLowerCase()) {
            //             i_val += day_name.length;
            //             break;
            //         }
            //     }
        } else if (token === "MM" || token === "M") {
            monthStr = _getInt(val, i_val, token.length, 2);
            if (!monthStr)
                return;
            month = Number.parseInt(monthStr);
            if ((month < 1) || (month > 12))
                return;
            i_val += monthStr.length;
        } else if (token === "dd" || token === "d") {
            dayStr = _getInt(val, i_val, token.length, 2);
            if (!dayStr)
                return;
            day = Number.parseInt(dayStr);
            if ((day < 1) || (day > 31))
                return;
            i_val += dayStr.length;
        } else if (token === "hh" || token === "h") {
            hhStr = _getInt(val, i_val, token.length, 2);
            if (!hhStr)
                return;
            hours = Number.parseInt(hhStr);
            if ((hours < 1) || (hours > 12))
                return;
            i_val += hhStr.length;
        } else if (token === "HH" || token === "H") {
            hhStr = _getInt(val, i_val, token.length, 2);
            if (!hhStr)
                return;
            hours = Number.parseInt(hhStr);
            if ((hours < 0) || (hours > 23))
                return;
            i_val += hhStr.length;
        } else if (token === "kk" || token === "k") {
            hhStr = _getInt(val, i_val, token.length, 2);
            if (!hhStr)
                return;
            hours = Number.parseInt(hhStr);
            if ((hours < 0) || (hours > 11))
                return;
            i_val += hhStr.length;
        } else if (token === "KK" || token === "k") {
            hhStr = _getInt(val, i_val, token.length, 2);
            if (!hhStr)
                return;
            hours = Number.parseInt(hhStr);
            if ((hours < 1) || (hours > 24))
                return;
            i_val += hhStr.length;
            hours--;
        } else if (token === "mm" || token === "m") {
            mmStr = _getInt(val, i_val, token.length, 2);
            if (!mmStr)
                return;
            minutes = Number.parseInt(mmStr);
            if ((minutes < 0) || (minutes > 59))
                return;
            i_val += mmStr.length;
        } else if (token === "ss" || token === "s") {
            ssStr = _getInt(val, i_val, token.length, 2);
            if (!ssStr)
                return;
            seconds = Number.parseInt(ssStr);
            if ((seconds < 0) || (seconds > 59))
                return;
            i_val += ssStr.length;
        } else if (token === "a") {
            if (val.substring(i_val, i_val + 2).toLowerCase() === "am")
                ampm = "AM";
            else if (val.substring(i_val, i_val + 2).toLowerCase() === "pm")
                ampm = "PM";
            else
                return;
            i_val += 2;
        } else {
            if (val.substring(i_val, i_val + token.length) !== token)
                return;
            else
                i_val += token.length;
        }
    }
    if (i_val !== val.length) {
        return;
    }
    if (month === 2) {
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            if (day > 29) {
                return;
            }
        } else {
            if (day > 28) {
                return;
            }
        }
    }
    if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
        if (day > 30) {
            return;
        }
    }
    if (hours < 12 && ampm === "PM") {
        hours = hours - 0 + 12;
    } else if (hours > 11 && ampm === "AM") {
        hours -= 12;
    }


    return { year, month, day, hours, minutes, seconds, milliseconds: 0 };
}


export const isDate = (val: string, format: string): boolean => !!getDateFromFormat(val, format);

export const parseDate = (val: string, format: string): Date | undefined => {
    if (!val)
        return;
    if (val.length > format.length)
        val = val.substring(0, format.length);
    return getDateFromFormat(val, format);
}

export const parseISODate = (val: string): Date | undefined => {
    const format = 'yyyy-MM-dd';
    if (!val)
        return;
    if (val.length > format.length)
        val = val.substring(0, format.length);
    return getDateFromFormat(val, format);
}


export const parseUTCDate = (val: string, format: string): Date | undefined => {
    if (!val)
        return;
    if (val.length > format.length)
        val = val.substring(0, format.length);
    return getUTCDateFromFormat(val, format);
}

export const parseISOUTCDate = (val: string): Date | undefined => {
    const format = 'yyyy-MM-dd';
    if (!val)
        return;
    if (val.length > format.length)
        val = val.substring(0, format.length);
    return getUTCDateFromFormat(val, format);
}

export const getDateOnly = (d: Date) => {
    if (!(d instanceof Date))
        d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

export const getToday = () => {
    let d = new Date();
    return getDateOnly(d);
}

export const getEndOfTheDay = (d: Date) => {
    if (!(d instanceof Date))
        d = new Date();
    d.setHours(23, 59, 59, 0);
    return d;
}

export const getUTCDate = (y: number, m: number, dd: number, hh?: number, mm?: number, ss?: number, mmm?: number): Date => {
    const d = new Date();
    d.setUTCFullYear(y);
    d.setUTCMonth(m - 1);
    d.setUTCDate(dd);
    d.setUTCHours(hh || 0);
    d.setUTCMinutes(mm || 0);
    d.setUTCSeconds(ss || 0);
    d.setUTCMilliseconds(mmm || 0);
    return d;
}

export const getLocalDate = (y: number, m: number, dd: number, hh?: number, mm?: number, ss?: number, mmm?: number): Date => {
    const d = new Date(946857600000);
    d.setFullYear(y);
    d.setMonth(m - 1);
    d.setDate(dd);
    d.setHours(hh || 0);
    d.setMinutes(mm || 0);
    d.setSeconds(ss || 0);
    d.setMilliseconds(mmm || 0);
    return d;
}

export const firstDayOfMonth = (date?: Date) => {
    if (!date)
        date = new Date();
    const d = getLocalDate(date.getFullYear(), date.getMonth() + 1, 1);
    d.setHours(0, 0, 0, 0);
    return d;
}

export const lastDayOfMonth = (date?: Date) => {
    if (!date)
        date = new Date();
    const d = getLocalDate(date.getFullYear(), date.getMonth() + 1, 1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(d.getDate() - 1);
    d.setHours(23, 59, 59, 0);
    return d;
}

export const firstDayOfWeek = (date?: Date) => {
    if (!date)
        date = new Date();
    return startOfWeek(date);
}

export const lastDayOfWeek = (date?: Date) => {
    if (!date)
        date = new Date();
    return endOfWeek(date);
}

export const formatDateTime = (date: Date | null | undefined, format: string, lang?: Lang, isDate?: boolean): string => {
    if (!date)
        return "";
    let formattedDate = new Date(date);
    if (isDate) {
        formattedDate.setTime(formattedDate.getTime() + formattedDate.getTimezoneOffset() * 1000 * 60);
    }
    let result = "";
    let i_format = 0;
    let c = "";
    let token = "";
    let y = formattedDate.getFullYear();
    let M = formattedDate.getMonth() + 1;
    let d = formattedDate.getDate();
    let E = formattedDate.getDay();
    let H = formattedDate.getHours();
    let m = formattedDate.getMinutes();
    let s = formattedDate.getSeconds();
    // let yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
    let value: any = {};
    value["y"] = y.toString();
    value["yyyy"] = value["y"];
    value["yy"] = value["y"].substring(2, 4);
    value["M"] = M.toString();
    value["MM"] = LZ(M);
    if (!!lang) {
        value["MMM"] = lang.data.dates.months[M - 1];
        value["NNN"] = lang.data.dates.months[M + 11];
        value["E"] = lang.data.dates.days[E + 7];
        value["EE"] = lang.data.dates.days[E];
    }
    value["d"] = d.toString();
    value["dd"] = LZ(d);
    value["H"] = H.toString();
    value["HH"] = LZ(H);
    if (H === 0)
        value["h"] = '12';
    else if (H > 12)
        value["h"] = (H - 12).toString();
    else
        value["h"] = H.toString();
    value["hh"] = LZ(H);
    if (H > 11)
        value["K"] = (H - 12).toString();
    else
        value["K"] = H.toString();
    value["k"] = (H + 1).toString();
    value["KK"] = LZ(value["K"]);
    value["kk"] = LZ(value["k"]);
    if (H > 11)
        value["a"] = "pm";
    else
        value["a"] = "am";
    value["m"] = m.toString();
    value["mm"] = LZ(m);
    value["s"] = s.toString();
    value["ss"] = LZ(s);
    if (value["h"] < 10)
        value["h"] = '0' + value["h"];
    let nextLitteral = false;
    while (i_format < format.length) {
        c = format.charAt(i_format);
        if (nextLitteral) {
            result += c;
            i_format++;
            nextLitteral = false;
        } else if (c === '\\') {
            nextLitteral = true;
            i_format++;

        } else {
            token = "";
            while ((format.charAt(i_format) === c) && (i_format < format.length)) {
                token += format.charAt(i_format++);
            }
            if (!!value[token])
                result += value[token];
            else
                result += token;
        }

    }
    return result;
}

export const DateToUTCDate = (date: Date): string => {
    if (!(date instanceof Date))
        return '';
    return date.toISOString().slice(0, 10);
}

export const DateToStr = (date: Date): string => {
    return DateToStrEx(date);
}

export const DateToStrEx = (date: Date): string => {
    if (!(date instanceof Date))
        return '';
    return lpad(date.getFullYear().toString(), '0', 4) + '-' +
           lpad((date.getMonth() + 1).toString(), '0', 2) + '-' +
           lpad(date.getDate().toString(), '0', 2);
    // return ('0000' + date.getFullYear().toString()).slice(-4) + '-' + ('00' + (date.getMonth() + 1).toString()).slice(-2) + '-' + ('00' + date.getDate()).slice(-2);
}


export const getDate = (date: Date) => {
    const d = new Date(date);
    d.setUTCHours(0);
    d.setUTCMinutes(0);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);
    return d;
}

export const getMonth = (d: Date, lang: Lang) => {
    return lang.data.formats.monthOfYear.replace('MMMM', lang.data.dates.months[d.getMonth()]).replace('YYYY', d.getFullYear().toString());
}

export const addDays = (d: Date | undefined, days: number): Date => {
    let date: any;
    if (!!d)
        date = new Date(d);
    else
        date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

export const dateDiff = (d1: Date, d2: Date) => {
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}