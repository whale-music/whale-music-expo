import { request } from '@/util/http/http'

export const getResource = async (refresh: boolean = false) => {
    return request.post(`/admin/resource/list`, JSON.stringify({refresh: refresh}), {
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
}
