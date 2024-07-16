import { HTMLAttributes } from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';
import useStyles from './styles';

import { ListItem, ListItemIcon, ListItemText, Typography, Collapse, List, Box } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { MenuItemArray } from '../../../../types';
import { getModuleLabel, useLang } from '../../../../services/Lang';


interface Props extends HTMLAttributes<HTMLElement> {
    href: string,
    label: string,
    icon: any,
    children?: MenuItemArray,
    open?: boolean,
    isheader: boolean,
    issubitem?: boolean,
    onOpen?: () => void,
}

const NavItem: React.FC<Props> = ({ href, label, icon, children, isheader, issubitem, open, onOpen, ...props }) => {

    const classes = useStyles();
    const subItems = children || [];
    const location = useLocation();
    const { lang } = useLang();
    const isRouteActive = (path: string) => (href ? !!matchPath({ path, end: false }, location.pathname) : false);

    const navItemWithRouter = () => {
        const selected = isRouteActive(href);
        return (
            <ListItem button disableGutters selected={selected} className={classes.ListItem + ' ' + (selected ? classes.Selected : '')} component={RouterLink} to={href} onClick={onOpen} {...props}>
                <Box className={classes.Content}>
                    <ListItemIcon className={issubitem ? classes.SubItemIcon : classes.Icon}>{icon}</ListItemIcon>
                    <ListItemText className={classes.Text}><Typography className={issubitem ? classes.SubItemText : classes.ItemText}>{label}</Typography></ListItemText>
                    {children !== undefined ? open ? <ExpandLess className={classes.Chevron} /> : <ExpandMore className={classes.Chevron} /> : undefined}
                </Box>
            </ListItem>
        )
    };

    const navItem = () => (
        <>
            <ListItem button disableGutters className={classes.ListItem} onClick={onOpen} {...props}>
                <Box className={classes.Content}>
                    <ListItemIcon className={classes.Icon}>{icon}</ListItemIcon>
                    <ListItemText className={classes.Text}><Typography className={classes.ItemText}>{label}</Typography> </ListItemText>
                    {children !== undefined ? open ? <ExpandLess className={classes.Chevron} /> : <ExpandMore className={classes.Chevron} /> : undefined}
                </Box>
            </ListItem>
            {groupContainer()}
        </>
    );

    const groupContainer = () => (
        <Collapse component="li" in={open} timeout="auto" unmountOnExit >
            <List className={classes.SubItemList}>
                {subItems.map((item, index) => <NavItem key={index} href={item.href} label={getModuleLabel(lang, item.internalGroup || item.group || '', item.internalName || item.name, item.label)} icon={item.icon} isheader={false} issubitem={true} />)}
            </List>
        </Collapse>
    );

    const headerItem = () => <Typography className={classes.Header}>{label}</Typography>;

    return isheader ? headerItem() : (!!href ? navItemWithRouter() : navItem());
};

export default NavItem;