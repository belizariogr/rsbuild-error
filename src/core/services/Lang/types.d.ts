export type MasksData = {
    date: string;
    time: string;
    datetime: string;
    phone: string;
    zip: string;
    cpfcnpj: string;
}

export type FormatsData = {
    date: string;
    time: string;
    shortTime: string;
    datetime: string;
    fullDatetime: string;
    dateSperator: string;
    timeSeparator: string;
    decimalSeparator: string;
    thousandSeparator: string;
    show24Hour: boolean;
    monthOfYear: string;
    true: string;
    false: string;
}

export type DatesData = {
    months: string[];
    monthsShort: string[];
    days: string[];
    today: string;
}

export type CaptionsData = {

    myAccount: string;
    darkMode: string;
    lightMode: string;
    langs: string;
    settings: string;
    logout: string;
    notifications: string;
    noNotifications: string;

    confirmation: string;
    information: string;
    warning: string;
    error: string;
    ok: string;
    yes: string;
    no: string;
    cancel: string;
    close: string;
    clear: string;
    and: string;
    tryAgain: string;

    new: string;
    femNew: string;
    edit: string;
    editing: string;
    viewing: string;
    delete: string;
    save: string;
    apply: string;
    or: string;
    add: string;
    to: string;
    all: string;
    with: string;

    page: string;
    recordsPerPage: string;
    noRecordsFound: string;

    searchBox: string;
    noOptions: string;
    noOptionsSearch: string;
    searching: string;

    filterHeader: string;
    filter: string;
    // cleanFilters: string;

    startDate: string;
    endDate: string;
    today: string;

    noOptionsAvailable: string;

    themeHeader: string;
    langHeader: string;

    enterAccount: string;
    proceed: string;
    dontKnowMyAccount: string;

    accessAccount: string;
    recoverAccount: string;

    createAccount: string;
    accountName: string;
    company: string;
    email: string;
    user: string;
    name: string;
    createAccButton: string;

    username: string;
    password: string;
    passwordConfirmation: string;
    remember: string;
    login: string;
    recover: string;

    forgotPassword: string;
    register: string;
    changeAccount: string;

    importImageButton: string;
    importImageLabel: string;

    arrangeFields: string;
    arrange: string;
    resetToDefault: string;


    print: string;
    printList: string;
    exportList: string;

    more: string,
    less: string,
    equalsLastPeriod: string;

    days: string;

    phone: string;
    update: string;
    dismiss: string;
    featuredText: string;
    promotionText: string;

    sendBack: string;
    bringFront: string;
    copy: string;
    paste: string;

    sendEmail: string;
}

export type MessagesData = {

    newVersion: string;

    invalidUserPassword: string;
    accountSuspended: string;

    accountNotFound: string;
    errorCheckingAccount: string;

    errorLogin: string;


    gridErrorHeader: string;
    gridErrorText: string;
    gridNotFoundHeader: string;
    gridNotFoundText: string;
    noRecordsSelected: string;
    cancelRecord: string;
    deleteMsg: string;
    deleteItem: string;
    singleDeleteMsg: string;
    deleteSuccessMsg: string;
    deleteErrorMsg: string;

    requiredField: string;
    fieldTooSmall: string;
    fieldTooLong: string;
    canContainsLettersNumbers: string;
    passwordConfirmationDoesntMatch: string;

    saveSuccessMsg: string;
    saveErrorMsg: string;
    saveValidationError: string;

    recoverSuccess: string;
    recoverError: string;

    registrationError: string;
    accountExistsError: string;

    invalidFieldValue: string;
    invalidDateFilter: string;
    invalidEmail: string;

    uploadImageDeleteConfirmation: string;
    uploadImageError: string;
    uploadImageTypesWarning: string;
    uploadImageLimitWarning: string;
    uploadImageSizeWarning: string;
    uploadImageMaxDimensionsWarning: string;
    uploadImageMinDimensionsWarning: string;

    noItems: string;
    duplicatedItems: string;
    noOptions: string;

    errorGettingData: string;

    emailSent: string;
    errorSendingEmail: string;

}

export type LangData = {
    localeCode: string;
    languageCode: string;
    dialCode: string;
    masks: MasksData;
    formats: FormatsData;
    dates: DatesData;
    captions: CaptionsData;
    messages: MessagesData;
    coreModules: { [key: string]: any }
}



export interface HashTable<T> {
    [key: string]: T
}

export type PhoneCountry = {
    name: string;
    code?: string;
    dial: string;
    flag: JSX.Element;
    mask: string;
}

export type PhoneCountryList = PhoneCountryList<PhoneCountry>;

export type Lang = {
    name: string;
    code: string;
    countries: number[];
    locale: any;
    icon: any;
    data: LangData;
    phoneCodes: PhoneCountryList;
    modules: any;
}

export type Langs = Lang[];


export type LangContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
}