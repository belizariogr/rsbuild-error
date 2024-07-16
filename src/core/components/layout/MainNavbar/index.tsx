import { HTMLAttributes } from 'react';
import { AppBar, Toolbar, Box, Hidden, IconButton } from '@material-ui/core';
import useStyles from './styles';

import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';
import SearchBox from './SearchBox';
import NotificationMenu from './NotificationMenu';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme } from '../../../services/Theme';
import { Themes } from '../../../../themes';
import { setStorage } from '../../../services/Utils';


interface Props extends HTMLAttributes<HTMLElement> {
    onMobileNavOpen: () => void;
    doOpenLangBar: () => void;
}

const MainNavbar: React.FC<Props> = ({ onMobileNavOpen, doOpenLangBar }) => {
    //const [notifications] = useState([]);
    const classes = useStyles();
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        const newTheme = theme.name === 'light' ? Themes.dark : Themes.light;
        setStorage('theme', newTheme.name);
        setTheme(newTheme);
    }

    return (
        <AppBar elevation={0} className={classes.AppBar}>
            <Toolbar className={classes.Navbar}>
                <Hidden lgUp>
                    <IconButton color="inherit" onClick={onMobileNavOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Box className={classes.BoxOut}>
                    <SearchBox></SearchBox>
                </Box>
                <Hidden xsDown>
                    <IconButton color="inherit" onClick={toggleTheme}>
                        {theme.name === 'light' ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Hidden>
                <NotificationMenu />
                <AccountMenu doOpenLangBar={doOpenLangBar} />
            </Toolbar>
        </AppBar>
    );
};

export default MainNavbar;
