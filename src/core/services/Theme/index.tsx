import { createContext, useContext } from 'react';
import { ThemeList } from '../../../themes';
import { ThemeContextType } from './types';


const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeContext, ThemeList };