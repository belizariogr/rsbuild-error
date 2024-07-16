import { RouteArray } from "../../types";

export type Permissions = {
    list?: boolean;
    record?: boolean;
    insert?: boolean;
    update?: boolean;
    delete?: boolean;
}

export type UserPermissions = UserPermission[];

export interface UserPermission {
    resource: string;
    permissions: Permissions;
    permissionsValue?: number;
    module?: string;
    options?: string[];
}

export interface Empresa {
    NomeEmpresa: string;
    NomeFantasia: string;
    Endereco: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    PaisId: number;
    PaisNome: string;
    CidadeId: number;
    CidadeNome: string;
    EstadoId: number;
    EstadoNome: string;
    EstadoSigla: string;
    CEP: string;
    Telefone1: string;
    Telefone2: string;
    Email: string;
    CpfCnpj: string;
    InscricaoEstadual: string;
    TipoLogo: number;
    LogoURL: string;
    LogoPNG?: string;
}

export interface AccountInfo {
    id?: number
    account?: string
    name?: string
    Active?: boolean
    api?: string
    lang?: boolean
    DbStorage?: number
    FileStorage?: number
    loading?: boolean
}

export class User {
    tenantId: number = 0;
    userId: number = 0;
    tag: number = 0;
    name: string;
    lastClientVersion: string = '';
    isAdmin: boolean = false;
    permissions: UserPermissions = [];
    routes: RouteArray = [];
    authenticated: boolean = false;
    others: {[key: string]: any};
    additional: any;
    redirected?: boolean;
    systemOptions?: any;
    modules?: string[];
    defaultRoutes: RouteArray = [];

    constructor(name: string) {
        this.name = name;
        this.others = {};
    }

    getModule(group: string, module: string): string {
        return '/' + (group ? group + '/' : '') + module;
    }

    getPerm(module: string, group: string): Permissions | undefined {
        if (!this.permissions)
            return undefined
        const p = this.permissions.find(p => p.module === this.getModule(group, module));
        return p
    }

    hasModule(module: string): boolean {
        if (!this.modules)
            return false;
        return !!this.modules.find(m => m === module);
    }

    hasOption(module: string, group: string, option: string, HasOptionIfAdmin: boolean = true) {
        if (this.isAdmin)
            return HasOptionIfAdmin;
        const perm: UserPermission | undefined = this.getPerm(module, group);
        if (!perm || !option)
            return false;
        return perm.options.includes(option);
    }

    canList(module: string, group: string): boolean {
        if (this.isAdmin)
            return true;
        return this.getPerm(module, group)?.permissions?.list || false;
    }

    canDetail(module: string, group: string): boolean {
        if (this.isAdmin)
            return true;
        return this.getPerm(module, group)?.permissions?.record || false;
    }

    canInsert(module: string, group: string): boolean {
        if (this.isAdmin)
            return true;
        return this.getPerm(module, group)?.permissions?.insert || false;
    }

    canUpdate(module: string, group: string): boolean {
        if (this.isAdmin)
            return true;
        return this.getPerm(module, group)?.permissions?.update || false;
    }

    canDelete(module: string, group: string): boolean {
        if (this.isAdmin)
            return true;
        return this.getPerm(module, group)?.permissions?.delete || false;
    }

    static parse(obj: any): User {
        const u = new User(obj?.name || '');
        u.tenantId = obj?.tenantId || 0;
        u.lang = obj?.lang || false;
        u.userId = obj?.userId || 0;
        u.tag = obj?.Tag || obj?.tag || 0;
        u.isAdmin = obj?.isAdmin || false;
        u.others.company = obj?.company || '';
        u.authenticated = obj?.authenticated || false;
        u.lastClientVersion = obj?.lastClientVersion;
        u.additional = obj?.additional;
        u.permissions = obj?.permissions;
        u.systemOptions = obj.systemOptions || {};
        u.modules = obj?.modules || [];
        return u;
    }
}

export type UserContextType = {
    user: User;
    accountInfo: AccountInfo;
    setUser: (user: User) => void;
    setAccountInfo: (accountInfo: AccountInfo) => void;
}

type UserProviderProps = {};

export default User;