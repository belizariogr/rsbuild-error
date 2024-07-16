import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({

        Item: {
            fontSize: '0.85rem'
        },

        ItemError: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.error.main,
            '& svg': {
                marginRight: 12,
                color: theme.palette.error.main
            }
        }
    }),
);

export default useStyles;