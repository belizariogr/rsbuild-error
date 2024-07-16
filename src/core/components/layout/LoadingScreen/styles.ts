import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) => {

    return createStyles({
        root: {
            background: theme.palette.background.default,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100dvw',
            height: '100dvh',
            margin: 0,
            padding: 0,

        }
    })
});

export default useStyles;

