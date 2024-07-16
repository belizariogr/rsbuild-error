import React, { useEffect } from 'react';
import Config from '../../../../config';
import { Helmet } from 'react-helmet';
import { Box } from '@material-ui/core';

import useStyles from './styles';
import PageTitle from './PageTitle';
import { useSearch } from '../../../services/Search';
import { Search } from '../../../services/Search/types';

type PageProps = {
    title: string;
    titleContent?: any;
    breakxs?: boolean
}


const Page: React.FC<PageProps> = (props) => {

    const classes = useStyles();
    const { setSearch } = useSearch();

    useEffect(() => {
        setSearch({} as Search);
    }, [setSearch])


    return (
        <>
            <Helmet>
                <title>{props.title} | {Config.name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
            </Helmet>
            <Box className={classes.BoxContent}>
                <PageTitle title={props.title} breakxs={props.breakxs}>{props.titleContent}</PageTitle>
                {props.children}
            </Box>
        </>
    )
}

export default Page;
