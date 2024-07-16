import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        RootDiv: {
            width: '100%',
            // marginTop: 10,
        },
        RootDivDetail: {
            // margin: -12,
            // marginTop: -12,
            width: 'calc(100% + 16px)',
        },
        BoxContent: {
            minHeight: '100%',
            // padding: 20,
            // marginTop: 12,
            [theme.breakpoints.down('md')]: {
                // padding: 12,
                // marginTop: 6,
            },
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

        ButtonAddItem: {
            marginLeft: -12,
            marginTop: 6,

            // marginLeft: -3,
            marginBottom: 8,
            '& button': {
                fontSize: '0.75rem'
            },

            // [theme.breakpoints.down('md')]: {
            //     margin: '8px 8px 8px -12px',
            // },
        }
    }),
);

export default useStyles;