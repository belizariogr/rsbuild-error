import { styled } from '@material-ui/core';

const MainLayoutRoot = styled('div')({
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
});

const MainLayoutWrapper = styled('div')(
    ({ theme }) => ({
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 56,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    })
);

const MainLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
});

const MainLayoutContent = styled('div')(
    ({ theme }) => ({
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
    })
);

export {
    MainLayoutRoot,
    MainLayoutWrapper,
    MainLayoutContainer,
    MainLayoutContent
}