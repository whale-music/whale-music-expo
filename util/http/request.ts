import { getServerUrlSettingStoreData } from '@/store/setting';
import { getUserToken } from '@/store/user';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

export const request = async <T>(
    method: 'get' | 'post',
    url: string,
    body?: BodyInit,
    headers?: HeadersInit,
    timeout: number = 10_000,
    prop = {}
): Promise<T> => {
    const baseurl = await getServerUrlSettingStoreData();
    url = baseurl + url;

    let token = await getUserToken();
    const _headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
    };
    console.log(url, 'url');
    console.log(token, 'token');

    let controller = new AbortController();
    let id = setTimeout(() => controller.abort(), timeout);
    let r: Response = await fetch(url, {
        method: method,
        headers: _headers,
        body,
        signal: controller.signal,
        ...prop,
    });
    clearTimeout(id);
    if (r.status != 200) {
        Toast.show(`http status error code ${r.status}`, {
            position: Toast.positions.CENTER,
        });
        throw new Error(`request error status ${r.status}`);
    }
    const json = await r.json();
    if (json?.code != 200) {
        if (json?.code == 20001) {
            router.replace('/login');
            Toast.show('please login');
            throw new Error('Token expired');
        }
        const s = `service error code ${json?.code}, msg: ${json?.message}`;
        Toast.show(s, {
            position: Toast.positions.CENTER,
        });
        throw new Error(s);
    }
    return json['data'];
};

export const get = <T>(
    url: string,
    header?: HeadersInit,
    timeout?: number,
    prop = {}
): Promise<T> => {
    return request('get', url, undefined, header, timeout, prop);
};
export const post = <T>(
    url: string,
    body?: BodyInit,
    header?: HeadersInit,
    timeout?: number,
    prop = {}
): Promise<T> => {
    return request('post', url, body, header, timeout, prop);
};
