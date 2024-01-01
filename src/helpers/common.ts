import { Buffer } from 'buffer/';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export function isIphoneNotch(): boolean {
    return Platform.OS == 'ios' && Constants.statusBarHeight > 30;
}

export async function sleep(milliseconds: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, milliseconds)
    });
}
export function isNullOrUndefined(value: any) {
    return (value ?? null) === null;
}

export function isEmptyString(value: any) {
    return (value ?? "") === "";
}

export function isVariableExists(value: any) {
    return window[value] !== undefined;
}

export function UArrayToBase64(buf: Uint8Array) {
    return Buffer.from(buf).toString('base64');
}

export function base64ToUArray(str: string) {
    return new Uint8Array(Buffer.from(str, 'base64'))
}

export function strToUArray(str: string): Buffer {
    return new Buffer(str);
}

export function hexToUArray(hex: string): Uint8Array {
    return Uint8Array.from(hexToBytes(hex));
}

export function hexToBytes(hex: string) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}