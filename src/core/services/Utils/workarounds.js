const getPropValue = (obj, key) => {
    if (!obj)
        return;
    return obj[key];
}

const setPropValue = (obj, key, value, ignoreModified) => {
    if (value === undefined || value === null) {
        delete obj[key];
        return;
    }
    obj[key] = value;
    if (!!ignoreModified)
        return;
    obj.$__modified = true;
}

const comp = (a, b) => {
    // eslint-disable-next-line eqeqeq
    return (a == b);
}

const cloneArr = (arr) => {
    return arr.map((i) => ({ ...i }));
}

const getPropValueEx = (obj, key) => {
    if (!obj || typeof obj !== 'object')
        return;
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (k.toLowerCase() === key.toLowerCase())
            return obj[k];
    }
}

const convertImage = async (url, format) => {
    if (!format)
        format = 'png';
    const file = await (await fetch(url)).blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const image = new Image();
            image.src = event.target.result;
            image.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0);
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    resolve(url);
                }, `image/${format}`);
            };
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
  };

export { getPropValue, getPropValueEx, setPropValue, comp, cloneArr, convertImage }