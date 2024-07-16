import { makeStyles, createStyles, alpha, darken } from '@material-ui/core/styles';
import { CustomTheme } from '../../../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) =>
    createStyles({
        SearchBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },

        SearchInput: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.1),
            '&:hover': {
                // backgroundColor: alpha(theme.palette.common.white, 0.20),
            },
            //marginRight: theme.spacing(2),
            width: '600px !important',
            [theme.breakpoints.down('md')]: {
                width: '380px !important',
            },
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(1),
                width: '100% !important',
            },
            border: '1px solid ' + alpha(theme.palette.common.white, 0.2) + ' !important',
            [theme.palette.type === 'dark' ? '&' : '']: {
                borderRadius: 8,
                border: '1px solid ' + darken(theme.palette.divider, 0.6) + ' !important',
                backgroundColor: alpha(theme.palette.common.white, 0.05),
                "backdrop-blur": "16px",
                '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.05),
                    // border: '1px solid ' + theme.SideBar.selectedBorder,
                },
                '&:has(input:focus)': {
                    padding: 0,
                    border: '1px solid ' + theme.SideBar.selectedBorder + ' !important',
                },
            },


        },
        searchIcon: {

        },

        clearIcon: {
            color: alpha(theme.palette.common.white, 0.50),
            maxWidth: 40,
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
            paddingRight: 8,
        },

        inputInput: {
            padding: theme.spacing(1.5, 1.5, 1.5, 2),
            // vertical padding + font size from searchIcon
            paddingLeft: theme.spacing(1.5),
            paddingRight: 0,
            transition: theme.transitions.create('width'),
            width: '100% !important',
        },

        SearchButton: {
            padding: 2
        },
    }),
);

export default useStyles;