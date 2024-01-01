import { AppSettings } from "../config/config";
import { App, Signature } from "../models/app";
import { User } from "../models/user";
import { isNullOrUndefined, sleep } from "./common";
import { Encrypt } from "./encrypt";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { IApiResponse } from "./interfaces";
import { Storage } from '../helpers/storage';

export class ApiCall {
    private static instance: ApiCall;
    private app = App.getInstance();
    private user = User.getInstance();
    public encrypt: Encrypt | undefined = new Encrypt();
    public storage = Storage.getInstance();
    private userAgent?: string;
    constructor() {
        if (ApiCall.instance) {
            throw new Error("Error: Instantiation failed: Use ApiCall.getInstance() instead of new.");
        } else {
            // App.getInstance().init();
            // this.user.init();
        }
    }
    public static getInstance() {
        if (ApiCall.instance == null) {
            ApiCall.instance = new ApiCall();
        }
        return this.instance;
    }
    public async CurrenctLangCode(){
        let clang=await this.storage.tryGet('Clang');
        return (clang.hasValue?clang.value:'en')
    }
    public async post(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        
        return await this._post(endpoint, body, shoudlEncrypt, false);
    }
    public async postAuthMedia(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        
        return await this._postMedia(endpoint, body, shoudlEncrypt, true, false,false,true);
    }
    public async postAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        

        return await this._post(endpoint, body, shoudlEncrypt, true);
    }
    public async getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._getAuthData(endpoint, body, shoudlEncrypt, true);
    }
    public async halfAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        

        // const isHalfLogin = Object.keys(this.user.getInfo()).length !== 0 && !this.user.isLoggedIn();
        return await this._post(endpoint, body, shoudlEncrypt, true, true, true);
    }
    private async _post(endpoint: string, body: any, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false,isMultipart:boolean=false): Promise<any> {
        try {
            if (this.encrypt === undefined) {
                this.encrypt = new Encrypt()
            }
            let body1: any
            if (shoudlEncrypt) {
                body1 = await this.encrypt.encryptObject(body)
            } else {
                body1 = Object.assign({}, body)
            }
            const url = AppSettings.apiEndpoint + endpoint;
            const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

            if (isNullOrUndefined(this.userAgent)) {
                // try {
                //     this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
                //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
                //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
                // } catch(e) {
                //     this.userAgent = (Platform.OS == 'android' ? 
                //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
                //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
                // }
            }
            console.log('end point called',url, body1, this.user.getId())


            var headers: any = {
                'x-ref': this.app.getId(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-sig': signature.key,
                'x-nonce': signature.nonce.toString(),
                'locale': await this.CurrenctLangCode()
                // 'CTime': 'now time' + Date.now() + 'offset ' + 0,
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };
            if(isMultipart){
                headers['Content-Type'] = 'multipart/form-data';
            }
            if (isAuthenticated || isHalfLogin) {
                if (!this.user.initialized) {
                    await this.user.init();
                }
                // if (!this.user.isLoggedIn() && !isHalfLogin) {
                //     return false;
                // }
                this.user.updateSessionTime();
                headers['user-auth-token'] = this.user.getTokenSignature(signature);
                headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
            }
        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body: params,
                method: 'POST',
                headers: headers
            })
            console.log('response of end point',url,httpResp.status);
            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }
            const response = await (httpResp).json();

            if (httpResp.status >= 400 && httpResp.status < 600) {
            

                if (httpResp.status === 401) {
                    this.user.logout();
                    // window.location.reload();
                    // return false;
                return this.responeMaker(response, false);

                } else if (!response.Status) {
                    
                    console.warn('error occur', response.Error);
                    // CustomNotification.show(response.Error, CNotificationType.Error);
                    // return false;
                return this.responeMaker(response, false);

                }
                // if (httpResp.status == 401) {
                //     this.user.logout();
                // }
                // return false;
                return this.responeMaker(response, false);

                // throw new Error("Bad response from server", response.Error);
            }
            // if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
            //     await sleep(1000);
            //     return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            // } 
            else {
                return this.responeMaker(response, true);

                // return response;
            }
        } catch (err) {
          let eror = {Error: err?.message};
            return this.responeMaker((eror) , false);
            // {"Status":false,"Error":"Email  is missing"}
            // console.error(err)
            // alert(err.Error)

        }
    }
    public async getAccountInfo() {
        const responseT = await this.getAuthData('accountsettings/account-info', {}, false);
        if(responseT.Status){
            const info = responseT.Result
            const localInfo = this.user.getInfo()
            var AuthType=0
            if(info.Sms && info.GAu)
            AuthType=3
            else if(!info.Sms && info.GAu)
            AuthType=1
            else if(info.Sms && !info.GAu)
            AuthType=2

            if(Number(localInfo.TwoFactor)!==AuthType){
                responseT.AuthUpdated = true
                const userData = {...localInfo,TwoFa:AuthType>0,TwoFactor:AuthType}
                await this.storage.saveStore(this.user.key, JSON.stringify(userData));
            }
        }
        return responseT
    }
    private async _postMedia(endpoint: string, body1: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false,isMultipart:boolean=false): Promise<any> {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        // let body1: any
        // if (shoudlEncrypt) {
        //     body1 = await this.encrypt.encryptObject(body)
        // } else {
        //     body1 = Object.assign({}, body)
        // }
        const url = AppSettings.apiEndpoint + endpoint;
        const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

        if (isNullOrUndefined(this.userAgent)) {
            // try {
            //     this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // } catch(e) {
            //     this.userAgent = (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // }
        }
        console.log('end point called',url, body1, this.user.getId())


        var headers: any = {
            'x-ref': this.app.getId(),
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            'locale': await this.CurrenctLangCode()
            // 'CTime': 'now time' + Date.now() + 'offset ' + 0,
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        if(isMultipart){
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (isAuthenticated || isHalfLogin) {
            if (!this.user.initialized) {
                await this.user.init();
            }
            // if (!this.user.isLoggedIn() && !isHalfLogin) {
            //     return false;
            // }
            this.user.updateSessionTime();
            headers['user-auth-token'] = this.user.getTokenSignature(signature);
            headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
        }
        // const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
        try {
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body: body1 as any,
                method: 'POST',
                headers: headers
            })
            console.log('response of end point',url,httpResp.status);
            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }
            const response = await (httpResp).json();

            if (httpResp.status >= 400 && httpResp.status < 600) {
            

                if (httpResp.status === 401) {
                    this.user.logout();
                    // window.location.reload();
                    // return false;
                return this.responeMaker(response, false);

                } else if (!response.Status) {
                    
                    console.warn('error occur', response.Error);
                    // CustomNotification.show(response.Error, CNotificationType.Error);
                    // return false;
                return this.responeMaker(response, false);

                }
                // if (httpResp.status == 401) {
                //     this.user.logout();
                // }
                // return false;
                return this.responeMaker(response, false);

                // throw new Error("Bad response from server", response.Error);
            }
            // if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
            //     await sleep(1000);
            //     return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            // } 
            else {
                return this.responeMaker(response, true);

                // return response;
            }
        } catch (err) {
          let eror = {Error: err?.message};
            return this.responeMaker((eror) , false);
            // {"Status":false,"Error":"Email  is missing"}
            console.error(err)
            // alert(err.Error)

        }
    }
    private async _getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        try {
       
            if (this.encrypt === undefined) {
                this.encrypt = new Encrypt()
            }
            let body1: any
            if (shoudlEncrypt) {
                body1 = await this.encrypt.encryptObject(body)
            } else {
                body1 = Object.assign({}, body)
            }
            const url = AppSettings.apiEndpoint + endpoint + this.ObjectToQueryParam(body);
            
            const signature: Signature = await this.app.generateSignature(url, 'GET', body, true);
            if (isNullOrUndefined(this.userAgent)) {
                // try {
                //     this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
                //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
                //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
                // } catch(e) {
                //     this.userAgent = (Platform.OS == 'android' ? 
                //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
                //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
                // }
            }
            



            var headers: any = {
                'x-ref': this.app.getId(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-sig': signature.key,
                'x-nonce': signature.nonce.toString(),
                'locale': await this.CurrenctLangCode()
                // 'CTime': 'now time' + Date.now() + 'offset ' + 0,
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            };
            // console.log(headers,'headers');
            if (isAuthenticated || isHalfLogin) {
                if (!this.user.initialized) {
                    await this.user.init();
                }
                // if (!this.user.isLoggedIn() && !isHalfLogin) {
                //     // return false;
                    
                // }
                this.user.updateSessionTime();
                headers['user-auth-token'] = this.user.getTokenSignature(signature);
                headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
            }
        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
            const httpResp = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            console.log('get auth response', url, httpResp.status);
            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }

            if(httpResp.status === 204){
                return this.responeMaker({Error: ''}, false);
            }

            const response = await (httpResp).json();
            
            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    this.user.logout();
                    // window.location.reload();
                    return;
                } else if (!response.Status) {
                    // alert(response.Error);
                    // CustomNotification.show(response.Error, CNotificationType.Error);
                    // return false;
                return this.responeMaker(response, false);

                }
                // if (httpResp.status == 401) {
                //     this.user.logout();
                // }
                // return false;
                return this.responeMaker(response, false);

                // throw new Error("Bad response from server", response.Error);
            }
            if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            } else {
                return this.responeMaker(response, true);

                // return response;
            }
        } catch (err) {
            let eror = {Error: err?.message};
            return this.responeMaker((eror) , false);
            // console.error('api request error', err);
            // {"Status":false,"Error":"Email  is missing"}

            // alert(err.Error)

        }
    }
    public responeMaker(response, isOk: any) {
        let res: IApiResponse = {};
        if(isOk){
            res = {
                Status: true,
                Message:'success',
                Result: response,
            };
        } else {
            res = {
                Status: false,
                Message:response.Error,
                Result: null,
            };
        }
        return res;
        
    } 
    public async get(endPoint: string, body: any) {
        let queryParam = this.ObjectToQueryParam(body)
        var headers: any = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'locale': await this.CurrenctLangCode()
        };
        let httpResp = await fetch(AppSettings.apiEndpoint + endPoint + queryParam,{
            method: 'GET',
            headers: headers
        });
        if(httpResp.status === 404){
            return this.responeMaker({Error: 'url not found on server'}, false);
        }
        const response = await (httpResp).json();
        console.log('get end point called',AppSettings.apiEndpoint + endPoint + queryParam, httpResp.status )
        // if (httpResp.status >= 400 && httpResp.status < 600) {
        //     if (httpResp.status === 401) {
        //         this.user.logout();
        //         window.location.reload();
        //         return;
        //     } else if (!response.Status) {
        //         // alert(response.Error);
        //         // CustomNotification.show(response.Error, CNotificationType.Error);
        //         // return false;
        //     return this.responeMaker(response, false);
        //     }
        //     // if (httpResp.status == 401) {
        //     //     this.user.logout();
        //     // }
        //     // return false;
        //     return response;
        // }
        return response;
        // return this.responeMaker(response, true);
    }
    public async getText(endPoint: string, body: any) {
        console.log('get text end point called',endPoint, this.app.getId())
        let queryParam = this.ObjectToQueryParam(body);
        return await (await fetch(AppSettings.apiEndpoint + endPoint + queryParam)).text();
    }
    private ObjectToQueryParam(obj: any) {
        if (obj === undefined) {
            return;
        }
        try {
            let str = Object.keys(obj).reduce(function(a: any, k){
                a.push(k + '=' + encodeURIComponent(obj[k]));
                return a;
            }, []).join('&');
            return str.length > 0 ? '?' + str : str;
            // let str = '?' + Object.keys(obj).reduce(function (a: any, k) {
            //     a.push(k + '=' + encodeURIComponent(obj[k]));
            //     return a;
            // }, []).join('&');
            // return str.length > 0 ? '?' + str : str;
        } catch (error) {

        }

    }
    // private ObjectToQueryParam(obj: any) {
    //     if (obj === undefined) {
    //         return;
    //     }
    //     try {
    //         let str = '?' + Object.keys(obj).reduce(function (a: any, k) {
    //             a.push(k + '=' + encodeURIComponent(obj[k]));
    //             return a;
    //         }, []).join('&');
    //         return str;
    //     } catch (error) {

    //     }

    // }
    // const creds: IData = app.getApp();
    // 
    // await connection.invoke('UserAuth', GetSocketAuth.getAuth(creds, url))
    // public async getAuthT(data: any, endPoint: string) {
    //     // let sig = await this.app.generateSignature(endPoint, 'SOCKET', {}, false)
    //     // const sig = new SignatureCreator(data);
    //     const body = {};
    //     const url = endPoint;//'';//this.endpoint + 'accountsettings/account-info/' + ObjectToQueryParam(body);
    //     const signature = this.app.generateSignature(url, 'SOCKET', body, false);
    //     const usersvc = new UserService();
    //     return {
    //         XSig: signature.key,
    //         XNonce: signature.nonce.toString(),
    //         XRef: data.data.Id.toString(),
    //         UserAuthToken: usersvc.getTokenSignature(signature),
    //         XTi: usersvc.getTokenId() !== undefined ? usersvc.getTokenId().toString() : '0'
    //     };
    // }
    // public getAuth(data: IData, endPoint: string) {
    //     // const sig = new SignatureCreator(data);
    //     this.app.appInit()
    //     const body = {};
    //     const url = endPoint;//'';//this.endpoint + 'accountsettings/account-info/' + ObjectToQueryParam(body);
    //     const signature = sig.generateSignature(url, 'SOCKET', body, false);
    //     // const usersvc = new UserService();
    //     return {
    //         XSig: signature.key,
    //         XNonce: signature.nonce.toString(),
    //         XRef: data.data.Id.toString(),
    //         UserAuthToken: usersvc.getTokenSignature(signature),
    //         XTi: usersvc.getTokenId() !== undefined ? usersvc.getTokenId().toString() : '0'
    //     };
    // }
    public async getSocketAuth(url: string): Promise<object> {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        let body = {};

        const signature: Signature = await this.app.generateSignature(url, 'SOCKET', body, false);
        return {
            'XSig': signature.key,
            'XNonce': signature.nonce.toString(),
            'XRef': this.app.getId().toString(),
            'UserAuthToken': this.user.getTokenSignature(signature),
            'XTi': (this.user.getTokenId()).toString()
        };
    }

    public async postAuthTemporary(endpoint: string, body: object, token: any, shoudlEncrypt: boolean = false) {
        return await this.posttemporary(endpoint, body, shoudlEncrypt, token);
    }
    private async posttemporary(endpoint: string, body: object, shoudlEncrypt: boolean, token: any) {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        const body1: any = shoudlEncrypt ? await this.encrypt.encryptObject(body) : Object.assign({}, body);
        const url = AppSettings.apiEndpoint + endpoint;
        const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

        var headers: any = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            'x-ref': this.app.getId().toString(),
            'locale': await this.CurrenctLangCode()

        };
        headers['user-auth-token'] = hmacSHA256(token.Token, signature.key).toString();
        headers['x-ti'] = token.TI

        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
        try {
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body: params,
                method: 'POST',
                headers: headers
            });
            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }
            const response = await (httpResp).json()
            if (httpResp.status == 401) {
                this.user.logout();
            }
            if (response.Status === false && response.Message === "IR") {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, false);
            } else {
                return this.responeMaker(response, true);

                // return response;
            }
        } catch (err) {
            // 
        }
    }
}
// export class ApiCall {
//     private static instance: ApiCall;
//     private app = App.getInstance();
//     private user = User.getInstance();
//     public encrypt = new Encrypt();
//     private userAgent?: string;
//     constructor() {
//         if(ApiCall.instance)
//         {
//             throw new Error("Error: Instantiation failed: Use ApiCall.getInstance() instead of new.");
//         }
//     }
//     public static getInstance() 
//     {
//         if (ApiCall.instance == null)
//          {
//             ApiCall.instance = new ApiCall();
//         }
//         return this.instance;
//     }
//     public async post(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
//        return await this._post(endpoint, body, shoudlEncrypt, false);
//     }
//     public async postAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
//         return await this._post(endpoint, body, shoudlEncrypt, true);
//     }
//     public async halfAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
//         // const isHalfLogin = Object.keys(this.user.getInfo()).length !== 0 && !this.user.isLoggedIn();
//         return await this._post(endpoint, body, shoudlEncrypt, true, true, true);
//     }
//     private async _post(endpoint: string, body: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
//         const body1: any = shoudlEncrypt ? this.encrypt.encryptObject(body) : Object.assign({}, body);
//         const url = AppSettings.apiEndpoint + endpoint;
//         const signature: Signature = await this.app.generateSignature(url, 'POST', body1);
//         console.log('end point called', endpoint);
//         if(isNullOrUndefined(this.userAgent)) {
//             try {
//                 this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
//                 'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
//                 'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
//             } catch(e) {
//                 this.userAgent = (Platform.OS == 'android' ? 
//                 'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
//                 'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
//             }
//         }

        
//         var headers: any = {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             'x-sig': signature.key,
//             'x-nonce': signature.nonce.toString(),
//             'x-ref': this.app.getId().toString(),
//             'User-Agent': this.userAgent
//         };
//         if (isAuthenticated || isHalfLogin) {   
//             if(!this.user.initialized) {
//                 await this.user.init();
//             }
//             if (!this.user.isLoggedIn() && !isHalfLogin) {
//                 return {
//                     "Code": 1,
//                     "Message": "LoginToContinue",
//                     "Result": "IR",
//                     "Status": false,
//                 };
//             }
//             this.user.updateSessionTime();
//             headers['user-auth-token'] = this.user.getTokenSignature(signature);
//             headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
//         }
//         const params = Object.keys(body1).map(key =>      encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
//         try {
//             const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
//                 body: params,
//                 method: 'POST',
//                 headers: headers
//             });
//             const response = await (httpResp).json()
//             if(httpResp.status == 401) {
//                 this.user.logout();
//             }
//             if(response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
//                 await sleep(1000);
//                 return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
//             } else {
//                 return response;
//             }
//         } catch(err){
//             
//         }
//     }
//     public async get(endPoint:string) {
//         return await (await fetch(AppSettings.apiEndpoint + endPoint)).json();
//     }
//     public async getAuth(body: object): Promise<object> {
//         body = this.encrypt.encryptObject(body);
//         const signature: Signature = await this.app.generateSignature('', 'POST', body);
//         return {
//             'XSig': signature.key,
//             'XNonce': signature.nonce.toString(),
//             'XRef': this.app.getId().toString(),
//             'UserAuthenticationToken': this.user.getTokenSignature(signature),
//             'XTi': this.user.getTokenId()
//         };
//     }
    
//     public async postAuthTemporary(endpoint: string, body: object, token: any, shoudlEncrypt: boolean = false) {
//         return await this.posttemporary(endpoint, body, shoudlEncrypt, token);
//     }
//     private async posttemporary(endpoint: string, body: object, shoudlEncrypt: boolean, token: any) {
//         const body1: any = shoudlEncrypt ? this.encrypt.encryptObject(body) : Object.assign({}, body);
//         const url = AppSettings.apiEndpoint + endpoint;
//         const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

//         var headers: any = {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//             'x-sig': signature.key,
//             'x-nonce': signature.nonce.toString(),
//             'x-ref': this.app.getId().toString()
//         };
//         headers['user-auth-token'] = hmacSHA256(token.Token, signature.key).toString();
//         headers['x-ti'] = token.TI

//         const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
//         try {
//             const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
//                 body: params,
//                 method: 'POST',
//                 headers: headers
//             });
//             const response = await (httpResp).json()
//             if (httpResp.status == 401) {
//                 this.user.logout();
//             }
//             if (response.Status === false && response.Message === "IR") {
//                 await sleep(1000);
//                 return await this._post(endpoint, body, shoudlEncrypt, false);
//             } else {
//                 return response;
//             }
//         } catch (err) {
//             
//         }
//     }
// }
