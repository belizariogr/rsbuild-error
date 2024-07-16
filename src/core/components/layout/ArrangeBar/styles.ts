import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';


const useStyles = makeStyles((theme: CustomTheme) => {
    return createStyles({
        Content: {
            width: 320,
            // padding: '12px 12px 0 12px',
            // padding: theme.spacing(1.5),
            margin: 0,
            padding: 0,
            // paddingRight: 16,
            overflow: 'auto',
            // overflowY: 'scroll',
            height: '100%',

            // '& div:not(:first-child)' : {
            //     marginTop: 10,
            // }
        },

        Header: {
            display: 'flex',
            padding: '8px 12px 6px 12px',
            borderBottom: '1px solid ' + theme.others.borderColor,
        },
        CloseBtn: {
            color: theme.others.iconColor,
            marginLeft: 'auto',
        },

        CleanBtn: {
            marginLeft: 12,
            padding: '6px 12px 6px 12px',
        },

        Footer: {
            padding: '12px 12px 12px 0px',
            borderTop: '1px solid ' + theme.others.borderColor,
        },
    })
});

export default useStyles;