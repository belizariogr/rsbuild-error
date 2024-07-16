import { createTheme } from '@material-ui/core';
import { CustomTheme } from '../../core/services/Theme/types';
import { ReactComponent as LogoSvg } from './logo.svg';

export const Logo = <LogoSvg />;

const base = createTheme({
    palette: {
        background: {
            default: '#F4F6F8',
            paper: 'white',
        },
        primary: {
            contrastText: '#ffffff',
            main: '#4782da',
        },
        secondary: {
            contrastText: '#fff',
            main: 'rgb(56, 142, 60)'
        },
        text: {
            primary: '#333',
            secondary: '#6b778c'
        },

        // action :{
        //     selected: 'hsla(210, 100%, 30%, 0.2)',
        //     hover: 'hsla(210, 100%, 30%, 0.2)',
        //     disabledBackground: 'rgba(0, 0, 0, 0.1)',
        // },
    },
    overrides: {
        MuiDrawer: {
            paperAnchorLeft: {
                width: 256
            },
            paperAnchorDockedLeft: {
                borderRight: 'none',
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 0,
                marginRight: 8
            }
        },
        MuiInputBase: {
            root: {
                fontSize: '0.85rem'
            }
        },
        MuiInputLabel: {
            root: {
                fontSize: '0.85rem'
            },
            shrink: {
                fontSize: '1rem'
            }

        },
        MuiOutlinedInput: {
            notchedOutline: {
                fontSize: '1rem'
            }
        },
        MuiAccordionDetails: {
            root: {
                fontSize: '0.85rem'
            }
        },
        MuiFormControlLabel: {
            label: {
                fontSize: '0.85rem'
            }
        },
    },

    typography: {
        //fontFamily: 'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        h1: {
            fontWeight: 500,
            fontSize: 35,
            letterSpacing: '-0.24px'
        },
        h2: {
            fontWeight: 500,
            fontSize: 29,
            letterSpacing: '-0.24px'
        },
        h3: {
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: '-0.06px'
        },
        h4: {
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: '-0.06px'
        },
        h5: {
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: '-0.05px'
        },
        h6: {
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '-0.05px'
        },
        overline: {
            fontWeight: 500
        }
    }
});

const theme: CustomTheme = {
    logo: {
        backgroundColor: '#376fd0',
        color: '#fff',
        tag: {
            backgroundColor: 'rgb(56, 142, 60)',
            textColor: '#fff',
        }
    },
    SideBar: {
        subItemsBackgroundColor: 'rgb(0, 0, 0, 0.035)',
    },
    navbar: {
        backgroundColor: '#376fd0',
        textColor: '#fff',
    },
    others: {
        iconColor: '#666',
        tagIconColor: '#555',
        borderColor: '#ccc',
        positiveValue: 'rgb(56, 142, 60)',
        positiveBackground: 'rgba(56, 142, 60, 0.1)',
        negativeValue: '#E53935',
        negativeBackground: 'rgba(229, 57, 53, 0.1)',
        green: '#388E3C',
        blue: '#1976D2',
        red: '#F44336',
        organge: '#FFA000',
        purple: '#7B1FA2',
        gray: '#616161',
        secondaryHightlightColor: '#555',
    },
    ...base
};

export default theme;