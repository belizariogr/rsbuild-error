import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../../services/Theme/types';


const useStyles = makeStyles((theme: CustomTheme) => {
    return createStyles({
        ItemRoot: {
            width: 260,
            paddingTop: 16,
        },

        ItemBox: {
            width: 226,
            cursor: 'pointer',
            padding: 8,
            textAlign: 'center',
            '& svg': {
                width: 32,
                height: 32,
                borderRadius: 32
            }
        },

    })
});

export default useStyles;