import React from 'react';
import { Box, Drawer, Typography } from '@material-ui/core';
import { LangList, useLang } from '../../../services/Lang';
import LangItem from './LangItem';
import useStyles from './styles';


type LangBarProps = {
    open: boolean;
    doClose: () => void;
}

const LangBar: React.FC<LangBarProps> = ({ open, doClose }) => {
    const classes = useStyles();
    const { lang } = useLang();

    const getItems = () => LangList.map(l => <LangItem key={l.name} l={l} />);

    return (
        <Drawer anchor="right" variant="temporary" open={open} onClose={doClose}>
            <Box className={classes.Content}>
                <Typography variant="h4" className={classes.Header}>
                    {lang.data.captions.langHeader}
                </Typography>

                {getItems()}
            </Box>
        </Drawer>
    );
};

export default LangBar;