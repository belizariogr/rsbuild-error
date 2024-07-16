import { Helmet } from 'react-helmet';
import { Box, Button, Card, CardActions, CardContent, Hidden, Typography } from '@material-ui/core';
import Config from '../../../config';
import { useState } from 'react';
import { useApi } from '../../services/Api';
import { useLang } from '../../services/Lang';
import { useTheme } from '../../services/Theme';

const SlowDown = () => {
    const [lastPath] = useState(() => localStorage.getItem('lastPath') || '/');
    const api = useApi();
    const { lang } = useLang();
    const { theme } = useTheme()

    const doReconnect = () => {
        localStorage.setItem('lastPath', '');
        window.location.pathname = lastPath;
    }

    return (
        <>
            Slow Down
        </>
    )
};

export default SlowDown;
