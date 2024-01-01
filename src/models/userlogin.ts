// import { ApiCall } from '../helpers/apicall';
// import { User } from './user';
// import { Storage } from '../helpers/storage';
// import { App } from './app';

// export class UserLogin {
//   private loginAttempts = 0;
//   private timeinterval: any;
//   private static instance: UserLogin;
//   private apiCall = ApiCall.getInstance();
//   private app = App.getInstance();
//   private user = User.getInstance();
//   private storage = Storage.getInstance();

//   private constructor() {
//     if(UserLogin.instance)
//     {
//         throw new Error("Error: Instantiation failed: Use UserLogin.getInstance() instead of new.");
//     }
//   }
  
//   public async init() {
//     if (!this.user.initialized) {
//       await this.user.init();
//     }
//   }

//   public static getInstance()
//   {
//       if (UserLogin.instance == null)
//       {
//         UserLogin.instance = new UserLogin();
//       }
//       return this.instance;
//   }

//   public async Filter(redirect = true, count = 0, noHttp = false) {
//     await this.app.init();
//     if (await this.user.isTwoFaRestriction()) {
//       this.user.removeTwoFaRestriction();
//     }

//     await this.user.reload();
    
//     if (this.user.getId() > 0 &&  !await this.user.pendingTokenExists()) {
//       const dc = await this.storage.get('_dc');
//       let endPoint = 'account/isLogin';
//       let body:any = { Id: this.user.getId().toString() };

//       if (dc !== null) {
//         body['_dcRedirect'] = JSON.parse(dc).dcard.toString();
//         body['_lang'] = JSON.parse(dc).lang.toString();
//       }

//       try {
//         const response = await this.apiCall.postAuth(endPoint, body);
//         if (!response.Status) {
//           if (response.Message === 'Invalid Request') {
//             if (count === 0) {
//               this.Filter(redirect, 1);
//             } else {
//              return false;
//             }
//           } else {
//             this.loginAttempts += 1;
//             if (this.loginAttempts <= 1) {
//               this.Filter(redirect);
//               return;
//             }
//             this.user.logout();
//             return false;
//           }
//         } else {
//           if (response.Result !== null && response.Result.Rd) {
//             this.storage.remove('_dc');
//           }
//           this.loginAttempts = 0;
//           return true;
//         }
//       }catch(error) {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   }
// }
