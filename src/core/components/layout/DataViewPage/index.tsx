import React, { useCallback, useEffect, useRef, useState } from 'react';
import { formatStr } from '../../../services/Utils';
import { useUser } from '../../../services/User';
import Config from '../../../../config';

import { Helmet } from 'react-helmet';
import { Box, Modal, Backdrop, useMediaQuery, IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core';

import useStyles from './styles';
import PageTitle from '../DefaultPage/PageTitle';
// import DataGrid from '../../ui/DataGrid';
import { Schema, Record, IEdit, IRow, ICard, MoreMenuItemArray } from '../../../types';
import { useApi } from '../../../services/Api';
import { useSearch } from '../../../services/Search';
import ColorButton from '../../ui/ColorButton';
import { Add, Delete, FileDownload, MoreVert, Print } from '@mui/icons-material';
import { useDialog } from '../../../services/Dialog';
import { useSnackbar } from 'notistack';
import { getModuleDefs, getModuleLabel, useLang } from '../../../services/Lang';
import { useNavigate, useParams } from 'react-router-dom';
import EditPage from '../EditPage';
import FilterBar from '../FilterBar';
import Dataset from '../../../services/Dataset/Dataset';
import { DatasetContext } from '../../../services/Dataset';
import { useTheme } from '../../../services/Theme';
import { useTheme as useThemeCore } from '@material-ui/core/styles';
import CardDataView from '../../ui/CardDataView';
import ListReport from '../../../reports/List';
import { useReports } from '../../../services/Reports';
import DataGrid from '../../ui/DataGrid';
import ArrangeBar from '../ArrangeBar';
import { Search } from '../../../services/Search/types';

type PageProps = {
    name: string;
    group?: string;
    langGroup?: string;
    langFields?: string;
    title?: string;
    resource?: string;
    conditions?: string;
    defaultOrder?: string;
    defaultSort?: string;
    isPublic?: boolean;
    schema: Schema;
    buttons?: React.ReactNode;
    editModal?: boolean;
    modalLarge?: boolean;
    edit?: React.FC<IEdit>;
    mobileEdit?: React.FC<IEdit>;
    type?: 'grid' | 'cards';
    row?: React.FC<IRow>;
    card?: React.FC<ICard>;
    mobileRow?: React.FC<IRow>;
    minWidth?: number;
    classes?: any;

    dataset?: Dataset;
    masterDataset?: Dataset;
    masterField?: string;
    readOnly?: boolean;

    noHelmet?: boolean;
    noPageHeader?: boolean;
    noGridHeader?: boolean;
    noElevation?: boolean;
    noLimit?: boolean;

    noMobilePageHeader?: boolean;
    noMobileGridHeader?: boolean;
    noMobileElevation?: boolean;
    noPaper?: boolean;

    noInsertButton?: boolean;
    noDeleteButton?: boolean;

    noSelection?: boolean;
    noSearch?: boolean;
    noPadding?: boolean;

    singleDeletetion?: boolean;

    currentPageRef?: React.RefObject<HTMLDivElement>;
    parentPageRef?: React.RefObject<HTMLDivElement>;

    ignoreInitialLoad?: boolean;
    reloadTime?: number;
    showCancelDialog?: boolean;
    printList?: boolean;
    exportList?: boolean;
    menu?: MoreMenuItemArray;

    ignoreStorage?: boolean;
    ignoreInitizalizeFilters?: boolean;
    ignoreArrange?: boolean;


    onLineClick?: (record: any) => void;
}

const DataViewPage: React.FC<PageProps> = ({ schema, buttons, name, group, langGroup, langFields, edit, mobileEdit, type, row, card, mobileRow, title, resource, conditions, defaultOrder, defaultSort, isPublic, editModal, modalLarge, minWidth, classes, dataset, masterDataset, masterField, readOnly,
    noPageHeader, noHelmet, noGridHeader, noElevation, noMobilePageHeader, noPadding, noMobileGridHeader, noMobileElevation, noPaper, noInsertButton, noDeleteButton, noSelection, noSearch, currentPageRef, parentPageRef, reloadTime, showCancelDialog, noLimit, printList, exportList, menu, onLineClick, ignoreStorage,
    ignoreInitizalizeFilters, ignoreInitialLoad, ignoreArrange, singleDeletetion }) => {

    type = type || 'grid';
    // schema.classes = classes;
    const hookPageRef = useRef<HTMLDivElement>(null);
    const pageRef = currentPageRef || hookPageRef;
    const { enqueueSnackbar } = useSnackbar();
    const rootClasses = useStyles();

    // Initialize Hooks
    const { user } = useUser();
    const { lang } = useLang();
    const api = useApi();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { search, setSearch } = useSearch();
    const { reportManager } = useReports();
    const themeCore = useThemeCore();

    const [loading, setLoading] = useState(() => !ignoreInitialLoad);
    const [loadingError, setLoadingError] = useState(false);

    const isMobile = useMediaQuery(themeCore.breakpoints.down('sm'));
    const [detail] = useState(() => !!masterDataset || !!masterField)
    // const detail = !!masterDataset || !!masterField;
    // if (detail)
    //     dataset = masterDataset?.findDetailByField(masterField || '');

    const [stateDataset] = useState<Dataset>(() => {
        let d: Dataset | undefined = dataset;
        if (!d && detail) {
            d = masterDataset?.findDetailByField(masterField || '');
        }

        if (!d) {
            d = new Dataset(langFields || name, langGroup || group || '', user, lang, theme.theme, api, resource || '', !!isPublic, schema, conditions, masterDataset, masterField, classes, undefined, defaultOrder, defaultSort, ignoreArrange);
            d.setLangGroup(langGroup);
        }
        if (d.name !== langFields || name) {
            d.name = langFields || name;
        }

        d.pageRef = pageRef;
        d.ignoreStorage = ignoreStorage;

        d.beforeLoadRows = async () => {
            setLoading(true);
            setLoadingError(false);
        }

        d.afterLoadRows = async () => {
            setLoading(false);
            setFirstLoading(false);
            setLoadingError(false);

            if (!!parentPageRef && !!parentPageRef.current) {
                parentPageRef.current?.scroll({ left: 0, top: 0, });
                parentPageRef.current.parentElement?.scroll({ left: 0, top: 0, });
                parentPageRef.current.parentElement?.parentElement?.scroll({ left: 0, top: 0, });
                return
            }
            if (!!pageRef && !!pageRef.current) {
                pageRef.current.parentElement?.scroll({ left: 0, top: 0, behavior: 'smooth' });
            }
        }

        d.onErrorLoadingRows = () => {
            setLoading(false);
            setFirstLoading(true);
            setLoadingError(true);
        }

        d.onChangePage = async () => {
            setLoading(true);
        };
        if (noLimit)
            d.limit = 0;
        d.search.hasFilters = !!d.schema.filters && d.schema.filters.length > 0 && !detail;
        d.search.doSearch = (text: string, dataset) => {
            dataset.setSearchTextEx(text);
        }

        d.search.doFilter = (close: boolean, dataset) => {
            if (!dataset.search.hasFilters)
                return;
            if (!!close)
                doCloseFilterBar();
            dataset.applyFilters();
        };

        d.search.doClearFilters = (dataset) => {
            stateDataset.clearFilters();
        }

        d.search.doOpenFilterBar = () => window.location.hash = filterHash;
        d.search.doOpenArrangeBar = () => window.location.hash = arrangeHash;
        return d;
    });

    useEffect(() => {
        return () => {
            stateDataset.beforeLoadRows = undefined;
            stateDataset.afterLoadRows = undefined;
            stateDataset.onErrorLoadingRows = undefined;
            stateDataset.onChangePage = undefined;
        }
    }, [stateDataset])

    const [canDetail] = useState(user.canDetail(masterDataset ? masterDataset.name : name, (masterDataset ? masterDataset.group : group) || ''));
    const [canInsert] = useState(user.canInsert(masterDataset ? masterDataset.name : name, (masterDataset ? masterDataset.group : group) || ''));
    const [canUpdate] = useState(user.canUpdate(masterDataset ? masterDataset.name : name, (masterDataset ? masterDataset.group : group) || ''));
    const [canDelete] = useState(user.canDelete(masterDataset ? masterDataset.name : name, (masterDataset ? masterDataset.group : group) || ''));

    if (isMobile) {
        if (!!mobileEdit)
            edit = mobileEdit;
        if (!!mobileRow)
            row = mobileRow;
        if (noMobilePageHeader !== undefined)
            noPageHeader = noMobilePageHeader;
        if (noMobileGridHeader !== undefined)
            noGridHeader = noMobileGridHeader;
        if (noMobileElevation !== undefined)
            noElevation = noMobileElevation;
    }

    const pageParams = useParams();

    let id: any = undefined;

    if (!detail && !!edit && !editModal)
        id = pageParams.id;
    else
        editModal = true;

    const [idHelper] = useState<any>({});

    useEffect(() => {
        idHelper.id = id;
    }, [id, idHelper])

    const [groupTitle, setGroupTitle] = useState(() => getModuleLabel(lang, group || '', name, ''));
    const [langGroupTitle, setLangGroupTitle] = useState(() => getModuleLabel(lang, langGroup || group || '', name, ''));

    const [pluralTitle, setPluralTitle] = useState(() => langGroupTitle || groupTitle || title || name);

    const [singularTitle, setSingularTitle] = useState(() => getModuleLabel(lang, langGroup || group || '', name, pluralTitle, true));
    const [femTitle] = useState(() => {
        const mod = getModuleDefs(lang, langGroup || group || '', name);
        return !!mod?.feminine
    });

    const [idTitle, setIdTitle] = useState(() => '#' + id);
    const [stateTitle, setStateTitle] = useState(() => {
        if (id === (Config.newPath || 'new'))
            return (femTitle ? lang.data.captions.femNew : lang.data.captions.new) + ' ' + singularTitle;
        return id !== undefined ? (singularTitle + ' ' + idTitle) : pluralTitle;
    });

    useEffect(() => {
        const gt = getModuleLabel(lang, group || '', name, '');
        const lgt = getModuleLabel(lang, langGroup || group || '', name, '');
        const pl = lgt || gt || title || name;
        const sg = getModuleLabel(lang, langGroup || group || '', name, pl, true);
        const idt = '#' + id;
        let tl = id !== undefined ? (sg + ' ' + idt) : pl;
        if (id === (Config.newPath || 'new'))
            tl = (femTitle ? lang.data.captions.femNew : lang.data.captions.new) + ' ' + sg;
        setGroupTitle(gt);
        setLangGroupTitle(lgt);
        setPluralTitle(pl);
        setSingularTitle(sg);
        setIdTitle(idt);
        setStateTitle(tl);
        if (!!stateDataset)
            stateDataset.lang = lang;
    }, [group, lang, langGroup, langGroupTitle, name, title, id, stateDataset, femTitle]);

    useEffect(() => {
        if (stateDataset && !noSearch) {
            setSearch(stateDataset.search);
            stateDataset.setTheme(theme.theme);
            return
        }
    }, [noSearch, setSearch, stateDataset, theme])

    const editHash = "#edit" + (detail ? ('_' + name) : '');
    const filterHash = "#filter";
    const arrangeHash = '#arrange';

    const [firstLoading, setFirstLoading] = useState(true);
    const [filterBarOpen, setFilterBarOpen] = useState(window.location.hash === filterHash);
    const [arrangeBarOpen, setArrangeBarOpen] = useState(window.location.hash === arrangeHash);

    const [openDialog] = useDialog();

    const [editModalOpen, setEditModalOpen] = useState(window.location.hash === editHash);

    // const afterSave = useCallback(() => {
    //     stateDataset?.getRows();
    // }, [stateDataset]);

    useEffect(() => {
        const onHashChange = () => {
            setEditModalOpen(window.location.hash === editHash);
            setFilterBarOpen(window.location.hash === filterHash);
            setArrangeBarOpen(window.location.hash === arrangeHash);
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, [editHash]);




    // const [lastId, setLastId] = useState<any>(() => id);
    // const [dataLoaded, setDataLoaded] = useState(false);

    // useEffect(() => {
    //     if (id !== lastId)
    //         setInitialized(false);
    //     setLastId(id);
    // }, [id, lastId]);


    const getData = useCallback(async (scrollUp?: boolean) => {
        if (noLimit)
            stateDataset.limit = 0;
        const y = pageRef?.current?.parentElement?.scrollTop || 0;
        try {
            if (stateDataset.rows.length === 0 && scrollUp !== undefined)
                setFirstLoading(true);

            await stateDataset.getRows(scrollUp === undefined);
            if (scrollUp !== undefined) {
                if (!!pageRef && !!pageRef.current) {
                    if (!!scrollUp)
                        pageRef.current.scrollIntoView({ behavior: 'smooth' });
                    else
                        pageRef.current.parentElement?.scrollTo(0, y);
                }
            }
        } catch (err) {
            setLoadingError(true);
            setFirstLoading(true);
            setLoading(false);
            // throw err;
        }
        setLoading(false);
    }, [noLimit, pageRef, stateDataset]);

    const getRecord = useCallback(async () => {
        if (id === (Config.newPath || 'new')) {
            if (!stateDataset.record)
                await stateDataset.new();
            stateDataset.updateEdit();
            return;
        }
        await stateDataset.edit(Number(id));
        stateDataset.updateEdit();
    }, [id, stateDataset]);

    let reloadTimerId: any;

    const createReloadTimeout = () => {
        if (!reloadTime)
            return;
        reloadTimerId = setTimeout(() => {
            if (idHelper.id === undefined)
                getData();
            createReloadTimeout();
        }, reloadTime);
        return reloadTimerId;
    }

    useEffect(() => {
        createReloadTimeout();
        return () => {
            if (!!reloadTimerId)
                clearTimeout(reloadTimerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (id === undefined)
            return
        if (!stateDataset.record || stateDataset.record.Id !== Number(id))
            getRecord();
    }, [getRecord, id, stateDataset]);


    useEffect(() => {
        if (id !== undefined)
            return
        if (!noSearch)
            setSearch(stateDataset.search)
        if (!detail && !noSearch) {
            if (id === undefined) {
                getData(false);
            }
        }
        else {
            // setDataLoaded(true);
            if (!ignoreInitialLoad)
                getData(false);
        }

    }, [detail, getData, id, ignoreInitialLoad, noSearch, setSearch, stateDataset.search])


    useEffect(() => {
        return () => {
            if (setSearch)
                setSearch({} as Search);
        }
    }, [id, setSearch]);


    const doLineClick = async (r: Record) => {
        if (!!onLineClick)
            onLineClick(r);
        if (!edit || !!readOnly)
            return;
        await stateDataset.edit(r.Id, r);

        if (editModal)
            return openEditModal();
        navigate('./' + r.Id.toString());
    }

    const isNewRec = () => !!stateDataset.record && stateDataset.record.$__new;

    const newClick = async () => {
        if (loading)
            return;
        await stateDataset.new();
        if (editModal)
            return openEditModal();
        navigate('./' + (Config.newPath || 'new'))
    }

    const deleteClick = () => {
        if (loading)
            return;
        if (stateDataset.selection.length === 0)
            return openDialog({ title: lang.data.captions.information, content: lang.data.messages.noRecordsSelected, variants: ['contained'], colors: ['primary'], buttons: ['ok'] });

        if (singleDeletetion && stateDataset.selection.length > 1) {
            stateDataset.selection.length = 1;
            stateDataset.updateGrid();
            enqueueSnackbar(lang.data.messages.singleDeleteMsg, { variant: 'warning', disableWindowBlurListener: true, autoHideDuration: 5000, });
        }
        openDialog({
            title: lang.data.captions.confirmation,
            content: lang.data.messages.deleteMsg,
            buttons: ['yes', 'cancel'],
            captions: [lang.data.captions.delete],
            variants: ['contained'],
            colors: ['red'],
            icons: [<Delete />],
            onClickYes: doDeleteSelection
        });
    }

    const doDeleteSelection = async () => {
        try {
            const count = await stateDataset.deleteSelection();
            enqueueSnackbar(formatStr(lang.data.messages.deleteSuccessMsg, [count]), { variant: 'success', disableWindowBlurListener: true, autoHideDuration: 2000, });
        } catch (err: any) {
            if (err?.error?.code && err?.error?.message) {
                const langMod = getModuleDefs(lang, langGroup || group || '', name);
                const msg = langMod?.errors?.[err?.error?.code] || err?.error?.message;
                enqueueSnackbar(msg, { variant: 'error', disableWindowBlurListener: true, autoHideDuration: 5000, });
                return
            }
            enqueueSnackbar(lang.data.messages.deleteErrorMsg, { variant: 'error', disableWindowBlurListener: true, autoHideDuration: 2000, });
        }
    }

    const doCloseFilterBar = () => {
        setFilterBarOpen(false);
        window.history.back();
    };

    const doCloseArrangeBar = () => {
        setArrangeBarOpen(false);
        window.history.back();
    };

    const [anchorElMoreMenu, setAnchorElMoreMenu] = useState<null | HTMLElement>(null);
    const handleMoreMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMoreMenu(event.currentTarget);
    };

    const handleMoreMenuClose = () => {
        setAnchorElMoreMenu(null);
    };

    const getMoreButton = () => {
        const visible = menu?.reduce((prev, m) => prev + (!!m.visible ? 1 : 0), 0);
        if ((!menu || visible === 0) && !printList && !exportList)
            return;
        return <IconButton onClick={(event) => handleMoreMenuClick(event)} ><MoreVert /></IconButton>
    }

    const getDefaultButtons = () => {
        if (!edit || !!readOnly)
            return getMoreButton();
        return (<>
            {canInsert && !noInsertButton ? <ColorButton label={lang.data.captions.new} color="primary" onClick={newClick} icon={<Add />} shrink={true} /> : undefined}
            {canDelete && !noDeleteButton ? <ColorButton label={lang.data.captions.delete} color="red" onClick={deleteClick} icon={<Delete />} shrink={true} /> : undefined}
            {getMoreButton()}
        </>);
    }

    const getMoreMenuItems = () => {
        if ((!menu || menu.length === 0) && !printList && !exportList)
            return;
        const items = [...(menu || [])];
        if (printList)
            items.push({ caption: lang.data.captions.printList, icon: <Print />, onClick: printListClick });
        if (exportList)
            items.push({ caption: lang.data.captions.exportList, icon: <FileDownload />, onClick: exportListClick });
        return items.map((i, index) => {
            if (i.visible === false)
                return undefined;
            return <MenuItem key={index} onClick={() => { handleMoreMenuClose(); i.onClick(stateDataset) }}>
                {i.icon ? <ListItemIcon>{i.icon}</ListItemIcon> : undefined}{i.caption}
            </MenuItem>
        });
    }

    const printListClick = async (dataset: Dataset) => {
        let req;

        if (dataset.selection.length > 0) {
            req = dataset.rows.filter(r => {
                return dataset.selection.indexOf(r) > -1
            });
        }
        else if (!dataset.resource)
            req = dataset.rows;
        else {
            req = (await dataset.api.get(dataset.resource, false, dataset.getConditions(dataset.searchText), false, dataset.orderField, dataset.sort, undefined, undefined, [...dataset.internalShowingFields, ...dataset.showingFields], dataset.hidingFields)).rows;
            if (schema.onGetList)
                schema.onGetList(req, dataset);
        }
        reportManager.print({ name: getModuleLabel(lang, group || '', name || '', '') }, <ListReport dataset={dataset} data={req} />);
    }

    const exportListClick = async (dataset: Dataset) => {
        let data;
        if (dataset.selection.length > 0) {
            data = dataset.rows.filter(r => {
                return dataset.selection.indexOf(r) > -1
            });
        }
        else
            if (!dataset.resource)
                data = dataset.rows;
            else {
                data = (await dataset.api.get(dataset.resource, false, dataset.getConditions(dataset.searchText), false, dataset.orderField, dataset.sort, undefined, undefined, [...dataset.internalShowingFields, ...dataset.showingFields], dataset.hidingFields)).rows;
                if (schema.onGetList)
                    schema.onGetList(data, dataset);
                dataset.treatRows(data);
            }

        reportManager.export(data, { name: getModuleLabel(lang, group || '', name || '', ''), dataset: dataset });
    }

    const openEditModal = () => {
        // setEditModalOpen(true);
        window.location.hash = editHash;
    }

    const handleEditModalClose = (refresh: boolean) => {
        if (detail)
            stateDataset.cancel();
        setEditModalOpen(false);
        window.history.back();
        if (!!refresh)
            getData(false);
    }

    const getEditModal = () => {
        if (!editModal || !edit)
            return;
        const bkProp: any = { timeout: 250 };
        if (showCancelDialog)
            bkProp.onClick = () => { };
        return (
            <Modal
                open={editModalOpen}
                onClose={() => handleEditModalClose(false)}
                BackdropComponent={Backdrop}
                BackdropProps={bkProp}
                className={rootClasses.EditModal}
                disableScrollLock
            >
                <Box className={modalLarge ? rootClasses.ModalLarge : rootClasses.ModalSmall}>
                    <EditPage
                        id={isNewRec() ? (Config.newPath || 'new') : id}
                        name={name}
                        group={group}
                        dataset={stateDataset}
                        edit={edit}
                        closeModal={handleEditModalClose}
                        pageClasses={classes}
                        showCancelDialog={showCancelDialog}
                        canInsert={canInsert}
                        canUpdate={canUpdate}
                    // afterSave={afterSave}
                    />
                </Box>
            </Modal>
        )
    }

    const getHelmet = () => {
        if (!!detail || noPageHeader || noHelmet)
            return;
        return <Helmet>
            <title>{stateTitle} | {Config.name}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        </Helmet>
    }

    const getEditPage = () => {

        if (!edit)
            return;
        return (
            <>
                {getHelmet()}
                <Box className={noPadding ? rootClasses.BoxContentNoPadding : rootClasses.BoxContent}>
                    <PageTitle title={stateTitle} plural={pluralTitle} />
                    <EditPage
                        id={id}
                        name={name}
                        group={group}
                        langGroup={langGroup}
                        dataset={stateDataset}
                        edit={edit}
                        pageClasses={classes}
                        showCancelDialog={showCancelDialog}
                        canInsert={canInsert}
                        canUpdate={canUpdate}
                    // afterSave={afterSave}
                    />
                </Box>
            </>
        )
    }

    const getGridPage = () => {
        return (<div className={'DataViewPage ' + rootClasses.RootDiv + ' ' + (detail ? rootClasses.RootDivDetail : '')}>
            {dataset?.search.hasFilters ? <FilterBar open={filterBarOpen} search={search} doClose={doCloseFilterBar} /> : undefined}
            {!ignoreArrange && !noGridHeader ? <ArrangeBar search={search} open={arrangeBarOpen} doClose={doCloseArrangeBar} /> : undefined}
            {getHelmet()}
            <Box className={noPadding ? rootClasses.BoxContentNoPadding : rootClasses.BoxContent}>
                {noPageHeader ? undefined :
                    <PageTitle title={pluralTitle} detail={detail || noHelmet} >
                        <div className={(detail || noHelmet) ? rootClasses.ButtonsDetail : ''} >
                            {getDefaultButtons()}
                            {buttons}
                        </div>
                    </PageTitle>}

                {type === 'grid' || !card ?
                    <DataGrid
                        name={name}
                        group={langGroup || group}
                        dataset={stateDataset}
                        onLineClick={doLineClick}
                        loading={loading}
                        loadingError={loadingError}
                        firstLoading={firstLoading}
                        doRefresh={() => getData(false)}
                        searching={!!stateDataset.searchText}
                        minWidth={minWidth}
                        row={row}
                        customClasses={classes}
                        readOnly={readOnly}
                        canInsert={!readOnly && canInsert}
                        canDetail={canDetail || canUpdate}
                        noHeader={noGridHeader}
                        noElevation={noElevation}
                        noLimit={noLimit}
                        defaultOrder={defaultOrder}
                        defaultSort={defaultSort}
                        noSelection={noSelection}
                        ignoreArrange={ignoreArrange}
                    /> :
                    <CardDataView
                        name={name}
                        group={langGroup || group}
                        dataset={stateDataset}
                        onCardClick={doLineClick}
                        loading={loading}
                        loadingError={loadingError}
                        firstLoading={firstLoading}
                        doRefresh={() => getData(false)}
                        searching={!!stateDataset.searchText}
                        minWidth={minWidth}
                        card={card}
                        customClasses={classes}
                        readOnly={readOnly}
                        canInsert={!readOnly && canInsert}
                        canDetail={canDetail}
                        noHeader={noGridHeader}
                        noElevation={noElevation}
                        noLimit={noLimit}
                        noPaper={noPaper}
                    />
                }
                {getEditModal()}
            </Box>

            <Menu
                id="action-more-menu"
                anchorEl={anchorElMoreMenu}
                keepMounted
                open={Boolean(anchorElMoreMenu)}
                onClose={handleMoreMenuClose}
            >
                {getMoreMenuItems()}

            </Menu>
        </div>);
    }

    return (
        <div className={'DataViewPageRoot ' + rootClasses.Root} ref={pageRef}>
            <DatasetContext.Provider value={stateDataset}>
                {!!id ? getEditPage() : getGridPage()}
            </DatasetContext.Provider>
        </div>
    );
}

export default DataViewPage;
