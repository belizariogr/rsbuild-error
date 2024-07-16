import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CustomTheme } from '../../services/Theme/types';

const useStyles = makeStyles((theme: CustomTheme) =>
    createStyles({
        Root: {
            height: '100%',
            overflow: 'auto',
        },
        BoxRoot: {
            bgcolor: 'background.secondary',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
        },

        Form: {
            padding: 32,
            borderRadius: 12,
        },


        Logo: {
            textAlign: 'center',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            fontSize: '2.250rem',
            whiteSpace: 'nowrap'

        },

        BoxText: {
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',

            margin: '8px 8px 8px 8px',

        },
        BoxTextAccount: {
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',

            margin: '8px 8px 24px 8px',

        },

        AccountText: {
            // color: '#333',
        },

        ImgLogo: {
            width: 32,
            height: 32,
            marginRight: 8,
        },

        Tag: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            borderRadius: 5,
            fontSize: '35%',
            height: 22,
            marginLeft: 2,
            marginTop: -16,
            padding: '3px 5px 5px 5px'

        },


        BoxLang: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },

        LangButton: {
            width: 50,
            Height: 50,
        },


    }),
);

export default useStyles;