
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_ENUM } from "./StorageKeys.enum";


export class StorageHelper {

    static save<T>(key: STORAGE_KEY_ENUM, data: T): Promise<void> {
        const serializedData = JSON.stringify(data);

        return AsyncStorage.setItem(key, serializedData);
    }

    static async get<T>(key: STORAGE_KEY_ENUM): Promise<T> {
        const serializedData = await AsyncStorage.getItem(key);
        const data: T = JSON.parse(serializedData as string);

        return data;
    }

}