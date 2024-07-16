import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) =>
    createStyles({
        Bottom: {
            alignItems: 'end',
            justifyContent: 'end',

            paddingBottom: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                paddingBottom: theme.spacing(2),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
            },

            '& button': {
                marginLeft: theme.spacing(1),
            },
        },

        Card: { position: 'relative', marginBottom: theme.spacing(1), },

        Backdrop: {
            position: "absolute",
            zIndex: theme.zIndex.drawer - 1,

        },

        BackdropCircularProgress: {
            color: theme.palette.success.main
        },

        Header: {
            display: 'flex',
            padding: '12px 12px 12px 12px',
            marginBottom: 6,
        },

        Container: {
            padding: theme.spacing(3),
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(2),
            },
        },

        ContainerModal: {
            padding: theme.spacing(3),
            paddingTop: 0,
            [theme.breakpoints.down('md')]: {
                padding: theme.spacing(2),
                paddingTop: 0,
            },
        },

        CloseBtn: {
            color: theme.others.iconColor,
            marginLeft: 'auto',
        },
    }),
);

export default useStyles;