import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';


const useStyles = makeStyles((theme: CustomTheme) => {
    return createStyles({
        Drawer: {
            [theme.palette.type === 'dark' ? theme.breakpoints.up('md') : '']: {
                background: 'transparent',

                '& .MuiDrawer-paper': {
                    background: 'transparent',
                }
            }
        },

        Content: {
            overflow: 'hidden',
            height: '100%',
            background: theme.SideBar.background,
            [theme.palette.type === 'dark' ? theme.breakpoints.up('md') : '']: {
                background: 'transparent',
            }
        },

        Box1: {
            flexGrow: 1
        },

        LogoBase: {
            background: theme.logo.backgroundColor,
            textAlign: 'center',
            display: 'flex',
            fontWeight: 500,
            fontSize: '1.1rem',
            whiteSpace: 'nowrap',
            [theme.palette.type === 'dark' ? theme.breakpoints.up('md') : '']: {
                background: 'transparent',
                borderBottom: '1px solid ' + theme.others.borderColor,
            }
        },

        Logo: {
            '& svg': {
                height: 20,
                marginRight: 8,
            }
        },

        LogoFull: {
            '& svg': {
                height: 20,
                marginRight: 8,
            }
        },

        LogoContent: {
            height: 56,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.primary.contrastText,
        },

        ListItem: {
            padding: 0,
            [theme.palette.type === 'dark' ? '&' : '']: {
                paddingLeft: 8,
                paddingRight: 8,
            }
        },

        Items: {
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 56px)',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            padding: 0,
            [theme.palette.type === 'dark' ? '&' : '']: {
                borderRight: '1px solid ' + theme.others.borderColor,
            }
        },
        Tag: {
            backgroundColor: theme.logo.tag.backgroundColor,
            color: theme.logo.tag.textColor,
            borderRadius: 5,
            fontSize: '0.6rem',
            height: 18,
            marginLeft: 2,
            marginTop: -16,
            padding: '3px 5px 3px 5px',

        }
    })
});

export default useStyles;