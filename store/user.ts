import { getStoreData, storeData } from '@/store/store'


export interface LoginRes {
    id: number;
    username: string;
    accessToken: string;
    refreshToken: string;
    roles: string[];
    expires: number;
}

export const USER_KEY = "user-store-key"

export const getUserStoreData = () => {
    return getStoreData<LoginRes>(USER_KEY)
}

export const saveUserStore = async (value: LoginRes) => {
    await storeData(USER_KEY, value)
}

export const getUserId = async (): Promise<number | undefined> => {
    return (await getStoreData<LoginRes>(USER_KEY))?.id
}

export const getUserToken = async (): Promise<string | undefined> => {
    return (await getStoreData<LoginRes>(USER_KEY))?.accessToken
}
