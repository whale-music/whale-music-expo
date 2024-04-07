import { request } from '@/util/http/http'
import { getServerUrlSettingStoreData } from '@/store/setting'

export const getResource = async (refresh: boolean = false) => {
    const url = await getServerUrlSettingStoreData()

    return request.post(`${ url }/admin/resource/list`, JSON.stringify({refresh: refresh}), {
        "accept": "application/json",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
}
