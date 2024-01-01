import { Storage } from '../helpers/storage';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { Signature } from './app';
import { dispatchLoginState, dispatchLogoutUser } from '../redux/dispatch';
import { isEmptyString, isNullOrUndefined, sleep, __ } from '../helpers/common';
import * as LocalAuthentication from 'expo-local-authentication';
import { TNotification, NotificationPosition, NotificationType } from '../helpers/notification';


export class Signup {
    public Email!: string;
    public Password!: string;
    public ConfirmPassword!: string;
    public RecaptchaResponse!: string;
    public termCondition!: string;
}

export class Login {
    public RecaptchaResponse!: any;
    public Email!: string;
    public Password!: string;
}
export class InvestorWithDraw {
    public WithdrawAmount!: number;
}
export class PasswordReset {
    public Id!: number;
    public Hash1!: string;
    public Hash2!: string;
    public Password!: string;
    public ConfirmPassword!: string;
    public RecaptchaResponse!: string;
}

export enum SupportedLocalAuth {
    NONE,
    FINGERPRINT,
    FACIAL_RECOGNITION

}


export class User {
    public initialized = false;
    public sessionExpirationTime: number = 86400 * 1000 * 7; // 7 days
    private info!: any;
    private readonly isTopTraderKey: string = "istoptrader";
    private readonly isDtradekey: string = "isDtradeon";
    public readonly key: string = 'userInfo';
    private readonly overViewCurrencyId: string = 'overCurrencyId';
    private readonly profileImageKey: string = 'userProfileImage';

    public readonly _sessionLastUpdatedKey: string = '_tusersession';
    private storage = Storage.getInstance();
    private static instance: User;
    private _isLoggedIn: boolean = false;
    private _isTopTrader: boolean = false;
    private _isDtrade: boolean = false;
    private _sessionLastUpdated: number = 0;
    private _onLoginCallbacks: { [id: string]: (() => void) } = {};
    private _onLogoutCallbacks: { [id: string]: (() => void) } = {};
    public localAuth: LocalAuth;
    public authVerifyState = 0;
    private constructor() {
        if (User.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        this.localAuth = new LocalAuth(this.storage);
    }

    // public 
    public onLogin(id: string, callback: () => void) {
        this._onLoginCallbacks[id] = callback;
    }
    public onLogout(id: string, callback: () => void) {
        this._onLogoutCallbacks[id] = callback;
        this.removeTopTrader()
    }

    public static getInstance() {
        if (User.instance == null) {
            User.instance = new User();
        }
        return this.instance;
    }
    public async init() {
        // 
        this.initialized = true;
        await this.loadData();
    }
    public getInfo() {
        return this.info;
    }
    public isTopTrader(): boolean {
        return this._isTopTrader;
    }

    private async loadTopTraderKey() {
        const tp = await this.storage.get(this.isTopTraderKey);
        this._isTopTrader = !isEmptyString(tp) && tp == "true";
    }
    public async updateTopTraderValue(isTopTrader: boolean) {
        // await this.storage.set(this.isTopTraderKey, isTopTrader.toString());
        this._isTopTrader = false;
    }
    private async removeTopTrader() {
        await this.storage.remove(this.isTopTraderKey);
    }
    public isDtradeOn(): boolean {
        return this._isDtrade;
    }

    public async loadisDtradeKey() {
        const tp = await this.storage.get(this.isDtradekey);
        this._isDtrade = !isEmptyString(tp) && tp == "true";
    }
    public async updateisDtradeValue(isDtrade: boolean) {
        await this.storage.set(this.isDtradekey, isDtrade.toString());
        this._isDtrade = isDtrade;
    }
    private async removeisDtrade() {
        await this.storage.remove(this.isDtradekey);
    }
    public async setOverViewCurrencyId(id: number) {
        await this.storage.set(this.overViewCurrencyId, id.toString());
    }
    public async getOverViewCurrencyId() {
        return await this.storage.get(this.overViewCurrencyId) ?? 1;
    }

    public updateAuthVerify(num): number {
        return this.authVerifyState = num;
    }

    public async loadData() {
        if (this.authVerifyState === 0)
            return

        const lastLoginValue = this._isLoggedIn;
        this._sessionLastUpdated = Number(await this.storage.getStore(this._sessionLastUpdatedKey));
        if (this.isSessionExpired()) {
            await this.logout();
        } else {
            this.info = JSON.parse((await this.storage.getStore(this.key)) ?? '{}');
            this._isLoggedIn = Number(this.info?.TI ?? '0') > 1;

        }
        if (this._isLoggedIn) {
            // await this.loadTopTraderKey();
            // await this.loadisDtradeKey()
        } else {
            // await this.removeTopTrader();
            // await this.removeisDtrade();
        }
        if (this._isLoggedIn && lastLoginValue != this._isLoggedIn) {
            Object.keys(this._onLoginCallbacks).forEach(a => {
                this._onLoginCallbacks[a]();
            })
        } else if (!this._isLoggedIn && lastLoginValue != this._isLoggedIn) {
            Object.keys(this._onLogoutCallbacks).forEach(a => {
                this._onLogoutCallbacks[a]();
            })
        }

        dispatchLoginState(this._isLoggedIn);
    }
    public async pendingSessionInfo() {
        return {
            isSessionExpired: (Number(await this.storage.getStore(this._sessionLastUpdatedKey)) + this.sessionExpirationTime) < Date.now(),
            sessionEmail: JSON.parse((await this.storage.getStore(this.key)) ?? '{}')['Email']
        }
    }
    public async sessionExists() {
        return await this.storage.existsStore(this.key);
    }
    public async pendingTokenEnable() {
        await this.storage.set('tokenst', "1");
    }
    public async pendingTokenDisable() {
        await this.storage.remove('tokenst');
    }
    public async setTwoFaType(type: number) {
        await this.storage.set('AuthTf', JSON.stringify(type));
    }
    public async getTwoFaType() {
        return (await this.storage.get('AuthTf'));
    }
    public async setPortFolioSetting(type: any) {
        await this.storage.set('portFolio', JSON.stringify(type));
    }
    public async getPortFolioSetting() {
        return (await this.storage.get('portFolio'));
    }
    public async removePortFolioSetting() {
        return (await this.storage.remove('portFolio'));
    }
    //  localStorage.setItem('AuthTf', resp.Result.Tf);
    public async pendingTokenExists() {
        return await this.storage.exists('tokenst');
    }
    public async createTwoFaRestriction() {
        await this.storage.set('2fa-verification-key', 'true');
    }
    public async isTwoFaRestriction() {
        return await this.storage.exists('2fa-verification-key');
    }
    public async removeTwoFaRestriction() {
        await this.storage.remove('2fa-verification-key');
    }
    public async enableTwoFa(): Promise<void> {
        await this.storage.set('2faEnabled', "true");
    }
    public async disableTwoFa() {
        if (await this.storage.exists('2faEnabled')) {
            await this.storage.remove('2faEnabled');
        }
    }
    public async setProfileImage(url: string) {
        await this.storage.set(this.profileImageKey, url);
    }
    public async getProfileImage() {
        return await this.storage.get(this.profileImageKey);
    }
    public async save(userData: object) {
        await this.storage.saveStore(this.key, JSON.stringify(userData)); // 1 hour
        await this.storage.saveStore(this._sessionLastUpdatedKey, Date.now().toString());
        await this.init();
        dispatchLoginState(this._isLoggedIn);
    }
    public async save1(userData: object) {
        // await this.storage.saveStore(this.key, JSON.stringify(userData)); // 1 hour
        // await this.storage.saveStore(this._sessionLastUpdatedKey, Date.now().toString());
        // await this.init();
        this.info = userData ?? '{}';
        this.initialized = true;
        // dispatchLoginState(this._isLoggedIn);
    }
    public updateSessionTime() {
        const dt = Date.now();
        if ((this._sessionLastUpdated - dt) > 60000) { // 1 min 
            this._sessionLastUpdated = dt;
            this.storage.saveStore(this._sessionLastUpdatedKey, dt.toString());
        }
    }
    public isSessionExpired(): boolean {
        return (this._sessionLastUpdated + this.sessionExpirationTime) < Date.now();
    }
    public updateTwoFaSettings(enableTwoFa = false) {
        this.info['TwoFa'] = enableTwoFa;
        this.save(this.info);
    }
    public async logout(nofit = true) {
        await this.disableTwoFa();
        if (this._sessionLastUpdated !== 0) {
            await this.storage.removeStore(this.key);
            await this.storage.removeStore(this._sessionLastUpdatedKey);

            nofit && TNotification.show('logout_success', NotificationType.Success, NotificationPosition.Top)
            // sleep(10)
        }
        this._sessionLastUpdated = 0;
        this._isLoggedIn = false;
        this.info = {};
        dispatchLoginState(this._isLoggedIn);
        dispatchLogoutUser();
        // Socket.getInstance().logout()
    }
    public getName(): string {
        return this.info['Name'];
    }
    public setName(name: string): void {
        this.info['Name'] = name;
        this.save(this.info);
    }
    public setEmail(email: string): void {
        this.info['Email'] = email;
        this.save(this.info);
    }
    public getEmail(): string {
        return this.info?.Email ?? '';
    }
    public getUserId(): string {
        return this.info?.UserId ?? '';
    }
    public getToken(): string {
        try {
            return this.info['Token'];
        } catch (err) {
            return '';
        }
    }
    public getTokenId(): string {
        try {
            return this.info['TI'];
        } catch (err) {
            return '';
        }
    }
    public getTokenSignature(signature: Signature): string {
        try {
            return hmacSHA256(this.info['Token'], signature.key).toString();
        } catch (err) {
            return '';
        }
    }
    public getId(): number {
        return this.info ? this.info['Id'] : null;
    }
    public isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    public setPaywithCross(value: any) {
        this.storage.set('CrossFee', JSON.stringify(value));
    }
    public async getPayWithCross() {
        const value = await this.storage.get('CrossFee');
        if (value) {
            return JSON.parse(value);
        } else {
            return false;
        }
    }
}
class LocalAuth {
    private localAuth = "localauth-active";
    private _isActive: boolean;
    private authenticated: boolean = false;
    private user: any = {};
    constructor(private storage: Storage) {
    }
    public async init() {
        try {
            const getLa = await this.storage.getStore(this.localAuth);
            if(getLa){
                const isArray = getLa.trim().startsWith('[');

                if(isArray){
                    const laAuth = JSON.parse(getLa ?? '[]');
                
                    await this.getUserInfo();
                    const la = laAuth.find(item => item.userId === this.user.UserId);
                    
                    if (la?.userId && this.user?.UserId) {
                        this._isActive = (la.userId === this.user.UserId && la.value === true)
                    } else {
                        this._isActive = false;
                    }
                } else {
                    await this.storage.removeStore(this.localAuth);
                    this._isActive = false;
                }
            } else {
                this._isActive = false;
            }
            
        } catch(err){
            console.log('err')
        }
        // this._isActive = isNullOrUndefined(la) ? false : JSON.parse(la);
    }

    public async getUserInfo() {
        const user = JSON.parse(await this.storage.getStore('userInfo') ?? '{}')
        this.user = user;
        return this.user;
    }

    public isActive(): boolean {
        return this._isActive;
    }

    public async supportedAuthenticationType() {
        const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (supportedTypes.includes(1)) {
            return SupportedLocalAuth.FINGERPRINT
        } else if (supportedTypes.includes(2)) {
            return SupportedLocalAuth.FACIAL_RECOGNITION
        } else {
            return SupportedLocalAuth.NONE
        }
    }

    public async authenticate(): Promise<boolean> {
        this.authenticated = (await LocalAuthentication.authenticateAsync()).success;
        return this.authenticated;
    }
    public async isSupported(): Promise<boolean> {
        return await LocalAuthentication.hasHardwareAsync();
    }
    public async isEnrolled(): Promise<boolean> {
        return await LocalAuthentication.isEnrolledAsync();
    }
    public isAuthenticated() {
        return this.authenticated;
    }
    public async enableAuth(): Promise<boolean> {
        return this.updateAuth(true);
    }
    public async disableAuth(): Promise<boolean> {
        return this.updateAuth(false);
    }
    private async updateAuth(value: boolean): Promise<boolean> {
        if (!(await LocalAuthentication.hasHardwareAsync())) {
            alert("Authentication Not Supported On this Device");
            return false;
        }

        await this.getUserInfo();

        const currentAuth = this.isActive();
        if (currentAuth == value)
            return true;
        const auth = (await LocalAuthentication.authenticateAsync());
        if (auth.success) {
            const existingData = JSON.parse(await this.storage.getStore(this.localAuth) ?? '[]');
            
            const newData = { value: value, userId: this.user?.UserId };
            const existingIndex = existingData.findIndex(item => item.userId === newData.userId);

            if (existingIndex !== -1) {
                existingData[existingIndex] = newData;
            } else {
                existingData.push(newData);
            }

            await this.storage.saveStore(this.localAuth, JSON.stringify(existingData));
            this._isActive = value;
            return true;
        } else {
            const isSupported = await this.isSupported();
            const isEnrolled = await this.isEnrolled();
            alert(!isSupported ? "Your device doesn't support Touch Id identification" : (
                isEnrolled ? "Authentication Failed" : "Touch Id is not enabled in your phone. Please enable it first in your phone"
            )); //
            return false;
        }
    }
}