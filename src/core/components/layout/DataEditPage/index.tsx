import React, { useRef } from 'react';
import { Box, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IRow } from '../../../types';
import ColorButton from '../../ui/ColorButton';
import { Add } from '@mui/icons-material';
import { getModuleLabel, useLang } from '../../../services/Lang';
import Dataset from '../../../services/Dataset/Dataset';
import { DatasetContext } from '../../../services/Dataset';
import EditDataGrid from '../../ui/EditDataGrid';

type PageProps = {
    name: string;
    group?: string;
    title?: string;

    row?: React.FC<IRow>;
    minWidth?: number;
    classes?: any;

    dataset: Dataset;
    fieldName?: string;
    // masterDataset: Dataset;
    // masterField: string;
    readOnly?: boolean;

    dontAllowEmpty?: boolean;

    summary?: React.ReactNode;
    ignoreDeleteConfirmation?: boolean;
    canAdd?: boolean;
    canDelete?: boolean;
    noHeader?: boolean;
    rootClass?: string;

    noEmptyMessage?: boolean


    onNewClick?: () => void;
}

const DataEditPage: React.FC<PageProps> = ({ name, group, title, row, minWidth, classes, dataset, fieldName, readOnly, summary, dontAllowEmpty,
        onNewClick, ignoreDeleteConfirmation, canAdd = true, canDelete = true, noHeader, rootClass, noEmptyMessage }) => {

    const pageRef = useRef<HTMLDivElement>(null);
    const rootClasses = useStyles();
    let detailDataset = dataset;

    if (!!fieldName){
        detailDataset = dataset.findDetailByField(fieldName) || dataset;
    }

    // Initialize Hooks
    const { lang } = useLang();

    const singularTitle = getModuleLabel(lang, group || '', name, title || name, true);

    if (!detailDataset)
        return <></>;

    const newClick = () => {
        // if (dataset.record && ((dataset.isDetail() && dataset.rows.includes(dataset.record)) || !dataset.isDetail())) {
        if (detailDataset.record && detailDataset.rows.includes(detailDataset.record)) {
            const val = detailDataset.validate(detailDataset.record);
            if (val.error) {
                detailDataset.updateHelper?.updateGrid?.();
                return
            }
        }

        detailDataset.newDetail();
        if (!!onNewClick)
            onNewClick();
    }

    return (
        <DatasetContext.Provider value={detailDataset}>
            <div ref={pageRef} className={rootClasses.RootDiv + ' ' + rootClasses.RootDivDetail + ' ' + rootClass }>

                <Box className={rootClasses.BoxContent}>
                    <EditDataGrid
                        name={name}
                        group={group}
                        dataset={detailDataset}
                        fieldName={fieldName}
                        minWidth={minWidth}
                        row={row}
                        customClasses={classes}
                        readOnly={readOnly}
                        dontAllowEmpty={dontAllowEmpty}
                        ignoreDeleteConfirmation={ignoreDeleteConfirmation}
                        canAdd={!dataset.readOnly && canAdd !== false}
                        canDelete={canDelete}
                        noHeader={noHeader}
                        noEmptyMessage={noEmptyMessage}
                    />
                </Box>

            </div>
            <Grid container className='DataEditPageContainer'>
                <Grid item xs={6}>
                    {dataset.readOnly || !canAdd ? undefined : <div className={rootClasses.ButtonAddItem}>
                        <ColorButton icon={<Add />} color="primary" onClick={newClick}>{lang.data.captions.add} {singularTitle}</ColorButton>
                    </div>}
                </Grid>
                <Grid item xs={6}>
                    {summary}
                </Grid>

            </Grid>

        </DatasetContext.Provider>
    );
}

export default DataEditPage;
