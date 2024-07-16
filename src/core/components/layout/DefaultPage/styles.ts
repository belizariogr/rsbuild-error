import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        BoxContent: {
            minHeight: '100%',
            padding: 20,
            [theme.breakpoints.down('md')]: {
                padding: 12,
            },
        }
    }),
);

export default useStyles;