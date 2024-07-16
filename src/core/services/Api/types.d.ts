import NavigateFunction from 'react-router-dom';
import User from '../User/types';
import NotificationService from '../Notifications/notification';

export interface ApiInterface {
    api?: ApiInterface;
    user?: User;
    sessionId: string;
    token: string;
    account: string;
    accB64: string;
    accountId: number;
    expiresAt: number;
    baseUrl: string;
    uploads: string;
    notifications: NotificationService,
    get: (resource: string, isPublic: boolean, conditions?: string, summarized?: boolean, orderField?: string, sort?: string, page?: number, limit?: number, showingFields?: string[], hidingFields?: string[]) => any;
    post: (resource: string, isPublic: boolean, data?: any, contentType?: string, redirectOnFail?: boolean) => any;
    postEx: (resource: string, isPublic: boolean, data?: any, contentType?: string, redirectOnFail?: boolean) => Promise<Response>;
    put: (resource: string, isPublic: boolean, data?: any, contentType?: string) => any;
    delete: (resource: string, isPublic: boolean, data?: any, contentType?: string) => any;
    patch: (resource: string, isPublic: boolean, data?: any, contentType?: string) => any;

    refreshToken: (all?: boolean) => any;
    secureGet: (resource: string) => any;
    securePost: (resource: string, data: object, contentType?: string, ignoreRedirect?: boolean, sendToken?: boolean) => any;
    secureDelete: (resource: string, data: object, contentType?: string, sendToken?: boolean) => any;
    navigate?: NavigateFunction;
}

export interface ApiRequestHelper {
    retry?: boolean
    [key: string]: any
}