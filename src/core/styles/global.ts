import { createStyles, makeStyles } from '@material-ui/core';
import { keyframes } from '@mui/material';

const useStyles = makeStyles((theme) => createStyles({
    '@global': {

        [theme.breakpoints.up('md')]: {

            '*::-webkit-scrollbar': {
                width: '10px',
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.1)',
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)',
                borderRadius: 4,
            },
            '*::-webkit-scrollbar-thumb:hover': {
                backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.19)' : 'rgba(0,0,0,0.3)',
            },
            '*::-webkit-scrollbar-thumb:active': {
                backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.23)' : 'rgba(0,0,0,0.4)',
            },
        },

        '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            fontFamily: '"Noto Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important',
            //fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important',
        },
        html: {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            overflow: 'hidden',
            height: '100%',
            width: '100%',
            userSelect: "none",

            '@media print': {
                overflow: 'visible',
                height: 'unset',
                width: 'unset',
                '& .report-page-break': {
                    clear: 'both',
                    pageBreakAfter: 'always',
                }
            },
        },
        body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            height: '100%',
            width: '100%',

        },
        a: {
            textDecoration: 'none'
        },
        '#root': {
            height: '100%',
            width: '100%',
        },

        '.content-wrapper': {
            height: '100%',
            width: '100%',
        },

        '.reports-wrapper': {
            width: 0,
            height: 0,
            overflow: 'hidden',

        },

        '.label-reports-wrapper': {
            position: 'absolute',
            zIndex: -10000,
            left: -100000,
            top: -100000,
        },

        '.reports-container': {
            overflow: 'visible',
            display: 'block',
            height: 'unset !important',
        },

        '.reports-container:last-child': {
            pageBreakAfter: 'auto',
        },

        '.reports-content': {

        },

        '.report-page-header-space': {
            height: 100,
        },

        shake: keyframes({
            '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
            '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
            '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
            '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
            '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
            '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
            '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
            '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
            '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
            '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
            '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
        })

    },
}));

const GlobalStyles = () => {
    useStyles();
    return null;
};

export default GlobalStyles;
