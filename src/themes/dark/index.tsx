import { createTheme } from '@material-ui/core';
import { CustomTheme } from '../../core/services/Theme/types';
import { ReactComponent as LogoSvg } from './logo.svg';

export const Logo = <LogoSvg />;

const base = createTheme({

});

const theme: CustomTheme = {
    logo: {
        backgroundColor: 'hsl(210, 14%, 7%)',
        color: 'rgb(56, 142, 60)',
        tag: {
            backgroundColor: '#4782da',
            textColor: 'rgba(255, 255, 255, 0.85)',
        }
    },
    SideBar: {
        background: 'hsl(210, 14%, 7%)',
        subItemsBackgroundColor: 'rgba(0, 0, 0, 0.08)',
        borderColor: 'hsl(210, 14%, 13%)',
        hoverBackground: 'hsla(210, 100%, 23%, 0.1)',
        hoverBorder: 'hsla(210, 100%, 30%, 0.4)',
        selectedBackground: 'hsla(210, 100%, 30%, 0.2)',
        selectedBorder: 'hsl(210, 100%, 38%)',
    },
    navbar: {
        backgroundColor: 'hsl(210, 14%, 7%)',
        textColor: 'rgba(255, 255, 255, 0.85)',
    },
    others: {
        iconColor: '#aaa',
        tagIconColor: '#555',
        borderColor: 'hsl(210, 14%, 13%)',
        positiveValue: 'lime',
        positiveBackground: 'rgb(0, 255, 0, 0.05)',
        negativeValue: '#f44336',
        negativeBackground: 'rgb(244, 67, 54, 0.05)',
        green: '#388E3C',
        blue: '#2196F3',
        red: '#F44336',
        organge: '#FFA000',
        purple: 'rgba(119, 93, 208, 0.85)',
        gray: '#616161',
        secondaryHightlightColor: '#2b4d80',
        hoverColor: 'hsla(210, 14%, 7%, 0.6)',
    },
    ...base
};

export default theme;