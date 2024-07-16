export const tokens = {
    '0': { pattern: /\d/, _default: '0' },
    '9': { pattern: /\d/, optional: true },
    'A': { pattern: /[a-zA-Z0-9]/ },
    'S': { pattern: /[a-zA-Z]/ },
    'U': { pattern: /[a-zA-Z]/, transform: (c) => c.toLocaleUpperCase() },
    'L': { pattern: /[a-zA-Z]/, transform: (c) => c.toLocaleLowerCase() },
    'C': {}
};

export const MaskString = (value, mask, options) => {
    return doMask(value, mask, options || {})
}

export const patternCount = (mask) => {
    let count = 0
    for (let i = 0; i < mask.length; i++) {
        const t = mask.charAt(i);
        const token = tokens[t];
        if (!!token)
            count++;
    }
    return count;
}

const doMask = (value, mask, options) => {
    if (mask === '')
        return value + '';
    if (value === undefined || value === null || value === '')
        return '';
    let val = value + '';
    let formatted = '';
    for (let i = 0; i < mask.length; i++) {
        if (val.length === 0)
            break;
        const t = mask.charAt(i);
        const token = tokens[t];
        if (!token)
            formatted += t;
        else {
            const pattern = tokens[t].pattern;
            let c = val.charAt(0);
            val = val.substring(1);
            if (!pattern)
                formatted += c
            else if (pattern.test(c))
                formatted += c;
        }
    }
    return formatted;
}