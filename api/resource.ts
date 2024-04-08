import { request } from '@/util/http/http'

export interface Resource {
    type: string;
    status: boolean;
    name: string;
    path: string;
    url: string;
    href: string;
    size: number;
    creationTime: string;
    modificationTime: string;
    lastAccessTime: string;
    fileExtension: string;
    md5: string;
}

export const getResource = async (refresh: boolean = false) => {
    return request.post<Resource[]>(`/admin/resource/list`, JSON.stringify({refresh: refresh}), {
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
}
