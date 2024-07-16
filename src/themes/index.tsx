import { BGTheme } from '../core/services/Theme/types';

import light from './light';
import { ReactComponent as LightLogo } from './light/logo.svg';
import dark from './dark';
import { ReactComponent as DarkLogo } from './dark/logo.svg';

export const ThemeList: BGTheme[] = [
    { name: 'light', theme: light, logo: <LightLogo /> },
    { name: 'dark', theme: dark, logo: <DarkLogo /> }
];

export const Themes = {
    light: ThemeList[0],
    dark: ThemeList[1]
}

export default Themes;