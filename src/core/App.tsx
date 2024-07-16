import { Suspense, useCallback, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Theme, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import GlobalStyle from './styles/global';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { notAuthenticatedRoutes, getUserRoutes, notAuthenticatedRoutesNames, disconnectedRoutes } from './services/UserRouter';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useApi, ApiProvider } from './services/Api';
import LoadingScreen from './components/layout/LoadingScreen';
import { useEffect } from 'react';
import Utils, { setStorage } from './services/Utils';
import { UserContext } from './services/User';
import { SearchContext } from './services/Search';
import { Search } from './services/Search/types';

import { LangList, LangContext } from './services/Lang';
import { ThemeList } from '../themes';
import { ThemeContext } from './services/Theme';
import { BGTheme } from './services/Theme/types';
import Config from '../config';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { AccountInfo, User } from './services/User/types';

import { Lang } from './services/Lang/types';
import AccountSelect from './pages/AccountSelect';
import { strToBase64Ex } from './services/Utils/strings';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    const api = useApi();

    const [search, setSearch] = useState({} as Search);
    const [loading, setLoading] = useState(false);
    const [routes, setRoutes] = useState(notAuthenticatedRoutes);
    const routing = useRoutes(routes);
    const navigate = useNavigate();
    api.navigate = navigate;

    const { pathname } = useLocation();
    const [account] = useState(() => {
        const acc = Utils.getAccount(Config)
        return acc;
    });


    const [lang, setLang] = useState(() => {
        const defLang = Config.defaultLang?.toLowerCase() || navigator.language.toLowerCase();

        let browserLang = LangList.find((l) => l.locale.code.toLowerCase() === defLang);
        let lang = browserLang || LangList[0];
        if (Config.defaultLang)
            return lang;
        const currentLang = localStorage.getItem(`lang`);
        if (!!currentLang) {
            for (let i = 0; i < LangList.length; i++) {
                const l = LangList[i];
                if (l.code === currentLang) {
                    lang = l;
                    break;
                }
            }
        }
        return lang
    });

    const [accountInfo, setAccountInfo] = useState<AccountInfo>(() => ({ loading: true, lang: !Config.defaultLang }));
    const [user, setUser] = useState<User>(() => {
        const u = new User('');
        if (!accountInfo.lang && lang !== LangList[0]) {
            setLang(LangList[0]);
            setStorage('lang', LangList[0].code);
        }
        return u;
    });

    const [theme, setTheme] = useState<BGTheme>(() => {
        let theme = ThemeList[0];
        const currentTheme = localStorage.getItem(`theme`);
        if (!!currentTheme) {
            for (let i = 0; i < ThemeList.length; i++) {
                const t = ThemeList[i];
                if (t.name === currentTheme) {
                    theme = t;
                    break;
                }
            }
        }
        setStorage('theme', theme.name);
        return theme;
    });

    const gotoLogin = (account: string | undefined) => {
        localStorage.removeItem(Config.multiDomain ? (account + '.auth') : 'auth');
        navigate('/login');
        setLoading(false);
    }

    const getAccountInfo = useCallback(async () => {
        if (!Config.multiDomain || !account || disconnectedRoutes.includes(pathname))
            return
        try {
            api.baseUrl = Config.api;
            const resp = await api.get('_account', true, 'name=' + account);

            if (resp.api && Config.multiServer) {
                api.baseUrl = resp.api;
            }
            resp.account = account;
            resp.loading = false;
            setAccountInfo(resp);
            if (!resp.lang && lang !== LangList[0]) {
                setLang(LangList[0]);
                setStorage('lang', LangList[0].code);
            }
            return resp;
        } catch (err: any) {
            if (err?.code === 1) {
                window.location.href = window.location.protocol + '//app.' + Config.host + '/';
                return
            }
            setAccountInfo({ loading: false });
        };
    }, [account, api, lang]);

    useEffect(() => {
        if (notAuthenticatedRoutesNames.includes(pathname)) {
            if (api.user)
                api.user.authenticated = false;
            api?.notifications?.close();
            setLoading(false);
            return
        }
    }, [api, pathname]);

    useEffect(() => {
        getAccountInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    const getPermissions = async () => {

        try {
            if (!loading)
                setLoading(true);
            let accInfo: AccountInfo = accountInfo;
            if (Config.multiDomain && !accountInfo) {
                accInfo = await getAccountInfo();
            }
            if (!accInfo?.lang && lang !== LangList[0]) {
                setLang(LangList[0]);
                setStorage('lang', LangList[0].code);
            }
            api.account = account;
            api.accB64 = strToBase64Ex(account);
            if (!Config.multiDomain) {
                api.account = localStorage.getItem('account') || '';
                api.accB64 = api.account;
            }
            const rt = await api.refreshToken(true);
            const newUser = User.parse(rt);

            api.user = newUser;
            api.accountId = newUser.tenantId;
            newUser.authenticated = true;

            api.notifications.connectWS();
            const helper: any = {};
            const othersHelper: { [key: string]: any } = {};

            await Promise.all([
                (async () => { helper.permissions = await api.get('permissions', true) })(),
                (async () => { helper.options = await api.get('options', true) })(),
                (async () => { await Config.onGetOthers?.(othersHelper, api) })(),
            ]);

            newUser.others = othersHelper;
            newUser.systemOptions = helper.options;
            Utils.updateManifest(Utils.getManifestObj(Config.name, newUser?.others?.company?.NomeFantasia || newUser?.others?.company?.NomeEmpresa, account), "#manifest-placeholder")

            const permissions = helper.permissions;
            Utils.setPermissions(newUser, permissions);
            const userRoutes = getUserRoutes(newUser);
            setRoutes(userRoutes.routes);
            newUser.routes = userRoutes.visible;

            setUser(newUser);
            if (!!window.location.hash)
                navigate(window.location.pathname);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            user.authenticated = false;
            // console.log(err)
            return navigate('/login');
        }
    };

    useEffect(() => {
        if (!account && Config.multiDomain) {
            return
        }
        const isAuthenticated = (localStorage.getItem(Config.multiDomain ? (account + '.auth') : 'auth') || '') === 'true';
        if (!isAuthenticated)
            return gotoLogin(account);
        if (pathname === '/reconnect') {
            window.location.pathname = localStorage.getItem('lastPath') || '/';
            setLoading(false);
            return
        }
        if (notAuthenticatedRoutesNames.includes(pathname) && !user.redirected) {
            api.notifications?.close();
            setLoading(false);
            return
        }
        if (!user.authenticated || user.redirected) {
            user.authenticated = true;
            getPermissions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        if (!!account || !Config.multiDomain)
            return
        if (window.location.pathname !== '/' && window.location.pathname !== ('/' + (Config.registerEndpoint || 'register')))
            navigate('/')
    }, [account, navigate])

    const loadingScreen = (theme: Theme) => <LoadingScreen theme={theme} />;

    const contentScreen = (theme: Theme) => (
        <>
            <GlobalStyle />
            <Suspense fallback={<LoadingScreen theme={theme} />}>
                {!account && Config.multiDomain && window.location.pathname === '/' ? <AccountSelect /> : routing}
            </Suspense>
        </>
    );

    const doSetLang = (lang: Lang) => {
        document.documentElement.lang = lang.locale.code;
        setLang(lang);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ApiProvider>
                <UserContext.Provider value={{ user, setUser, accountInfo, setAccountInfo }}>
                    <LangContext.Provider value={{ lang, setLang: doSetLang }}>

                            <ThemeContext.Provider value={{ theme, setTheme }}>
                                <ThemeProvider theme={theme.theme || ThemeList[0].theme}>


                                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={lang.locale}>

                                                    <SearchContext.Provider value={{ search, setSearch }}>
                                                        {loading ? loadingScreen(theme.theme) : contentScreen(theme.theme)}
                                                    </SearchContext.Provider>

                                            </MuiPickersUtilsProvider>


                                </ThemeProvider>
                            </ThemeContext.Provider>

                    </LangContext.Provider>
                </UserContext.Provider>
            </ApiProvider>
        </QueryClientProvider>
    )
}

export default App;
