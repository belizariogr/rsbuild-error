import { IConfig } from "./core/types";

const Config: IConfig = {
    name: 'Boa Gestão',
    version: 'Pro',
    host: `${process.env.PUBLIC_HOST}`,
    protocol: `${process.env.PUBLIC_PROTOCOL}`,
    appKey: `${process.env.PUBLIC_APPKEY}`,

    api: `${process.env.PUBLIC_API}`,
    ws: `${process.env.PUBLIC_WS}`,
    wsPath: `${process.env.PUBLIC_WS_PATH}`,
    uploads: `${process.env.PUBLIC_UPLOADS}`,

    notificationsPublicKey: `${process.env.PUBLIC_UPLOADS}`,
    useDesktopNotifications: process.env.PUBLIC_UPLOADS === 'true',

    footnotes: `${process.env.PUBLIC_FOOTNOTES}`,

    multiDomain: false,
    multiServer: false,

    registerEndpoint: `${process.env.PUBLIC_REGISTER_PATH}`,
    myAccountPath: `${process.env.PUBLIC_MYACCOUNT_PATH}`,
    newPath: `${process.env.PUBLIC_NEW_PATH}`,
    editPath: `${process.env.PUBLIC_EDIT_PATH}`,
    // defaultLang: 'pt-br',

    async onGetOthers(helper, api) {
        helper.company = (await api.get('empresa', false, 'hiding=SystemOptions|qboClientId|qboSandBoxClientId|TributosServicos'))?.rows?.[0]
    },

    debug: process.env.PUBLIC_DEBUG === 'true',
    debug_account: `${process.env.PUBLIC_DEBUG_ACCOUNT}`,
};

export default Config;
