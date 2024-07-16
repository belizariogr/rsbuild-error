import React from 'react';
import { Box, Button, Drawer, IconButton, Typography } from '@material-ui/core';
import { useLang } from '../../../services/Lang';
import { Search } from '../../../services/Search/types';
import { Close, FilterAlt } from '@mui/icons-material';
import ColorButton from '../../ui/ColorButton';
import DateFilter from '../../filters/DateFilter';
import OptionsFilter from '../../filters/OptionsFilter';
import useStyles from './styles';


type FilterBarProps = {
    open: boolean;
    doClose: () => void;
    search: Search;
}

const FilterBar: React.FC<FilterBarProps> = ({ open, doClose, search }) => {
    const classes = useStyles();
    const { lang } = useLang();
    const { dataset } = search;

    const getBoolOptions = () => {
        return [
            { id: 1, text: lang.data.captions.yes || 'Sim' },
            { id: 0, text: lang.data.captions.no || 'Não' },
        ]
    }

    const getItems = () => {
        if (!dataset)
            return;
        return dataset.filters.map((f) => {
            if (f.hidden)
                return undefined;
            if (f.type === 'date' || f.type === 'datetime')
                return <DateFilter key={f.name} filter={f} search={search} />
            if (f.type === 'options')
                return <OptionsFilter key={f.name} filter={f} search={search} />
            if (f.type === 'bool') {
                // if (!f.options)
                f.options = getBoolOptions();
                return <OptionsFilter key={f.name} filter={f} search={search} />
            }
            return undefined;
        })
    };

    return (
        <Drawer anchor="right" variant="temporary" open={open} onClose={doClose}>
            <Box className={classes.Header}>
                <Typography variant="h4">
                    {lang.data.captions.filterHeader}
                </Typography>
                <IconButton aria-label="Close" size="small" onClick={doClose} className={classes.CloseBtn}><Close /></IconButton>
            </Box>

            <Box className={classes.Content}>
                {getItems()}
            </Box>

            <Box className={classes.Footer}>
                <ColorButton color="secondary" label={lang.data.captions.filter} icon={<FilterAlt />}
                    onClick={() => {
                        if (!!search && !!search.doFilter) {
                            search.doFilter(true, search.dataset)
                        }
                    }} />
                <Button variant="outlined" className={classes.CleanBtn} onClick={() => search.doClearFilters?.(search.dataset)}>{lang.data.captions.clear}</Button>
            </Box>
        </Drawer>
    );
};

export default FilterBar;