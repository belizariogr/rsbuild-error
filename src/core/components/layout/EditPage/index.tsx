import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, Grid, IconButton, Typography, CircularProgress } from '@material-ui/core';
import { Close } from '@mui/icons-material';
import useStyles from './styles';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import Container from '../../ui/Container';
import Dataset, { DatasetValidation } from '../../../services/Dataset/Dataset';

import { getModuleDefs, getModuleLabel, useLang } from '../../../services/Lang';
import { IEdit } from '../../../types';
import { useDialog } from '../../../services/Dialog';
import { useLocation, useParams  } from 'react-router-dom'
import Config from '../../../../config';


interface IEditPage {
    id: string;
    name: string;
    group?: string;
    langGroup?: string;
    dataset: Dataset,
    edit: React.FC<IEdit>;
    pageClasses: any;
    closeModal?: (refresh: boolean) => void;
    showCancelDialog?: boolean;
    canInsert: boolean;
    canUpdate: boolean;
    canCancel?: boolean;
    navigateToRoot?: boolean;
    afterSave?: (record: any) => void;

}

const EditPage: React.FC<IEditPage> = ({ id, name, group, langGroup, dataset, edit, closeModal, pageClasses, showCancelDialog, canInsert, canUpdate, canCancel, navigateToRoot, afterSave }) => {
    const classes = useStyles();
    const { lang } = useLang();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog] = useDialog();
    const location = useLocation();
    const params = useParams();
    const [rootPath] = useState(() => location.pathname.replace('/' + params.id, ''))
    const [rootClass, setRootClass] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);

    const [femTitle] = useState(() => {
        const mod = getModuleDefs(lang, langGroup || group || '', name);
        return !!mod?.feminine
    });

    const [, updateState] = useState<any>();
    const forceRender = useCallback(() => {
        updateState({})
    }, []);

    useEffect(() => {
        dataset.updateHelper.updateEdit = forceRender;
        return () => {
            dataset.updateHelper.updateEdit = undefined;
        }
    });

    if (canCancel === undefined)
        canCancel = true;
    if (navigateToRoot === undefined)
        navigateToRoot = true;
    if (id === (Config.newPath || 'new') && !canInsert) {
        dataset.setReadOnly(true);
    }

    if (!!id && id !== (Config.newPath || 'new') && !canUpdate) {
        dataset.setReadOnly(true);
    }

    const onSubmit = async () => {
        if (dataset.beforeEditSave)
            dataset.beforeEditSave();
        setIsSaving(true);
        const record = dataset.record;
        let ignoreSnackbar = false;
        let ignoreRefresh = false;
        try {
            const d: DatasetValidation = await dataset.save();
            ignoreRefresh = !!d.ignoreRefresh;
            setIsSaving(false);
            if (!!closeModal)
                closeModal(!dataset.isDetail() && !ignoreRefresh)
            else if (navigateToRoot) {
                navigate(rootPath);
            }
            if (!!d)
                ignoreSnackbar = !!d.ignoreSnackbar;

        } catch (err: any) {
            let msg = lang.data.messages.saveErrorMsg;
            if (dataset.onErrorEditSave) {
                let m = dataset.onErrorEditSave(err);
                if (m)
                    msg = m;
            }
            setIsSaving(false);

            if (typeof err === 'string')
                msg = err;
            if (!!err?.fields) {
                msg = lang.data.messages.saveValidationError;
                if (Object.keys(err.fields).length === 0 && !!err.msg)
                    msg = err.msg;
                dataset.updateEdit();
            }
            if (!!err?.customMessage) {
                msg = err.customMessage;
                dataset.updateEdit();
            }
            if (!!err?.error?.customMessage) {
                msg = err.error.customMessage;
                dataset.updateEdit();
            }
            enqueueSnackbar(msg, { variant: 'error', disableWindowBlurListener: true });
            return;
        }
        if (!dataset.isDetail() && !ignoreSnackbar) {
            enqueueSnackbar(lang.data.messages.saveSuccessMsg, { variant: 'success', disableWindowBlurListener: true, autoHideDuration: 2000, });
        }

        if (dataset.afterEditSave)
            dataset.afterEditSave();
        if (afterSave)
            afterSave(record);
    }

    const doCancel = () => {
        dataset.cancel();
        if (!!closeModal)
            closeModal(false)
        else if (navigateToRoot)
            navigate(rootPath);
        if (dataset.afterEditCancel)
            dataset.afterEditCancel();
    }


    const onCancel = () => {
        if (dataset.beforeEditCancel)
            dataset.beforeEditCancel();
        if (showCancelDialog && !dataset.readOnly) {
            openDialog({
                title: lang.data.captions.confirmation,
                content: lang.data.messages.cancelRecord,
                buttons: ['yes', 'no'],
                variants: ['contained'],
                captions: [lang.data.captions.yes],
                colors: ['red'],
                onClickYes: () => doCancel(),
                onClickNo: () => { if (!!dataset.onNoEditCancel) dataset.onNoEditCancel() }
            });
            return;
        }
        doCancel();
    }

    const getHeader = () => {
        let singularTitle = getModuleLabel(lang, langGroup || group || '', name, '', true);
        singularTitle = (singularTitle ? (' ' + singularTitle) : '')

        if (!!closeModal)
            return (
                <Box className={classes.Header} id="editModalHeader">
                    <Typography variant="h3">{id === (Config.newPath || 'new') ? ((femTitle ? lang.data.captions.femNew : lang.data.captions.new) + singularTitle) : ((dataset.readOnly ? lang.data.captions.viewing : lang.data.captions.editing) + singularTitle + (!dataset?.record?.Id ? '' : ' #' + dataset?.record?.Id))}</Typography>
                    <IconButton aria-label="Close" size="small" className={classes.CloseBtn} onClick={onCancel}><Close /></IconButton>
                </Box>
            )
    }

    return (
        <Card className={classes.Card + ' ' + rootClass}>
            {getHeader()}
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); e.stopPropagation(); }}>
                <Container className={!!closeModal ? classes.ContainerModal : classes.Container}>
                    {React.createElement(edit, { dataset, classes: pageClasses, setRootClass, id, forceRender })}
                </Container>
                <Grid container className={classes.Bottom} >
                    <Grid item >
                        {dataset.readOnly ? undefined : <Button type="submit" color="secondary" variant="contained" disabled={isSaving}>{isSaving ? <CircularProgress size={14} style={{ marginRight: 6 }} /> : undefined} {lang.data.captions.save}</Button>}
                        {canCancel ? <Button onClick={onCancel} variant="outlined" disabled={isSaving}>{dataset.readOnly ? lang.data.captions.close : lang.data.captions.cancel} </Button> : undefined}
                    </Grid>
                </Grid>
            </form>
        </Card>
    );
}

export default EditPage;