import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useLang } from '../../../../services/Lang';
import { Lang } from '../../../../services/Lang/types';
import { useTheme } from '../../../../services/Theme';
import { useUser } from '../../../../services/User';
import { setStorage } from '../../../../services/Utils';
import useStyles from './styles';


type LangItemProps = {
    l: Lang;
}

const LangItem: React.FC<LangItemProps> = ({ l }) => {

    const classes = useStyles();
    const { user } = useUser();
    const { lang, setLang } = useLang();
    const { theme } = useTheme();

    const doSetLang = () => {
        if (lang === l)
            return
        setStorage('lang', l.code, '', '', user.tenantId, user.userId);
        setStorage('lang', l.code);
        setLang(l);
    };

    return (
        <Box className={classes.ItemRoot}>

            <Box style={{
                width: 232,
                border: l === lang ? ('3px solid ' + (theme.theme.palette.type === 'dark' ? theme.theme.palette.secondary.dark : theme.theme.palette.secondary.main)) : ('3px solid ' + theme.theme.palette.background.paper)
                }}>
                <Box className={classes.ItemBox} onClick={doSetLang}>
                    {l.icon}
                    <Typography>{l.name}</Typography>
                </Box>
            </Box>

        </Box>
    );
}

export default LangItem;