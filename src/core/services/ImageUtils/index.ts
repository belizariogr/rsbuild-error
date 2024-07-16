import Compressor from "compressorjs";

export type ResizeParams = {
    file: File | Blob, size?: number, thumbSize?: number
}

export const doResizeAndCompress = async ({ file, size }: ResizeParams) => {
    return await new Promise<File | Blob>((resolve, reject) => {
        new Compressor(file, {
            quality: 0.75,
            resize: 'contain',
            maxWidth: size,
            maxHeight: size,
            mimeType: 'image/jpeg',
            beforeDraw(context, canvas) {
                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
            },
            success(file) {
                resolve(file)
            },
            error(error) {
                reject(error)
            },
        })
    });
}

export const doResize = async ({ file, size }: ResizeParams) => {
    return await new Promise<File | Blob>((resolve, reject) => {
        new Compressor(file, {
            quality: 0.75,
            resize: 'contain',
            maxWidth: size,
            maxHeight: size,
            success(file) {
                resolve(file)
            },
            error(error) {
                reject(error)
            },
        })
    });
}

export const resizeAndCreateThumbnail = async ({ file, size, thumbSize }: ResizeParams) => {
    const normal = await doResize({ file, size });
    const thumbnail = await doResize({ file, size: thumbSize || size });
    return { normal, thumbnail };
}