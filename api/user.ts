import { getServerUrlSettingStoreData } from '@/store/setting'
import { request } from '@/util/http/http'
import { LoginRes, saveUserStore } from '@/store/user'

export interface LoginReq {
    username: string;
    password: string;
}

export const requestLogin = async (username: string, password: string) => {
    const url = await getServerUrlSettingStoreData()
    const req: LoginReq = {username: username, password: password};
    const res = await request.post<LoginRes>(`${ url }/admin/user/login`, JSON.stringify(req), {
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
    await saveUserStore(res);
    return res;
}
