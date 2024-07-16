import { lazy } from 'react';
import { Route } from '../types';
import { Dashboard as DashboarddIcon } from '@mui/icons-material';

import Config from '../../config';

const Dashboard = lazy(() => import('../../pages/Dashboard'));
const MyAccount = lazy(() => import("../../pages/MyAccount"));


const DefaultRoutes: Route[] = [
    { name: Config.dashboardPath || 'dashboard', readOnly: true, element: <Dashboard />, icon: <DashboarddIcon />, resource: 'dashboard', core: true, },
    { name: Config.myAccountPath || 'myaccount', readOnly: true, element: <MyAccount />, menu: false, hidden: true, core: true, },
];


export { DefaultRoutes };

