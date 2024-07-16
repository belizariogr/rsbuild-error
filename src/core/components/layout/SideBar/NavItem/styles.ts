import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) =>
    createStyles({
        ListItem: {
            padding: 0,
            height: 52,
            [theme.palette.type === 'dark' ? '&' : '']: {
                marginTop: 8,
                borderRadius: '8px',
                border: '1px solid ' + theme.SideBar.background + ' !important',

                '&:hover': {
                    backgroundColor: theme.SideBar.hoverBackground + ' !important',
                    border: '1px solid ' + theme.SideBar.hoverBorder + ' !important',
                },
            }
        },

        SubListItem: {
            padding: 0,
            height: 52,
            backgroundColor: 'rgb(0, 0, 0, 0.1)',
        },

        Content: {
            display: 'flex',
            padding: '12px 16px 12px 16px',
            width: 260,
        },

        Selected: {
            [theme.palette.type === 'dark' ? '&' : '']: {
                backgroundColor: theme.SideBar.selectedBackground + ' !important',
                border: '1px solid ' + theme.SideBar.selectedBorder + ' !important',
                '&:hover': {
                    backgroundColor: theme.SideBar.selectedBackground + ' !important',
                    border: '1px solid ' + theme.SideBar.selectedBorder + ' !important',
                },
            }
        },

        SubItemList: {
            margin: '0 !important',
            padding: '0 !important',
            backgroundColor: theme.SideBar.subItemsBackgroundColor,
        },
        Icon: {
            minWidth: 21,
            opacity: 0.5,
            paddingTop: 3,
        },

        SubItemIcon: {
            width: 16,
            opacity: 0.5,
            marginLeft: 12,
            marginRight: 0,
            paddingTop: 1,
        },

        Chevron: {
            // color: theme.palette.,
            opacity: 0.7,
            fontSize: '1.5rem'
        },
        Header: {
            fontWeight: 400,
            padding: '16px 28px 4px',
            opacity: 0.9,

            fontSize: '0.8rem',
            marginLeft: -2
        },
        ItemText: {
            fontSize: '0.85rem',
            paddingTop: 2,
        },

        Text: {
            margin: '0 16px',
            // fontSize: '0.5rem'
        },

        SubItemText: {
            margin: 0,
            paddingTop: 1,
            opacity: 0.8,
            fontSize: '0.75rem',
        },
        Button: {
            color: 'text.secondary',
            fontWeight: 400,
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            '& svg': {
                mr: 1
            }
        },
        ButtonActive: {
            color: 'primary.main',
            fontWeight: 500,
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            '& svg': {
                mr: 1
            }
        }
    }),
);

export default useStyles;