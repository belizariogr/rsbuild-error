import React, { createContext, useContext, useState } from 'react';
import { ApiInterface } from './types';
import { composeUrl, doRequest, doSecureRequest, doRefreshToken, doRequestEx } from './funcs';
import Config from '../../../config';

// import NotificationService from '../Notifications/notification';

const INITIAL_API: ApiInterface = {
    notifications: {},
    expiresAt: 0,
    account: '',
    accB64: '',
    accountId: 0,
    token: '',
    sessionId: '',
    baseUrl: Config.api,
    uploads: Config.uploads,

    async refreshToken(all) {
        return await doRefreshToken(this, !!all)
    },
    get get() {
        return async (resource: string, isPublic: boolean, conditions?: string, summarized?: boolean, orderField?: string, sort?: string, page?: number, limit?: number, showingFields?: string[], hidingFields?: string[]) => {
            const url = composeUrl(this.baseUrl, resource, isPublic, conditions, summarized, orderField, sort, page, limit, showingFields, hidingFields);
            let tries = 0;
            let res: any;
            while (true) {
                const helper = { retry: true }
                try {
                    tries++;
                    res = await doRequest(this, url, 'GET', isPublic, helper);
                    return res;
                } catch (err: any) {
                    if (!helper.retry)
                        throw err
                    if (tries > 3)
                        throw err;
                }
            }
        }
    },
    get post() {
        return async (resource: string, isPublic: boolean, data: any, contentType?: string, redirectOnFail?: boolean) => {
            const url = composeUrl(this.baseUrl, resource, isPublic);
            try {
                return await doRequest(this, url, 'POST', isPublic, {}, data || {}, contentType, redirectOnFail);
            } catch (err) {
                throw err;
            }
        }
    },
    get postEx() {
        return async (resource: string, isPublic: boolean, data: any, contentType?: string, redirectOnFail?: boolean) => {
            const url = composeUrl(this.baseUrl, resource, isPublic);
            try {
                return doRequestEx(this, url, 'POST', isPublic, {}, data || {}, contentType, redirectOnFail);
            } catch (err) {
                throw err;
            }
        }
    },
    get put() {
        return async (resource: string, isPublic: boolean, data: any, contentType?: string) => {
            const url = composeUrl(this.baseUrl, resource, isPublic);
            try {
                return await doRequest(this, url, 'PUT', isPublic, {}, data || {}, contentType);
            } catch (err) {
                throw err;
            }
        }
    },
    get delete() {
        return async (resource: string, isPublic: boolean, data: any, contentType?: string) => {
            const url = composeUrl(this.baseUrl, resource, isPublic);
            try {
                return await doRequest(this, url, 'DELETE', isPublic, {}, data || {}, contentType);
            } catch (err) {
                throw err;
            }
        }
    },

    get patch() {
        return async (resource: string, isPublic: boolean, data: any, contentType?: string) => {
            const url = composeUrl(this.baseUrl, resource, isPublic);
            try {
                return await doRequest(this, url, 'PATCH', isPublic, {}, data || {}, contentType);
            } catch (err) {
                throw err;
            }
        }
    },
    get secureGet() {
        return async (resource: string) => {
            const url = composeUrl(this.baseUrl, resource, true);
            return await doSecureRequest(this, url, 'GET');
        }
    },
    get securePost() {
        return async (resource: string, data: any, contentType?: string, ignoreRedirect?: boolean, sendToken?: boolean) => {
            const url = composeUrl(this.baseUrl, resource, true);
            return await doSecureRequest(this, url, 'POST', data, contentType, ignoreRedirect, sendToken);
        }
    },
    get secureDelete() {
        return async (resource: string, data: any, contentType?: string, sendToken?: boolean) => {
            const url = composeUrl(this.baseUrl, resource, true);
            return await doSecureRequest(this, url, 'DELETE', data, contentType, true, sendToken);
        }
    }
}

const Api = createContext<ApiInterface>(INITIAL_API);


const ApiProvider: React.FC = ({ children }) => {
    const [api] = useState<ApiInterface>(() =>  {
        const api = INITIAL_API;
        api.api = api;
        api.notifications.api = api;
        return api;
    });
    return (
        <Api.Provider value={api}>
            {children}
        </Api.Provider>
    );
}

const useApi = () => useContext(Api);

export { useApi, ApiProvider };