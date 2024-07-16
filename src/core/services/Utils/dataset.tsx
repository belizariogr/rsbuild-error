import { Names } from "../IconList";

export const getIconOptions = (records: any[], optionIcon: string) => {
    records.forEach((r) => {
        const iconName = r[optionIcon];
        r[optionIcon] = Names.indexOf(iconName);
    });
    return records;
}

export const buildOptions = (records: any[], buildFunc: (opt: any) => any) => {
    const options: any[] = [];
    records.forEach((r) => {
        const opt = buildFunc(r);
        if (!!opt)
            options.push(opt);
    })
    return options;
}

export const getFieldValue = (record: any, fieldName: string): any => {
    if (typeof record !== 'object')
        return undefined;
    const f = Object.keys(record).find(k => k.toLowerCase() === fieldName.toLowerCase());
    if (!f)
        return undefined;
    return record[f];
}

export const removeFieldFromConditions = (conditions: string, fields: string[]) => {
    let conds = (conditions || '').split('&').map(c => {
        const ci = c.split('=');
        return { field: ci[0], value: ci[1] };
    });

    for (let i = 0; i < fields.length; i++) {
        const f = fields[i];
        const condId = conds.findIndex(c => c.field === f);
        if (condId !== -1) {
            conds.splice(condId, 1);
        }
    }

    return conds.map((c, i) => c.field + '=' + c.value).join('&');
}

// export const deleteRecords = (deleteData: any[], dataset: any[]) => {
//     for (let i = dataset.length - 1; i >= 0; i--) {
//         const rec = dataset[i];
//         const del = deleteData.find(d => {
//             const keys = Object.keys(d);
//             for (let k = 0; k < keys.length; k++) {
//                 const prop = keys[k];
//                 if (rec[prop] !== d[prop])
//                     return false;
//             }
//             return true;
//         });

//         if (!!del)
//             dataset.splice(i, 1);
//     }
// }