import { getStoreData, mergeStoreData, storeData } from "@/store/store";
import { router } from "expo-router";

export interface SettingStoreData {
    serverUrl?: string;
}

export const SETTING_KEY = "setting-store-key";

export const getSettingStoreData = () => {
    return getStoreData<SettingStoreData>(SETTING_KEY);
};

export const saveSettingStoreData = async (value: SettingStoreData) => {
    await storeData(SETTING_KEY, value);
};

export const getServerUrlSettingStoreData = async (isRouterJump: boolean = true): Promise<string | undefined> => {
    const serverUrl = (await getStoreData<SettingStoreData>(SETTING_KEY))?.serverUrl;
    // 是否跳转， 如果没有地址则跳转到填写地址界面
    if (!serverUrl && isRouterJump) {
        router.replace("/login");
        throw new Error("url is null, Please enter Url");
    } else {
        return removeTrailingSlash(serverUrl);
    }
};

function removeTrailingSlash(str: string | undefined) {
    if (!str) {
        return undefined;
    }
    if (str.endsWith("/")) {
        return str.slice(0, -1); // 删除尾部的 /
    } else {
        return str; // 不做处理
    }
}

export const saveServerUrlSettingStoreData = async (url: string) => {
    await mergeStoreData<SettingStoreData>(SETTING_KEY, { serverUrl: url });
};
