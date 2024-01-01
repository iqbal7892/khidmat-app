import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { INullable } from "./common";

export class Storage {
    private static instance: Storage;
    constructor() {
        if(Storage.instance)
        {
            throw new Error("Error: Instantiation failed: Use Storage.getInstance() instead of new.");
        }
    }

    public static getInstance()
    {
        if (Storage.instance == null)
        {
            Storage.instance = new Storage();
        }
        return this.instance;
    }
    public async set(name: string, value: string) {
        await AsyncStorage.setItem(name, value);
    }
    public async get(name: string) {
        return await AsyncStorage.getItem(name);
    }
    public async exists(name: string) {
        return await AsyncStorage.getItem(name) !== null;
    }
    public async tryGet(name: string): Promise<INullable> {
        const value = await AsyncStorage.getItem(name);
        return {
            hasValue: value !== null,
            value: value
        } as INullable;
    }

    public async remove(name: string) {
        await AsyncStorage.removeItem(name);
    }

    public createCookie(name: string, value: string, days: number) {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    public async saveStore(key:string, value:string){
        await SecureStore.setItemAsync(key, value);
    }

    public async getStore(key:string) {
        return await SecureStore.getItemAsync(key);
    }

    public async existsStore(name: string) {
        return await SecureStore.getItemAsync(name) !== null;
    }

    public async removeStore(key: string) {
        return await SecureStore.deleteItemAsync(key);
    }

    // deprecate no cookie
    // public createClientOnlySessionCookie(name: string, value: string) {
        
    //     let secure = '';
    //     if (!(window.location.hostname.indexOf('local') > -1)) {
    //        secure =  'secure;samesite=strict';
    //     }
        
    //     document.cookie = name + '=' + value + ';path=/;' + secure;
    // }

    public async printAll() {
        
        
        
        
    }
    public async removeAll() {
        await AsyncStorage.clear();
        const ar = ['_tusersession', 'userInfo', 'istoptrader'];
        for(var i =0; i < ar.length; i++)
            await SecureStore.deleteItemAsync(ar[i]);
        
    }
}
