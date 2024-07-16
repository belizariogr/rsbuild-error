import { createContext, useContext } from 'react';
import { Lang, LangContextType } from './types';
import { CountryLang, LangList } from '../../../lang';
import { getPropValue } from '../Utils/workarounds';

const LangContext = createContext<LangContextType>({} as LangContextType);
const useLang = () => useContext(LangContext);

const getModuleDefs = (lang: Lang, group: string, module: string): any => {
    let obj: any;
    if (!!group) {
        obj = getPropValue(lang.modules, group);
        if (!obj)
            return
        obj = getPropValue(obj, module);
    }
    else
        obj = getPropValue(lang.modules, module);
    return obj;
}

const getModuleLabel = (lang: Lang, group: string, module: string, def: string, singular?: boolean): string => {
    let obj: any;
    if (!!group) {
        obj = getPropValue(lang.modules, group);
        if (!obj) return def || module;
        obj = getPropValue(obj, module);
    }
    else
        obj = getPropValue(lang.modules, module);
    if (!obj) return def;
    if (singular) {
        let sing: string = getPropValue(obj, 'singular');
        if (!!sing) return sing;
    }
    let name: string = getPropValue(obj, 'name');
    if (!name) return def;
    return name;
}

const getFieldLabel = (lang: Lang, group: string, module: string, field: string, def?: string): string => {
    let obj: any;
    if (!!group) {
        obj = lang.modules[group];
        if (!obj) return def !== undefined ? def : module;
        obj = obj[module];
    }
    else
        obj = lang.modules[module];
    if (!obj) return def !== undefined ? def : field;
    let fields = obj.fields;
    if (!fields) return def !== undefined ? def : field;
    let f: any = fields[field];
    if (!f) return def !== undefined ? def : field;

    if (typeof f === 'object')
        return f.name || def || field;
    return f;
}

const getFieldOptionText = (lang: Lang, group: string, module: string, field: string, key: any, def: string): string => {
    let obj: any;
    if (!!group) {
        obj = lang.modules[group];
        if (!obj) return def;
        obj = obj[module];
    }
    else
        obj = lang.modules[module];
    if (!obj) return def;
    let fields = obj.fields;
    if (!fields) return def;

    let f = fields[field];
    if (!f) return def;

    if (typeof f !== 'object')
        return def;
    let options = f.options;
    if (!options) return def;

    let text: string = options[key];
    if (!text) return def;
    return text;
}

const getFilterLabel = (lang: Lang, group: string, module: string, filter: string,  field: string, def: string) => {
    let obj: any;
    if (!!group) {
        obj = lang.modules[group];
        if (!obj) return def;
        obj = obj[module];
    }
    else
        obj = lang.modules[module];

    let fieldLabel = getFieldLabel(lang, group, module, field, def);
    if (!obj) return fieldLabel;
    let filters = obj.filters;
    if (!filters) return fieldLabel;

    let f = filters[filter];
    if (!f) return fieldLabel;

    if (typeof f === 'string')
        return f;
    return f.name || fieldLabel;
}

const getFilterOptionText = (lang: Lang, group: string, module: string, filter: string, key: any, def: string) => {
    let obj: any;
    if (!!group) {
        obj = lang.modules[group];
        if (!obj) return def;
        obj = obj[module];
    }
    else
        obj = lang.modules[module];
    if (!obj) return def;
    let filters = obj.filters;
    if (!filters) filters = obj.fields;

    if (!filters) return def;

    let f = filters[filter];
    if (!f) return def;

    if (typeof f !== 'object')
        return def;
    let options = f.options;
    if (!options) return def;

    let text: string = options[key];
    if (!text) return ;
    return text;
}

export const getLangByCountry = (countryId: number) => {
    if (!countryId)
        return;
    return CountryLang[countryId];
    // const lang = LangList.find((l) => {
    //     const c = l.countries.find((id: number) => id === countryId);
    //     return !!c;
    // })
    // return lang;
}

export const getLocales = () => {
    const locales: any = {};
    for (let i = 0; i < LangList.length; i++) {
        const l = LangList[i];
        locales[l.data.localeCode] = l.locale;
    }
    return locales;
}


export { useLang, LangContext, LangList, getModuleDefs, getModuleLabel, getFieldLabel, getFieldOptionText, getFilterLabel, getFilterOptionText };