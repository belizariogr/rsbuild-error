import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        Root: {
            width: '100%',
        },
        RootDiv: {
            width: '100%',
        },
        RootDivDetail: {
            margin: -12,
            marginTop: -18,
            width: 'calc(100% + 24px)',
        },
        BoxContent: {
            minHeight: '100%',
            padding: 20,
            [theme.breakpoints.down('md')]: {
                padding: 12,
            },
        },
        BoxContentNoPadding: {
            minHeight: '100%',
        },
        TitleButton: {
            marginLeft: 12,
            minWidth: 32,
            padding: '8px 12px 8px 12px',
        },
        Icon: {
            padding: 0,
            margin: 0,
            color: theme.palette.primary.contrastText
        },
        Button: {
            fontSize: '0.8rem',
            fontWeight: 500
        },

        EditModal: {
            overflowY: 'scroll',
            //  display:'block'
        },

        ModalSmall: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '60%',
            minWidth: 340,

            [theme.breakpoints.down('md')]: {
                width: '96%',
            },
        },
        ModalLarge: {
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '96%',
        },
        ButtonsContainer: {
            whiteSpace: 'nowrap',
        },

        ButtonsDetail: {
            height: 36,
            '& .BGColorButton': {
                paddingTop: '4px !important',
                paddingBottom: '4px !important',
                marginBottom: 6
            }
        },
    }),
);

export default useStyles;