import { Platform } from "react-native";
import Constants from 'expo-constants';

// npx expo prebuild
// ./gradlew assembleRelease

//Constants.manifest.version
// get version from expo instead
export class AppSettings {
    public static getAppVersion() {
        return Constants?.manifest?.version ?? "0";// Platform.OS == 'android' ? AppSettings.appVersions.ANDROID : AppSettings.appVersions.IOS;
    }


    public static appStoreLink = 'https://apps.apple.com/us/app/cross/id1610536361';
    public static googleStoreLink = 'https://play.google.com/store/apps/details?id=com.cross.app';
    
    //===============Staging Environment======================
    public static isStagingEnv = true;
    public static baseUrl = 'https://cross-demo.zechinc.com';
    public static apiEndpoint = 'https://api.dev.themeteor.io/';
    public static recaptchaApiKey = '6Lf9SWQjAAAAAMYEryfs3e18DKMSb8LSFj_ofC6J'; 
    public static homeEndPoint = 'https://cross-demo.zechinc.com/home/';
    public static cdnEndPoint = 'https://cdn-demo.zechinc.com/mobileapp/';
    public static cdnEndPoint1 = 'https://cdn-demo.zechinc.com/trade-stage/';
    public static socketEndpoint = 'https://api.dev.themeteor.io/';
    public static strapiEndpoint = 'https://cms.dev.themeteor.io/api/';
    public static helpcenter = 'https://helpcenter.themeteor.io/';
    public static genericEndpoint = 'https://dev.themeteor.io/';
    public static traderImageEndpoint = 'https://cross-prod.s3.us-east-2.amazonaws.com';
    public static simplexSdkPath = 'https://cdn.test-simplexcc.com/sdk/v1/js/sdk.js';
    public static simplexKey = 'pk_test_c374a4b5-72a2-4584-8e7e-ae5dccb49c64'; //
    public static simplexBaseUrl = 'https://test.themeteor.io/';


    //===============Staging Environment End======================
    
    
    //===============Production Environment======================
    // public static isStagingEnv = false;
    // public static baseUrl = 'https://cross-demo.zechinc.com';
    // public static apiEndpoint = 'https://tradeapi.themeteor.io/';
    // public static recaptchaApiKey = '6Lf9SWQjAAAAAMYEryfs3e18DKMSb8LSFj_ofC6J'; 
    // public static homeEndPoint = 'https://cross-demo.zechinc.com/home/';
    // public static cdnEndPoint = 'https://publictradestatic.themeteor.io/mobile/assets/';
    // public static cdnEndPoint1 = 'https://publictradestatic.themeteor.io/mobile/assets/';
    // public static socketEndpoint = 'https://tradeapi.themeteor.io/';
    // public static strapiEndpoint = 'https://cms.themeteor.io/api/';
    // public static helpcenter = 'https://helpcenter.themeteor.io/';
    // public static genericEndpoint = 'https://themeteor.io/';
    // public static traderImageEndpoint = 'https://cross-prod.s3.us-east-2.amazonaws.com';
    // public static simplexSdkPath = 'https://cdn.simplex.com/sdk/v1/js/sdk.js';
    // public static simplexKey = 'pk_live_1cc5fba9-ea70-4d9d-951a-65d21fbdd661';
    // public static simplexBaseUrl = 'https://themeteor.io/'

    //===============Production Environment End======================



    // RTL MainApplication.java 
    // import com.facebook.react.modules.i18nmanager.I18nUtil;
    // I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
    // sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);


    public static hubs = {
        marketHub: 'tradehub'
    };
    public static chart = {
        defaultCandle: 30 // 30mins
    }
    
}

export class SimplexConfig {

    public static currencyRatePerDollar = [
        { name: 'eur', min: 45, max: 16825 },
        { name: 'usd', min: 50, max: 20000 },
        { name: 'rub', min: 3667, max: 1464664 },
        { name: 'aud', min: 75, max: 27056 },
        { name: 'gbp', min: 40, max: 14310 },
        { name: 'sek', min: 445, max: 171580 },
        { name: 'cad', min: 68, max: 25023 },
        { name: 'chf', min: 50, max: 18200 },
        { name: 'dkk', min: 320, max: 125189 },
        { name: 'pln', min: 200, max: 77422 },
        { name: 'try', min: 430, max: 168413 },
        { name: 'brl', min: 265, max: 103522 },
        { name: 'bgn', min: 88, max: 32961 },
        { name: 'clp', min: 38440, max: 15368998 },
        { name: 'cop', min: 194150, max: 77611460 },
        { name: 'crc', min: 31148, max: 12418812 },
        { name: 'czk', min: 1090, max: 429007 },
        { name: 'dop', min: 2878, max: 1143000 },
        { name: 'gel', min: 165, max: 61700 },
        { name: 'hkd', min: 399, max: 155537 },
        { name: 'huf', min: 15046, max: 5977674 },
        { name: 'inr', min: 3790, max: 1484872 },
        { name: 'idr', min: 720800, max: 287674990 },
        { name: 'ils', min: 172, max: 64520 },
        { name: 'jpy', min: 5562, max: 2184490 },
        { name: 'kzt', min: 21380, max: 8511370 },
        { name: 'myr', min: 242, max: 84757 },
        { name: 'mxn', min: 1005, max: 397634 },
        { name: 'mdl', min: 898, max: 350935 },
        { name: 'mad', min: 460, max: 179215 },
        { name: 'nad', min: 755, max: 297808 },
        { name: 'twd', min: 1495, max: 557620 },
        { name: 'nzd', min: 73, max: 28850 },
        { name: 'ngn', min: 20601, max: 8240310 },
        { name: 'nok', min: 442, max: 176760 },
        { name: 'pen', min: 206, max: 81645 },
        { name: 'uyu', min: 2168, max: 866846 },
        { name: 'php', min: 2522, max: 1008388 },
        { name: 'uah', min: 1333, max: 533163 },
        { name: 'qar', min: 183, max: 72819 },
        { name: 'ron', min: 210, max: 83737 },
        { name: 'aed', min: 184, max: 73460 },
        { name: 'sar', min: 750, max: 75019 },
        { name: 'sgd', min: 68, max: 27181 },
        { name: 'zar', min: 750, max: 296502 },
        { name: 'krw', min: 58720, max: 23487970 },
        { name: 'uzs', min: 532655, max: 213061750 },
        { name: 'vnd', min: 1141510, max: 456603282 },
        { name: 'nok', min: 450, max: 176423 }
    ];
}