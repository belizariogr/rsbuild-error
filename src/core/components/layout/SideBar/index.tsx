import { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink, matchPath } from 'react-router-dom';
import { SidebarProps, Route, RouteArray, MenuItem, MenuItemArray } from '../../../types';
import Config from '../../../../config';
import { useUser } from '../../../services/User';
import { Box, Drawer, Hidden, List } from '@material-ui/core';
import Scrollbar from 'react-perfect-scrollbar';
import { useTheme } from '../../../services/Theme';
import { getModuleLabel, useLang } from '../../../services/Lang';
import useStyles from './styles';
import NavItem from './NavItem';


const SideBar: React.FC<SidebarProps> = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();
    const [items, setItems] = useState<MenuItemArray>([]);
    const { lang } = useLang();

    const { theme } = useTheme();

    const [listItemOpened, setListItemOpened] = useState<MenuItem | undefined>(undefined);

    const doOpenListItem = (item: MenuItem) => {
        if (item.children === undefined) return;
        if (!!listItemOpened && listItemOpened !== item)
            listItemOpened.open = false;
        setListItemOpened(item);
        if (item !== listItemOpened)
            item.open = true;
        else
            item.open = !item.open;
        setItems([...items]);
    }

    const isRouteActive = (r: Route) => {
        if (!r.path)
            return false;
        return !!matchPath({ path: r.path, end: false }, location.pathname);
    }
    const { user } = useUser();

    const getMenuItems = (routes: RouteArray, itArr: MenuItemArray, root?: MenuItem) => {
        routes.forEach((r: Route) => {
            if (r.menu === false)
                return;
            const item: MenuItem = {
                name: r.name,
                href: r.path || '',
                label: r.header || r.label || r.name,
                isHeader: !!r.header,
                icon: r.icon,
                group: r.group,
                internalGroup: r.internalGroup,
                internalName: r.internalName,
            };
            itArr.push(item);
            if (!!root && isRouteActive(r)) {
                setListItemOpened(root);
                root.open = true;
            }

            if (!!r.children) {
                item.children = [];
                getMenuItems(r.children, item.children, item);
            }
        });

    }

    const getRoutes = () => {
        items.length = 0;
        const routes: RouteArray = user.routes;
        if (!!routes)
            getMenuItems(routes, items);
    };

    useEffect(() => {
        getRoutes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.routes])


    useEffect(() => {
        if (openMobile && onMobileClose)
            onMobileClose();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const content = () => (
        <Box className={classes.Content}>

            <RouterLink to="/" >
                <Box className={classes.LogoBase + ' ' + (theme.hideLogoText ? classes.LogoFull : classes.Logo)}>
                    <div className={classes.LogoContent}>
                        {theme.logo} {!theme.hideLogoText && Config.name}
                        {!theme.hideLogoVersion && <span className={classes.Tag}>{Config.version}</span>}
                    </div>
                </Box>
            </RouterLink>

            <Box className={classes.Items}>
                <Scrollbar >
                    <List className={classes.ListItem}>
                        {items.map((item, index) => <NavItem key={index} href={item.href} label={getModuleLabel(lang, item.internalGroup || item.group || '', item.internalName || item.name, item.label)} icon={item.icon} open={item.open} isheader={item.isHeader} children={item.children} onOpen={() => doOpenListItem(item)} />)}
                    </List>
                </Scrollbar>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer anchor="left" onClose={onMobileClose} open={openMobile} variant="temporary" className={classes.Drawer}>
                    {content()}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer anchor="left" open variant="persistent" className={classes.Drawer}>
                    {content()}
                </Drawer>
            </Hidden>
        </>
    );
};

export default SideBar;