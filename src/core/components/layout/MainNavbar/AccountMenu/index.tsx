import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, ListItemIcon, Typography, Hidden } from '@material-ui/core';
import { AccountCircle, DarkMode, ExitToApp, LightMode } from '@mui/icons-material';
import { LangList, useLang } from '../../../../services/Lang';
import useStyles from './styles';
import { useTheme } from '../../../../services/Theme';
import { Themes } from '../../../../../themes';
import { setStorage } from '../../../../services/Utils';
import Config from '../../../../../config';
import { useUser } from '../../../../services/User';


type AccountMenuProps = {
    doOpenLangBar: () => void;
};

const AccountMenu: React.FC<AccountMenuProps> = ({ doOpenLangBar }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const classes = useStyles();

    const { theme, setTheme } = useTheme();
    const { lang } = useLang();
    const { accountInfo } = useUser();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement))
            return;
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key !== 'Tab')
            return
        event.preventDefault();
        setOpen(false);
    }
    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false)
            anchorRef.current!.focus();
        prevOpen.current = open;
    }, [open]);


    const themeItemClick = (event: React.MouseEvent<EventTarget>) => {
        const newTheme = theme.name === 'light' ? Themes.dark : Themes.light;
        setStorage('theme', newTheme.name);
        setTheme(newTheme);
        handleClose(event);

    }

    const langItemClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        doOpenLangBar();
    }


    return (<>
        <IconButton color="inherit" ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
            <AccountCircle />
        </IconButton>


        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom'>
            {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose} component={RouterLink} to={'/' + (Config.myAccountPath || "myaccount")} ><ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon><Typography className={classes.Item}>{lang.data.captions.myAccount}</Typography></MenuItem>
                                {/* <MenuItem onClick={handleClose} component={RouterLink} to="/settings"><ListItemIcon><Settings fontSize="small" /></ListItemIcon><Typography className={classes.Item}>{lang.data.captions.settings}</Typography></MenuItem> */}
                                <Hidden smUp>
                                    <MenuItem onClick={themeItemClick}>
                                        <ListItemIcon>
                                            {theme.name === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                                        </ListItemIcon>
                                        <Typography className={classes.Item}>
                                            {theme.name === 'dark' ? lang.data.captions.lightMode : lang.data.captions.darkMode}
                                        </Typography>
                                    </MenuItem>
                                </Hidden>
                                {!Config.defaultLang && accountInfo?.lang && LangList.length > 1 && <MenuItem onClick={langItemClick} ><ListItemIcon className={classes.FlagIcon}>{lang.icon}</ListItemIcon><Typography className={classes.Item}>{lang.data.captions.langs}</Typography></MenuItem>}
                                <MenuItem onClick={handleClose} component={RouterLink} to="/logout"><ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon><Typography className={classes.Item}>{lang.data.captions.logout}</Typography></MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </>);
}

export default AccountMenu;