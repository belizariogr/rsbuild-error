import { ApiInterface, ApiRequestHelper } from './types';
import Config from '../../../config';
import User from '../User/types';

export const composeUrl = (baseUrl: string, resource: string, isPublic: boolean, conditions?: string, summarized?: boolean, orderField?: string, sort?: string, page?: number, limit?: number, showingFields?: string[], hidingFields?: string[], token?: boolean) => {
    return ''
};

export const getOptions = (api: ApiInterface, method: string, body?: any, contentType?: string, signal?: AbortSignal): RequestInit => {
   return {}
}

const getSecureOptions = (api: ApiInterface, method: string, body?: any, contentType?: string, sendToken?: boolean): RequestInit => {
  return {}
}

export const doRequest = async (api: ApiInterface, url: string, method: string, isPublic: boolean, helper: ApiRequestHelper, body?: any, contentType?: string, redirectOnFail?: boolean, timeout?: number) => {
    return {}

};

export const doRequestEx = async (api: ApiInterface, url: string, method: string, isPublic: boolean, helper: ApiRequestHelper, body?: any, contentType?: string, redirectOnFail?: boolean, timeout?: number) => {
   return {}
};

export const doSecureRequest = async (api: ApiInterface, url: string, method: string, body?: any, contentType?: string, ignoreRedirect?: boolean, sendToken?: boolean) => {
  return {}
};

export const doRefreshToken = async (api: ApiInterface, all: boolean) => {
   return {}
}