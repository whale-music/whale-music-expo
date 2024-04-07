import { getStoreData, mergeStoreData, storeData } from '@/store/store'

export interface SettingStoreData {
    serverUrl?: string;
}

export const SETTING_KEY = "setting-store-key"


export const getSettingStoreData = () => {
    return getStoreData<SettingStoreData>(SETTING_KEY)
}

export const saveSettingStoreData = async (value: SettingStoreData) => {
    await storeData(SETTING_KEY, value)
}

export const getServerUrlSettingStoreData = async (): Promise<string | undefined> => {
    return (await getStoreData<SettingStoreData>(SETTING_KEY))?.serverUrl
}

export const saveServerUrlSettingStoreData = async (url: string) => {
    await mergeStoreData<SettingStoreData>(SETTING_KEY, {serverUrl: url})
}
