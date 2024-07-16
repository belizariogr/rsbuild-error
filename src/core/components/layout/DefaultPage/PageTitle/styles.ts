import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        link: {
            display: 'flex',
            fontSize: '0.8rem',
            cursor: 'pointer',
        },
        notlink: {
            display: 'flex',
            fontSize: '0.8rem',
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },

        Breadcrumbs: {
            margin: '0 0 12px 0',
            [theme.breakpoints.down('md')]: {
                margin: '0 0 6px 0'
            }
        },

        root: {
            display: 'flex',
            // minHeight: 72,
            justifyContent: 'space-around',
            flexFlow: 'row nowrap',
            alignItems: 'stretch',

            "-webkit-user-select": 'none', /* Safari */
            "-moz-user-select": "none", /* Firefox */
            "-ms-user-select:": "none", /* IE10+/Edge */
            userSelect: "none", /* Standard */
        },
        Title: {
            display: 'block',
            flexGrow: 1,
        },

        Content: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            flexGrow: 1,
        },
    }),
);

export default useStyles;