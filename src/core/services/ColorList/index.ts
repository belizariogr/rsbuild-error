export const Colors = [
    '#4A148C', '#7B1FA2', '#9C27B0', '#BA68C8', '#E1BEE7',
    '#B71C1C', '#D32F2F', '#F44336', '#E57373', '#FFCDD2',
    '#FF6F00', '#FFA000', '#FFC107', '#FFD54F', '#FFECB3',
    '#1B5E20', '#388E3C', '#4CAF50', '#81C784', '#C8E6C9',
    '#0D47A1', '#1976D2', '#2196F3', '#64B5F6', '#BBDEFB',
    '#212121', '#616161', '#9E9E9E', '#E0E0E0', '#F5F5F5',
]

export const colCount = 5;
export const borderContrastColor = '#888';
export const lightContrastColor = '#666';
export const darkContrastColor = '#fff';

export const getBorderColor = (color: string): string => {
    if (isLighterColor(color))
        return borderContrastColor;
    return color;
}

export const getContrastColor = (color: string): string => {
    if (isDarkColor(color))
        return darkContrastColor
    return lightContrastColor;
}

export const getColorColumn = (color: string) => {
    const idx = Colors.indexOf(color);
    return Colors.filter((color, i) => ((i + 1) % colCount) === ((idx + 1) % colCount));
}

export const getLuma = (color: string) => {
    if (!color)
        return 0;
    const c = color.substring(1);      // strip #
    const rgb = parseInt(c, 16);   // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff;  // extract red
    const g = (rgb >> 8) & 0xff;  // extract green
    const b = (rgb >> 0) & 0xff;  // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}

export const isDarkColor = (color: string) => getLuma(color) <= 170;
export const isLighterColor = (color: string) => getLuma(color) >= 200;

const ColorList = {
    Colors,
    colCount,
    borderContrastColor,
    lightContrastColor,
    darkContrastColor,
    getBorderColor,
    getContrastColor,
    getColorColumn,
    getLuma,
    isDarkColor,
};

export default ColorList;