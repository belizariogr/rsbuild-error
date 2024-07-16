import { Fragment, useEffect, useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LangBar from '../LangBar';
import MainNavbar from '../MainNavbar';
import { MainLayoutRoot, MainLayoutWrapper, MainLayoutContainer, MainLayoutContent } from './styles';
// import Scrollbar from 'react-perfect-scrollbar';

import packageJson from '../../../../../package.json';
import { useSnackbar } from 'notistack';
import { useLang } from '../../../services/Lang';
import { Button } from '@material-ui/core';
import { useUser } from '../../../services/User';
import SideBar from '../SideBar';
import { getStorage, setStorage } from '../../../services/Utils';
import { dateDiff } from '../../../services/Utils/date';


import { useApi } from '../../../services/Api';

const MainLayout = () => {
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const [versionPopup, setVersionPopup] = useState(true);

    const mobileOpenClick = () => { setMobileNavOpen(true) }
    const mobileClose = () => { setMobileNavOpen(false) }

    const { enqueueSnackbar } = useSnackbar();
    const { lang } = useLang();
    const { user } = useUser();
    const api  = useApi();

    const langHash = '#langs';

    const [langBarOpen, setLangBarOpen] = useState(window.location.hash === langHash);
    const doOpenLangBar = () => window.location.hash = langHash;
    const doCloseLangBar = () => {
        setLangBarOpen(false);
        window.history.back();
    };

    const doAction = () => {
        setStorage('lastUpdate', (new Date()).toISOString());
        window.location.reload();
    }

    useEffect(() => {
        if (versionPopup) {
            setVersionPopup(false);
            const version = packageJson.version;
            if (version !== user.lastClientVersion) {



                const lastUpdate = new Date(getStorage('lastUpdate') || 0);
                if (dateDiff(lastUpdate, new Date()) > 1)
                    setTimeout(() => {
                        doAction()
                    }, 1000);
                enqueueSnackbar(lang.data.messages.newVersion,
                    {
                        variant: 'warning',
                        disableWindowBlurListener: true,
                        persist: true,
                        action: (key: any) => (
                            <Fragment>
                                <Button onClick={doAction} style={{ color: 'white' }}>
                                    {lang.data.captions.update}
                                </Button>
                            </Fragment>
                        )

                    });
            } else {
                setStorage('lastUpdate', undefined);
            }
        }

        const onHashChange = () => {
            setLangBarOpen(window.location.hash === langHash)
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainLayoutRoot>
            <MainNavbar onMobileNavOpen={mobileOpenClick} doOpenLangBar={doOpenLangBar} />
            <SideBar onMobileClose={mobileClose} openMobile={isMobileNavOpen} />
            <LangBar open={langBarOpen} doClose={doCloseLangBar} />
            <MainLayoutWrapper>
                <MainLayoutContainer>
                    <MainLayoutContent>
                        <Suspense fallback={'Loading...'}>
                            <Outlet />
                        </Suspense>
                    </MainLayoutContent>

                </MainLayoutContainer>
            </MainLayoutWrapper>
        </MainLayoutRoot>
    );
};
export default MainLayout;
