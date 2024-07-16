import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';


const useStyles = makeStyles((theme: CustomTheme) => {
    return createStyles({
        Content: {
            width: 260,
            padding: 16,
            overflowX: 'hidden',
        },

        Header: {
            marginTop: 12,
        },
    })
});

export default useStyles;