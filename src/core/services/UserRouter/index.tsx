import { lazy } from 'react';
import { Route, RouteArray } from '../../types';
import { Navigate } from 'react-router-dom';
import { User } from '../User/types';
import { cloneArr, getRoutes } from '../Utils';
import { DefaultRoutes } from '../../modules/default';
import modules from '../../../modules';
import Reconnect from '../../pages/Reconnect';
import Config from '../../../config';
import SlowDown from '../../pages/SlowDown';


export type UserRoutes = {
    routes: RouteArray;
    visible: RouteArray;
}

const Login = lazy(() => import('../../pages/Login'));
const Logout = lazy(() => import('../../pages/Logout'));
const Recover = lazy(() => import('../../pages/Recover'));
const Register = lazy(() => import('../../pages/Register'));
const Redirect = lazy(() => import('../../pages/Redirect'));
const NoPermissions = lazy(() => import('../../pages/NoPermissions'));
const MainLayout = lazy(() => import('../../components/layout/MainLayout'));
const Dashboard = lazy(() => import('../../../pages/Dashboard'));

export const notAuthenticatedRoutes: RouteArray = [
    { name: '$$home', path: '/', element: <></>, core: true },
    { name: '$$login', path: '/login', element: <Login />, public: true, core: true },
    { name: '$$logout', path: '/logout', element: <Logout />, public: true, core: true },
    { name: '$$recover', path: '/recover', element: <Recover />, public: true, core: true },
    { name: '$$register', path: ('/' + (Config.registerEndpoint || 'register')), element: <Register />, public: true, core: true },
    { name: '$$redirect', path: '/redirect', element: <Redirect />, public: true, core: true },
    { name: '$$reconnect', path: '/reconnect', element: <Reconnect />, public: true, core: true },
    { name: '$$slowdown', path: '/slowdown', element: <SlowDown />, public: true, core: true },
    { name: '$$dashboard', path: '/dashboard', element: <Dashboard />, public: true, core: true },
    { name: '*', path: '*', element: <></>, core: true },
];

export const notAuthenticatedRoutesNames = [
    '/login',
    '/logout',
    '/recover',
    ('/' + (Config.registerEndpoint || 'register')),
    '/redirect',
    '/reconnect',
    '/slowdown',
    '/dashboard',
];

export const disconnectedRoutes = [
    '/reconnect',
    '/slowdown'
];

const getUserVisibleRoutes = (routes: RouteArray, user: User) => {
    const res: RouteArray = [];
    routes.forEach(r => {
        if (r.children) {
            const children = getUserVisibleRoutes(r.children, user);
            if (children.length === 0)
                return;
            const v = { ...r };
            v.children = children;
            res.push(v);
            return;
        }
        let path = '/' + (r.group ? r.group + '/' : '') + r.name;
        if (r.internalName)
            path = '/' + (r.internalGroup ? r.internalGroup + '/' : '') + r.internalName;
        const perm = user.permissions.find(p => p.module === path);
        r.permissions = perm;
        if ((perm && perm.permissions.list) || r.hidden)
            res.push({ ...r });
    });
    return res;
}

const getFirstVisible = (routes: RouteArray): Route | undefined => {
    for (let i = 0; i < routes.length; i++) {
        const r = routes[i];
        if (r.hidden || r.menu === false)
            continue;
        if (r.children)
            return getFirstVisible(r.children)
        return r;
    }
}

const getModRoutes = (routes: RouteArray, modules: string[]) => {
    return routes.filter(r => {
        if (r.children)
            r.children = getModRoutes(r.children, modules);
        if (r.ifHaveModules && r.ifHaveModules.length > 0) {
            for (let i = 0; i < r.ifHaveModules.length; i++) {
                const mod = r.ifHaveModules[i];
                if (!modules.includes(mod))
                    return false;
            }
        }

        if (r.ifDoesntHaveModules && r.ifDoesntHaveModules.length > 0) {
            for (let i = 0; i < r.ifDoesntHaveModules.length; i++) {
                const mod = r.ifDoesntHaveModules[i];
                if (modules.includes(mod))
                    return false;
            }
        }
        return true;
    })
}

const getModulesRoutes = (user: User): RouteArray => {
    let r = DefaultRoutes;
    if (!user.modules)
        return r;
    const list: string[] = [];
    for (let i = 0; i < modules.length; i++) {
        const mod = modules[i];
        if ((user.modules.includes(mod.name) && !list.includes(mod.name)) || mod.public) {
            if (!!mod.showsif) {
                let hasDep = false;
                for (let j = 0; j < mod.showsif.length; j++) {
                    const dep = mod.showsif[j];
                    if (user.modules.includes(dep)) {
                        hasDep = true;
                        break;
                    }
                }
                if (!hasDep)
                    continue;
            }
            list.push(mod.name);
            const modRoutes = getModRoutes(mod.routes, user.modules || []);
            r = [...r, ...modRoutes];
        }
    }
    user.defaultRoutes = cloneArr(r);
    const dash = user.defaultRoutes.find(r => r.name === 'dashboard' && !r.group);
    if (!!dash && !dash.options) {
        dash.options = [];
        modules.forEach(m => {
            if (user.modules?.includes(m.name) && !dash.options?.includes(m.name) && !m.ignoreDahsboard)
                dash.options?.push(m.name);
        });
    }
    return cloneArr(user.defaultRoutes);
}

const fixRoutes = (routes: RouteArray) => {
    const menuGroups = routes.filter(r => r.isGroup);
    let count = 0;
    const visibleRoutes: RouteArray = routes.filter(r => !r.isGroup);
    menuGroups.forEach(route => {
        if (!!route.children) {
            route.children.forEach(r => {
                visibleRoutes.push(r);
                if (r.menu === false)
                    return
                count++;
            })
            return;
        }
        visibleRoutes.push(route);
        count++;
    });
    if (count > 12)
        return routes;
    return visibleRoutes;
}

export const getUserRoutes = (user: User): UserRoutes => {
    let routes: RouteArray = [...notAuthenticatedRoutes];
    const r = getModulesRoutes(user);
    let visible: RouteArray = getRoutes(r);
    if (user.authenticated) {
        if (!user.isAdmin)
            visible = getUserVisibleRoutes(visible, user);
        visible = fixRoutes(visible);
        if (visible.length === 0) {
            (routes[0] as Route).element = <NoPermissions />;
            return { routes, visible };
        }
        let firstRoute = getFirstVisible(visible);
        routes[0].element = <Navigate to={firstRoute?.path || '/'} replace={true} />;
        routes[notAuthenticatedRoutes.length - 1].element = <Navigate to='/' replace={true} />;
        const mainRoute = { name: '$$main', path: '/', element: <MainLayout />, children: visible, core: true }
        routes = [...routes, mainRoute];
    }
    return { routes, visible };
}