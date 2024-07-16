import { Dispatch, SetStateAction } from "react";
import { Lang } from "../services/Lang/types";
import { UserPermission } from "../services/User/types";
import Dataset, { DatasetValidation } from "../services/Dataset/Dataset";
import { ApiInterface } from "../services/Api/types";

export interface IConfig {
    name: string
    version: string
    host: string
    protocol: string
    appKey: string
    useDesktopNotifications: boolean
    notificationsPublicKey: string
    api: string
    ws?: string
    wsPath?: string
    uploads: string
    multiDomain?: boolean
    multiServer?: boolean
    debug?: boolean
    debug_account?: string
    registerEndpoint?: string

    dashboardPath?: string
    myAccountPath?: string
    newPath?: string
    editPath?: string
    defaultLang?: string

    footnotes: string

    onGetOthers?: (helper: { [key: string]: any }, api: ApiInterface) => void;
}

export type SidebarProps = {
    onMobileClose: () => void,
    openMobile: boolean
}

export type MenuItem = {
    name: string;
    group?: string;
    href: string;
    label: string;
    icon?: any;
    isHeader: boolean;
    children?: MenuItemArray;
    open?: boolean;
    onOpen?: () => void;
    internalGroup?: string;
    internalName?: string;
}

export type MenuItemArray = MenuItem[];

export type Route = {
    key?: string;
    pathGenerated?: boolean;
    name: string;
    header?: string;
    label?: string;
    resource?: string;
    readOnly?: boolean;
    group?: string;
    isGroup?: boolean;
    path?: string;
    element?: any;
    icon?: any;
    children?: Route[];
    owner?: Route;
    menu?: boolean;
    permissions?: UserPermission;
    dependencies?: UserPermission[];
    ifHaveModules?: string[]
    ifDoesntHaveModules?: string[]
    options?: string[];
    hidden?: boolean;
    public?: boolean;
    core?: boolean;
    internalName?: string;
    internalGroup?: string;
}

export type RouteArray = Route[];

export type Module = {
    name: string;
    routes: RouteArray;
    public?: boolean
    showsif?: string[],
    ignoreDahsboard?: boolean;
}

export type ModuleArray = Module[];

export type RouteGroup = {
    name: string;
    label?: string;
    icon?: any;
}

export type RouteGroupArray = RouteGroup[];

export type DataType = "string" | "integer" | "float" | "bool" | "date" | "time" | "datetime" | "options" | "table" | "meta";
// export type FilterType = "bool" | "date" | "options";

//export enum DataType { "string", "integer", 'float', 'bool', 'date', 'time' };
//export enum FieldAlignment { 'left', 'center', 'right' };
export type GetOptions = (record: Record, field: Field, search: string, dataset: Dataset, lang: Lang) => any;

export type UpdateOptions = {
    sender: string;
    setOptions: Dispatch<SetStateAction<any[]>>;
    setSelectedOption: (options: any[]) => any;
}

export type UpdateFieldHelper = {
    uuid: string;
    doUpdate: (field: Field, dataset: Dataset) => void;
}

export type Field = {
    name: string;
    dataType: DataType;
    primaryKey?: boolean;
    hidden?: boolean;

    size?: number;
    fieldSize?: number;
    absSize?: boolean;
    displayLabel?: string;
    displayFormat?: string;
    mask?: string;
    alignment?: string;
    sortable?: boolean;
    searchable?: boolean;
    required?: boolean;
    onChange?: (newVal: any, oldVal: any, dataset: Dataset) => void;
    onClick?: (r: any, dataset: Dataset) => void;
    ifEmpty?: boolean;
    zeroEmpty?: boolean;
    getValue?: (text: string, value: any, record: any, field: Field, dataset: Dataset, lang: Lang, option: any, classes: any, isPrinting: boolean, isExporting: boolean) => any;
    decimalCount?: number;
    options?: any[];
    optionsText?: string;
    optionsKey?: string;
    optionsIcon?: string;
    optionsIconList?: boolean;
    optionsTextFieldName?: string;
    cacheOptions?: boolean;
    searchOptions?: boolean;
    initalSearch?: boolean;
    getOptions?: GetOptions;
    optionsInitialized?: boolean;
    format?: string;
    readOnly?: boolean;
    detailSchema?: Schema;
    print?: boolean;
    printTotalize?: boolean;
    export?: boolean;
    ignoreChecks?: boolean;
    tag?: any;
    updateOnEditUpdate?: boolean;
    ignoreArrange?: boolean;
    forceShowIfVisible?: boolean;
    updateOptionsList?: UpdateOptions[];
    doUpdateOptions?: (field: Field, options: any[], ignoreUpdateValue?: boolean) => void;
    updateOptions?: (field: Field, search?: string, ignoreUpdateOptions?: boolean, ignoreUpdateValue?: boolean, forceUpdate?: boolean) => void;
    updateInputsHelper?: UpdateFieldHelper[];
    updateInputs?: () => void;
    updateValue?: (field: Field, dataset: Dataset) => void;
    defaultHidden?: boolean;
    defaultIndex?: number;
};

export type FieldList = Field[];

export type FilterValues = {
    used?: boolean;
    startValue?: any;
    endValue?: any;
    selected?: any[];
}

export type Filter = {
    name: string;
    field: string;
    type: DataType;
    showMonth?: boolean;
    useColumns?: boolean;
    displayLabel?: string;
    values?: FilterValues;
    temp?: FilterValues;
    ignoreStore?: boolean;
    options?: any[];
    optionsText?: string;
    optionsKey?: string;
    optionsIcon?: string;
    minimized?: boolean;
    executeOnChange?: boolean;
    dataset?: Dataset;
    hidden?: boolean;
    doClear?: (ignoreInitialValues?: boolean) => void;
    getInitialValues?: (values: FilterValues, filter: Filter, dataset: Dataset) => void;
    getOptions?: (filter: Filter, dataset: Dataset) => any;
    buildOption?: (option: any, text: string, filter: Filter, dataset: Dataset, lang: Lang) => any;
}

export type FilterList = Filter[];


export interface Schema {
    fields: FieldList;
    filters?: FilterList;
    onCreated?: (dataset: Dataset) => void;
    onNewRecord?: (record: any, dataset: Dataset) => void;
    afterNewRecord?: (record: any, dataset: Dataset) => void;
    afterEditRecord?: (record: any, dataset: Dataset) => void;
    beforeGetRows?: (dataset: Dataset) => void;
    onGetList?: (rows: any[], dataset: Dataset) => void;
    beforeGetRecord?: (dataset: Dataset) => void;
    onGetRecord?: (record: any, dataset: Dataset) => void;
    onValidate?: (record: any, dataset: Dataset, lang: Lang) => void | string | DatasetValidation | undefined;
    beforeSave?: (record: any, dataset: Dataset) => void;
    afterSave?: (record: any, dataset: Dataset) => void;
    onSaveError?: (record: any, error: any, dataset: Dataset) => void;
    beforeDelete?: (dataset: Dataset) => void;
    afterDelete?: (dataset: Dataset) => void;
    onClearFilters?: (dataset: Dataset) => void;
}

export type Record = {
    Id: number;
    $__new?: boolean;
    $__selected?: boolean;
} &
{
    [key: string]: any
}

export interface IEdit {
    dataset: Dataset;
    classes: any;
    setRootClass: (className: string) => void;
    id: string;
    forceRender: () => void;
    beforeCancel?: () => void;
    afterCancel?: () => void;
    cancelClickNo?: () => void;
}

export interface IRow {
    rowKey: any;
    record: any;
    dataset: Dataset;
    visibleFields: Field[];
    checkCell?: (record: Record) => JSX.Element | undefined | void;
    actionCell?: (record: Record, onlyContent?: boolean, small?: boolean) => JSX.Element | undefined | void;
    onLineClick?: (record: any) => void;
    getCell: (record: any, field: Field, dataset: Dataset, index: number,) => any;
    getCellContent: (value: any, record: any, field: Field, dataset: Dataset) => any;
    rootClasses: any;
    classes?: any;
    fieldName?: string;
}

export interface ICard {
    cardKey: any;
    record: any;
    dataset: Dataset;
    onCardClick?: (record: Record) => void;
    rootClasses: any;
    classes?: any;
}

export type MoreMenuItem = {
    caption: string;
    icon?: any;
    onClick: (dataset: Dataset) => void;
    visible?: boolean;
}

export type MoreMenuItemArray = MoreMenuItem[];

export interface IImage {
    id: number;
    source: string;
    full: string;
}

export interface IUpdateHelper {
    updateGrid: () => void;
    updateEdit?: () => void;
    fields: Field[];
}

export interface IReport {
    data?: any;
    dataset?: Dataset;
    classes?: any;
    tag?: any;
}

export interface IDialogModal {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    record?: any;
    autoClose?: boolean;
    dataset?: Dataset;
}

export interface IDialog {
    classes?: any;
    record?: any;
    dataset?: Dataset;
}
