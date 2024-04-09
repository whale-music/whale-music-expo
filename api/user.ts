import { request } from '@/util/http/http';
import { LoginRes, saveUserStore } from '@/store/user';

export interface LoginReq {
    username: string;
    password: string;
}

export const requestLogin = async (username: string, password: string) => {
    const req: LoginReq = { username: username, password: password };
    const res = await request.post<LoginRes>(`/admin/user/login`, JSON.stringify(req), {
        accept: 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    });
    await saveUserStore(res);
    return res;
};

export interface SysUserInfo {
    id: number;
    username: string;
    nickname: string;
    password: string;
    signature: string;
    accountType: number;
    status: boolean;
    roleName: string;
    lastLoginIp: string;
    lastLoginTime: string;
    loginDevice: string;
    subAccountPassword: string;
    createTime: string;
    updateTime: string;
}

export interface UserInfoRes extends SysUserInfo {
    avatarUrl: string;
    backgroundPicUrl: string;
}

export const getUserInfo = async () => {
    return await request.get<UserInfoRes>(`/admin/user/info`, {
        accept: 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    });
};
