import React, { useState } from 'react';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Typography, Badge } from '@material-ui/core';
import { Error, Notifications } from '@mui/icons-material';
import { useLang } from '../../../../services/Lang';
import useStyles from './styles';

import { useApi } from '../../../../services/Api';


const AccountMenu: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const classes = useStyles();
    const { lang } = useLang();

    const api = useApi();



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

    return (<>
        <IconButton color="inherit" ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
            <Badge badgeContent={0} color="error" overlap="rectangular">
                <Notifications />
            </Badge>
        </IconButton>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom'>
            {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {perm === 'denied' && <MenuItem disabled>
                                    <Typography className={classes.Item + ' ' + classes.ItemError} >
                                        <Error fontSize='small' /> No permission to send you notifications.
                                    </Typography>
                                </MenuItem>}
                                <MenuItem><Typography className={classes.Item}>{lang.data.captions.noNotifications}</Typography></MenuItem>
                            </MenuList>
                            {/* { && <>

                            </>} */}
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </>);
}

export default AccountMenu;