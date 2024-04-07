import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        console.log("save data")
    } catch (e) {
        console.error(e)
    }
};

export const getStoreData = async <T>(key: string): Promise<T | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) as T : undefined;
    } catch (e) {
        // error reading value
        console.error(e)
    }
};

export const mergeStoreData = async <T>(key: string, value: T): Promise<T | undefined> => {
    await AsyncStorage.mergeItem(key, JSON.stringify(value))
    return await getStoreData<T>(key)
}
