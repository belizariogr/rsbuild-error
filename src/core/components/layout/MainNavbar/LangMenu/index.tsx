import React from 'react';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, ListItemIcon, Typography } from '@material-ui/core';
import { LangList, useLang } from '../../../../services/Lang';
import { setStorage } from '../../../../services/Utils';
import { Lang } from '../../../../services/Lang/types';
import useStyles from './styles';
import Config from '../../../../../config';


const LangMenu: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const classes = useStyles();
    const { lang, setLang } = useLang();

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

    const selectLang = (lang: Lang, event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        setLang(lang);
        setStorage('lang', lang.code);
    }

    const getLangs = () => {
        return LangList.map((lang) => {
            return (
                <MenuItem key={lang.code} onClick={(evt) => selectLang(lang, evt)} >
                    <ListItemIcon className={classes.FlagIcon}>
                        {lang.icon}
                    </ListItemIcon>
                    <Typography className={classes.Item}>
                        {lang.name}
                    </Typography>
                </MenuItem>
            )
        })
    }

    if (LangList.length <= 1 || Config.defaultLang)
        return <></>;
    return (<>
        <IconButton className={classes.FlagIcon} color="inherit" ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
            {lang.icon}
        </IconButton>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom'>
            {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {getLangs()}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </>);
}

export default LangMenu;