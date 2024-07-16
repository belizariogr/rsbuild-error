import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({

    Item: {
        fontSize: '0.85rem'
    },
    FlagIcon: {
        '& svg' : {
            width: 26,
            height: 26,
        },
    }
  }),
);

export default useStyles;