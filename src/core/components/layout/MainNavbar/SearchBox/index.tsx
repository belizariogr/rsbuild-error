// import { Breadcrumbs, Divider, Grid, Link, Typography } from "@material-ui/core";
import React, { useCallback, useRef, useState } from "react";
import { Badge, Box, IconButton, InputBase } from "@material-ui/core";
import { Clear as ClearIcon, Search as SearchIcon, FilterList as FilterListIcon } from "@mui/icons-material";
import { useSearch } from "../../../../services/Search";
import { useEffect } from "react";
import { useLang } from "../../../../services/Lang";
import useStyles from "./styles";

type SearchBoxProps = {

}

const SearchBox: React.FC<SearchBoxProps> = () => {

    const { search } = useSearch();

    const { lang } = useLang();

    const [inputText, setInputText] = useState('');
    const [searchText, setSearchText] = useState(search?.dataset?.searchText || '');
    const [filterCount, setFilterCount] = useState(0);

    const classes = useStyles();
    const searchInput = useRef<HTMLInputElement>(null);


    const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            doSearch();
            setInputText('');
            return;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape')
            return doClearSearch();
    }

    const focusInput = (unfocus?: boolean) => {
        if (!!searchInput.current){
            if (unfocus)
                return searchInput.current.blur();
            searchInput.current.focus();
        }
    }

    const doSetSearchText = useCallback((text: string) => {
        setInputText(text);
        setSearchText(text);
    }, [])

    const doClearSearchEx = () => {
        setInputText('');
        setSearchText('');
    }

    const doClearSearch = () => {
        if (!!search.doSearch)
            search.doSearch('', search.dataset);
        doClearSearchEx();
        focusInput(true);
    }

    const doSearch = () => {
        focusInput();
        if (!inputText)
            return;
        setSearchText(inputText);
        if (search.doSearch) {
            search.doSearch(inputText, search.dataset);
        }
    }

    const doSetFiltersApplied = (count: number) => {
        setFilterCount(count);
    }

    useEffect(() => {
        if (!!search) {
            if (search.dataset) {
                setInputText(search.initialText || '');
                setSearchText(search.dataset.searchText || '');
            } else {
                setInputText(search.initialText || '');
                setSearchText(search.initialText || '');
            }
            search.doSetSearchText = doSetSearchText;
        }

        if (!!search && !!search.dataset) {
            search.dataset.doCleanSearch = doClearSearchEx;
            search.dataset.doSetFiltersApplied = doSetFiltersApplied;
            search.dataset.doSetSearchText = doSetSearchText;
            setFilterCount(search.dataset.filtersApplied);
        }
    }, [doSetSearchText, search]);

    useEffect(() => {
        if (!!search && !!search.dataset)
            search.dataset.doCleanSearch = doClearSearchEx;
        return () => {
            if (!!search && !!search.dataset)
                search.dataset.doCleanSearch = undefined;
        };
    });

    return !!search.doSearch ? (
        <Box className={classes.SearchBox}>
            <div className={classes.SearchInput}>
                <InputBase
                    inputRef={searchInput}
                    placeholder={lang.data.captions.searchBox}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={updateInputValue}
                    onKeyPress={handleKeyPress}
                    onKeyDown={handleKeyDown}
                    endAdornment={
                        <>
                            {(!!inputText || !!searchText) ? (<div className={classes.clearIcon}>
                                <IconButton className={classes.SearchButton} color="inherit" onClick={doClearSearch}>
                                    <ClearIcon />
                                </IconButton>
                            </div>) : undefined}
                            <div className={classes.searchIcon}><IconButton className={classes.SearchButton} color="inherit" onClick={doSearch}><SearchIcon /></IconButton></div>
                        </>}
                    value={inputText}
                />
            </div>
            {!!search.hasFilters ? (<IconButton color="inherit" onClick={() => {search.doOpenFilterBar?.(search.dataset)}}> <Badge badgeContent={filterCount} color="error" overlap="rectangular"> <FilterListIcon /> </Badge></IconButton>) : <></>}
        </Box>
    ) : <></>;
}

export default SearchBox;