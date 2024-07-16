import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) => {

    return createStyles({
        AppBar: {
            background: theme.navbar.backgroundColor,
            userSelect: "none",
            borderLeft: 'none',
            [theme.palette.type === 'dark' ? '&' : '']: {
                background: 'transparent',
                "backdrop-filter": 'blur(64px)',
            }
        },

        Navbar: {
            minHeight: 56,
            paddingLeft: 12,
            paddingRight: 12,
            marginLeft: 256,
            background: theme.navbar.backgroundColor,
            color: theme.navbar.textColor,
            userSelect: "none",

            [theme.breakpoints.down('md')]: {
                marginLeft: 0,
            },

            [theme.palette.type === 'dark' ? '&' : '']: {
                background: 'transparent',
            },
        },
        BoxOut: {
            flexGrow: 1
        }
    })
});

export default useStyles;