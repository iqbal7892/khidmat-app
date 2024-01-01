// import { CurrencyI } from "../models/market";

import { Pair } from "../models/market";

export type IMarginInfo = {
    CurrencyId: number;
    HourlyInterest: number;
    Borrow: boolean;
    BorrowLimit: number;
}
export type FeeTier = {
    Id: number;
    Name: string;
    Level: number;
    MakerFee: number;
    TakerFee: number;
};

export type UserFee = {
    PairId: number;
    FeeTierId: number;
    ZeroFee: boolean;
};
export type FeeTiersObject = {
    "FeeTiers": FeeTier[];
    "UserFee": UserFee[];
};
export type GlobalFee = {
    Id: number;
    Name: string;
    Level: number;
    // type:EPairType,
    MakerFee: number;
    TakerFee: number;
    "PairType": EPairType,
    "PairId": number,
    "IsGlobal": boolean,
};
// export const VIPLevels = ['Regular', 'VIP 1', 'VIP 2', 'VIP 3', 'VIP 4']
export const VIPLevels = ['Lv. 1', 'Lv. 2', 'Lv. 3', 'Lv. 4', 'Lv. 5']
export enum EPairType {
    SPOT = 0, DERIVATIVE = 2
}
export interface IAffilateProfile {
    "Found"?: boolean,
    "Name"?: string,
    "Email"?: string,
    "Phone"?: string,
    "HearedFrom"?: string,
    "Commission"?: number,
    "Status"?: number,
    "Socials"?: { [id: number]: string },
    // {
    //     "additionalProp1": "string",
    //     "additionalProp2": "string",
    //     "additionalProp3": "string"
    // }

}
export interface IAffilateActiveReferals {
    "LinkId"?: number,
    "LinkTitle"?: string,
    "LinkUrl"?: string,
    "UserId"?: number,
    "Commission"?: number,
    "DateCreated"?: string
}
export const CHeardFrom = ['Meteor.com', 'another_aff', 'account_manager'];
export interface IAfflilateLinks {
    "Id"?: number,
    "Url"?: string,
    "Title"?: string,
    "Earned"?: number,
    "UserCount"?: number,
    "TraderCount"?: number,
    "Status"?: number,
}
export enum EAfflilateStatus {
    Pending,
    Active,
    Rejected,
    Disabled
}
export const AffiliateSocialLinks = [
    'Other',
    'Twitter',
    'Twitch',
    'Telegram',
    'Discord',
    'Line',
    'Instagram',
    'Youtube',
    'Linkedin',
    'Blogs',
    'Facebook',
    'TikTok',
]
export enum EAffilateSocialLinks {
    Other,
    Twitter,
    Twitch,
    Telegram,
    Discord,
    Line,
    Instagram,
    Youtube,
    Linkedin,
    Blogs,
    Facebook,
    TikTok
}
export interface IOrderFuture {
    id: string,
    pairId: number,
    type: number,
    side: number,
    average: number,
    price: number,
    amount: number,
    filled: number,
    triggerCondition: string,
    status: number,
    date: string,
    fills: IFill[],
    isCtradeOrder: boolean,
    IsCtradeProOrder: boolean,
    pair?: any;
}
export interface IUser {
    Mobile?: string,
    Email?: string,
    firstName?: string,
    lastName?: string,
    Password?: string,
    ReferalCode?: string,
    'x-ra'?: number,
    TkExpiry?: number,
    CTime?: string,
    RecaptchaResponse?: string,
    ConfirmPassword?: string,

    Name?: string;
    Id?: number,
    UserId?: number,
    DeviceId?: number,
    DeviceAuthorized?: boolean,
    TokenId?: number,
    Token?: string,
    TwoFactor?: number,
    TwoFa?: boolean,
    FirstLogin?: boolean,
    Modal?: string | null
    TI?: any,
}
export const MarginMode = [
    'Isolated'
    , 'Cross'
]
export const positionStatus = [
    'Open',
    'Closed'
]
export const futureLongShort = [
    'Long', 'Short'
]
export const transferWallet = [
    {
        id: 0,
        image1: require('../assets/images/icons/spot-icon.png'),
        text: 'spot',
        image2: '../assets/images/icons/select-tick.png',
    },
    {
        id: 1,
        image1: require('../assets/images/icons/derivatives-icon.png'),
        text: 'der',
        image2: '../assets/images/icons/select-tick.png',

    },
    {
        id: 2,
        image1: require('../assets/images/icons/margin-icon.png'),
        text: 'margin',
        image2: '../assets/images/icons/select-tick.png',
    },
    {
        id: 3,
        image1: require('../assets/images/icons/isolated-margin-icon.png'),
        text: 'Isolated Margin',
        image2: '../assets/images/icons/select-tick.png',

    }

]
export const defaultProfilePictures = [
    {
        id: 1,
        image: require('../assets/images/profile/default-1.png'),
        isActive: false,
        name: 'default-1.png',
    },
    {
        id: 2,
        image: require('../assets/images/profile/default-2.png'),
        isActive: false,
        name: 'default-2.png',

    },
    {
        id: 3,
        image: require('../assets/images/profile/default-3.png'),
        isActive: false,
        name: 'default-3.png',

    },
    {
        id: 4,
        image: require('../assets/images/profile/default-4.png'),
        isActive: false,
        name: 'default-4.png',

    },
    {
        id: 5,
        image: require('../assets/images/profile/default-5.png'),
        isActive: false,
        name: 'default-5.png',

    },
    {
        id: 6,
        image: require('../assets/images/profile/default-6.png'),
        isActive: false,
        name: 'default-6.png',

    },
    {
        id: 7,
        image: require('../assets/images/profile/default-7.png'),
        isActive: false,
        name: 'default-7.png',

    },
    {
        id: 8,
        image: require('../assets/images/profile/default-8.png'),
        isActive: false,
        name: 'default-8.png',

    }
]
export enum ELinkStatus {
    Pending = 0, Active = 1, Rejected = 2, Disabled = 3
}
export enum ITransferType {
    SpotToFuture,
    FutureToSpot,
    SpotToIsolated,
    SpotToCross,
    IsolatedToSpot,
    CrossToSpot,
    CrossToIsolated,
    IsolatedToCross,
    IsolatedToIsolated
}
export interface IFutureLimit {
    "Id"?: number,
    "PairId"?: number,
    "Tier"?: number,
    "MinPositionSize"?: number,
    "MaxPositionSize"?: number,
    "MaxLeverage"?: number,
    "MaintainanceMarginRate"?: number,
    "MaintainanceAmount"?: number,
}
export interface IExchangeWalletType {
    id?: number,
    image1: any,
    text: string,
    image2: string,
    isActive?: boolean,
}


export interface IUserLeverageSetting {
    pairId?: number,
    leverage?: number,
    mode?: number,
}
export interface ITransfer {
    currencyId,
    fromWallet,
    toWallet,
}
export const MorderTypes = ['Normal', 'Borrow', 'Repay'];
// export const MorderTypes = ['Borrow', 'Repay'];
export enum MEorderTypes {
    'Normal',
    'Borrow',
    'Repay'
};

export const MMode = ['Isolated', 'Cross'];
export interface IUserPosition {
    "Id"?: string,
    "PairId"?: number,
    "pair"?: Pair,
    "UserId"?: number,
    "Quantity"?: number,
    "EntryPrice"?: number,
    "Margin"?: number,
    "PositionSide"?: number,
    "MarginMode"?: number,
    "Leverage"?: number,
    "LiquidityPrice"?: number,
    "MarginRatio"?: number,
    "MaintainanceMargin"?: number,
    "Status"?: number,
    "OrderIds"?: number[],
    'PNLAmount'?: string,
    'pNLPercentage'?: string,
}
export interface IMargnPosition {
    "Id"?: String,
    "PairId"?: number,
    "UserId"?: number,
    "Quantity"?: number,
    "EntryPrice"?: number,
    "PositionSide"?: number,
    "MarginMode"?: number,
    "TotalBalance"?: number,
    "Debt"?: number,
    "Interest"?: number,
    "LiquidityPrice"?: number,
    "MarginLevel"?: number,
    "Leverage"?: number,
    "Status"?: number,
    "RealizedPNL"?: number,
    "PositionLastLiquidated"?: string,
    "RealizedPNLDiff"?: number,
    'PNLAmount'?: string,
    'pNLPercentage'?: string,

}
export interface IUserSettings {
    isUSDQuantity?: boolean,
    IsReduceOnly?: boolean,
    // portFolioSetting?: {
    // PSorbalance: boolean,
    // PSortByAlphabatically: boolean,
    // PhideOtherBalance: boolean,
    // }
}
export interface IActiveTabs {
    isSpotTradingTab: boolean,
    isMarginTradingTab: boolean,

    isTradePageFocused: boolean,
    isDerivativePageFocused: boolean,

    // isSpotTrade: boolean,
    // isSpotChars: boolean,

}

export interface IFundingCycle {
    "Id"?: number,
    "PairId"?: number,
    "CycleNumber"?: number,
    "CycleDate"?: string,
    "StartDate"?: string,
    "EndDate"?: string,
    "FundingRate"?: string,
    "Status"?: number,
}
export interface ICountDown {
    days: string,
    hours: string,
    minutes: string,
    seconds: string
}

export interface ICreateOrder {
    OrderType: number, // 1 = limit order , 2 market order  
    Stop: number,
    Type: number,  // 0 = buy, 1 = sell
    Rate: number,
    Quantity: number,
    PairId: number,
}
export interface IAuth {
    // auth, 
    // initializing, getRedirect, clearRedirect, user, error
}
export interface IsignUp {

}
export interface UserInfoI {

}
export interface ApiResponse {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface IApiResponse {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface StkCurrencies {
    id?: number;
    currency?: ICurrency;
    stakingPlan?: IStkPlans[];
    minLocked?: number;
    planNotFound?: boolean;
    allDuration?: number[];
}
export interface IStkPlans {
    id?: number;
    duration?: number;
    apy?: number;
    currency?: ICurrency;
    startDate?: string;
    endDate?: string;
    stakeAmount?: number;
    earned?: any;
    youReceive?: number;
    daysPassed?: number;
    totalDays?: number;
    status?: number;
    selected?: boolean;
    minLocked?: number;
}
// baseCurrency?: ICurrency;
// marketCurrency?: ICurrency;
// basePrecision1?: number;
// marketPrecision?: number;
export interface IPair {
    id?: number;
    name?: string;
    marketCurrency?: ICurrency;
    baseCurrency?: ICurrency;
    rate?: number;
    high?: number;
    low?: number;
    bid?: number;
    ask?: number;
    volume?: number;
    volumeMarketCurrency?: number;
    prevDayPrice?: number;
    trendUp?: boolean;
    trendUp24hr?: boolean;
    precision?: number;
    rateUsd?: number;
    marketPrecision?: number;
    basePrecision?: number;
    hide?: boolean;
    minimumTotal?: number;
    minimumAmount?: number;
    Status?: number;
    leveragePair?: boolean;
    leveragePercentage?: string;
    leveragePairName?: string;
    type?: number;
    change24hour?: PercentageI;
    twitterSentiment?: number,
    isFav?: boolean,
    isMainPair?: boolean,
}
export interface PercentageI {
    value: number;
    isPositive: boolean;
}
export enum currencyTypeI {
    Cryptocurrency, Fiat, Leverage, DStock
}
export interface ICurrency {
    id: number;
    name: string;
    symbol: string;
    leverageSymbol?: string;
    leveragePercentage?: string;
    address?: string;
    isFiat?: boolean;
    currencyType?: currencyTypeI;
    precision?: number;
    withdrawalFee?: number;
    status?: number;
    CustomFee?: TetherFee;
    feePer?: string;
    regex?: string;
    canWithdraw?: boolean;
    imgUrl?: string;
    chainInfoB?: IChainInfo[] | any;
    chainInfo?: IChainInfo[];
}
export interface TetherFee {
    OMNI?: number;
    ERC20?: number;
    TRC20?: number;
}
export interface UserGroupLimit {
    currency?: ICurrency;
    limitation?: string;
    consumed?: string;
}
export interface UserLocketBalanceLimit {
    currency?: ICurrency;
    limit?: number;
}
export interface IWallet {
    id?: number;
    address?: string;
    isMemo?: boolean;
    memo?: number | string;
    balance?: number;
    available?: number;
    inOrderBalance?: number;
    backupAvailable?: number;
    pending?: number;
    currency?: ICurrency;
    conf?: number;
    minW?: number;
    fiat?: Fiat;
    hide?: boolean;
    btcBalance?: number;
    defaultTradePair?: string;
    investedAmount?: number;
    percenTage?: number;
    currencyId?: number;
    minWithdraw?: any;
    inorderBalance?: any;
    withdrawalFee?: any;
}
export interface IBlanaceOverview {
    inBtc: string,
    inUsd: string,
}

export interface Fiat {
    bankName?: string;
    accountTitle?: string;
    accountNumber?: string;
    branchCode?: string;
}
export interface IFill {
    rate?: number;
    quantity?: number;
    tradingPrice?: number;
    amount?: number;
    fee?: string,
    time?: string,
    pair?: IPair;
    side?: string,
    total?: string,
    orderFillId?: number
}

export interface IUserOrder {
    id?: number;
    rate?: number;
    quantity?: number;
    total?: string,
    quantityFilled?: number;
    orderSide?: string;
    fills?: IFill[];
    pairName?: string;
    pair?: IPair,
    status?: string;
    mainOrderType?: string;
    dateAdded?: string,
    lastUpdated?: string;
    fillAmt?: number;
    triggerCondition?: string,
    random?: string,

    // let findord = userOrdersAll.find(o => o.Id === ob.Id);
    // var index = userOrdersAll.indexOf(findord);
}
export interface IChainInfo {
    chainId?: number;
    currencyId?: number;
    chainName?: string;
    withdrawFee?: number;
    minWithdraw?: number;
    canWithdraw?: boolean;
    canDeposit?: boolean;
    depositAddressCurrency?: number;
    isSelected?: {};
    feePer?: string;
}
export interface IUserOrderSearchModel {
    // clear modal 
    // this.model['marketCurrency'] = 0;
    // this.model['baseCurrency'] = 0;
    // this.model['side'] = 3;
    // this.model['timeOffetset'] = new Date().getTimezoneOffset().toString();
    // this.model['Date'] = 'null';
    // this.model['timeOffetset'] = new Date().getTimezoneOffset().toString();
    Date?: any,
    side?: any,
    marketCurrency?: number,
    baseCurrency?: number,
    timeOffetset?: string,
    CurrentPageIndex?: number,
}
export interface IUserOrderPagination {
    Count?: number,
    CurrentPageIndex?: number,
    PageCount?: number,
    Result?: IUserOrder[]
}
// export const 
export interface ILocalData {
    Version: number,
    Pairs: any[],
    Currencies: any[],
}
export interface IKycModal {
    City?: string,
    Day?: string,
    Fname?: string,
    Lname?: string,
    Mname?: string,
    Month?: string,
    Nation?: string | number,
    Street?: string,
    Year?: string,
    Zip?: string,
}
export interface ILocalDataSet {
    version?: number,
    pairs?: { [id: number]: IPair },
    currencies?: { [id: number]: ICurrency },
}
export const OrderSideT = ['Buy', 'Sell']
export const OrderStatusT = ['Active', 'Complete', 'Cancelled', 'OnHold'];
export const MainOrderTypeT = ['Market', 'Limit', 'Stop-limit']
export const FilterMainOrderTypes = ['All', 'Processing', 'Complete']


export interface IResetTimeMode {
    days?: string;
    hours?: string;
    minuts?: string;
    secconds?: string;
}

export interface IShowPoupMode {
    secconds?: number;
    showPopUP?: boolean;
    stockTradeDisabled?: boolean;
    tradingHalt?: boolean;
}
export interface ITradeHistory {
    rate?: string,
    quantity?: string,
    trendUp?: boolean,
    time?: string,
    random?: number,
}
export interface IObOrder {
    rate?: number,
    quantity?: number,
    total?: number,
    spread?: number;
    active?: boolean,
    random?: boolean,
}

export interface IOrderBook {
    buy?: IObOrder[];
    sell?: IObOrder[];
    eventId?: number,
    refresh?: boolean,
}
export interface IpairResetSettingMode {
    start?: string;
    end?: string;
    tstart?: string;
    recur?: string;
    dayoff?: any[];
}
export interface IBuySell {
    price?: number,
    stop?: number,
    amount?: number,
    total?: number,
    percentage?: number,
    minP?: number,
    minA?: number,
}
export interface IDistribution {
    Amount: number,
    CurrencyId: number,
    LeverageCurrencyId: number,
    Type: number,
    Date: string
}
export interface IDistributionPagination {
    Count?: number,
    CurrentPageIndex?: number,
    PageCount?: number,
    Result?: IDistribution[]

}
// export interface IUserSettings {
//     pairMenu: {
//         selectedTab?: '',
//         sorting?: {
//             faverite?: boolean,
//             name?: boolean,
//             price?: boolean,
//             change24h?: boolean,
//             volume24h?: boolean,
//         }
//     }
// }
export interface ICurrencyInfo {
    "CurrencyId"?: number,
    "ShortDescription"?: string,
    "LongDescription"?: string,
    "MarketCap"?: number,
    "MaxSupply"?: number,
    "CirculatorySupply"?: number,
    "IssuePrice"?: number,
    "IssueDate"?: string,
}
export interface IMarginBalance {
    "AvailableBuy"?: number,
    "AvailableSell"?: number,
    "CurrencyId"?: number

}
export const LoginEmails: IUser[] = [
    { Email: 'skaflic@gmail.com', Password: '123' },
    { Email: 'babarzech@gmail.com', Password: 'Babar123' },
    { Email: 'admin@gmail.com', Password: '123' },
    { Email: 'admin@admin.com', Password: '123' },
]
export interface IAccoutInfo {
    AP?: boolean,
    Api?: boolean,
    Dv?:
    {
        C: boolean
        D: string
        I: number,
        Ip: string,
        L: string,
        Lg: string
    }[]
    ,
    DvCt?: number,
    EST?: Number,
    ESTUSD?: number,
    Em?: string,
    FT?: number,
    GAu?: boolean,
    KYC?:
    { S: 2 }
    LLg?: string,
    RvSh?: number,
    Sms?: boolean,
    TotalDv?: number,
    TotalLg?: number,
    UPgCt?: number,
    Ul?: number,
    Ulg?: {
        D: string
        Dv: string
        Ip: string
        L: string
    }[],
    UserId?: number,
    Phone?: string
}
export interface IchartStudies {
    name: string,
    fullName: string,
}
export interface IInterval {
    symbol: string,
    resolution: number
}
export interface ITradingData {
    BuySide?: {
        small?: { name: string, amount: number, color: string, percentage: number },
        medium?: { name: string, amount: number, color: string, percentage: number },
        large?: { name: string, amount: number, color: string, percentage: number },
        mega?: { name: string, amount: number, color: string, percentage: number },
    },
    SellSide?: {
        small?: { name: string, amount: number, color: string, percentage: number },
        medium?: { name: string, amount: number, color: string, percentage: number },
        large?: { name: string, amount: number, color: string, percentage: number },
        mega?: { name: string, amount: number, color: string, percentage: number },
    },
    inFlow?: number,
    outFlow?: number,
}

// chains string
// {"1":{"id":1,"name":"Bitcoin","symbol":"BTC","currencyType":0,"precision":0,"withdrawalFee":0.0006,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":1,"chainName":"BEP20","canDeposit":true,"canWithdraw":true,"withdrawFee":1.80659644,"minWithdraw":0,"depositAddressCurrency":3},{"chainId":8,"chainName":"BTC","canDeposit":true,"canWithdraw":true,"withdrawFee":1.80659644,"minWithdraw":0,"depositAddressCurrency":1}],"imgUrl":"/assets/images/newcoins/bitcoin.svg"},"2":{"id":2,"name":"Tether","symbol":"USDT","currencyType":0,"precision":0,"withdrawalFee":10,"canWithdraw":4,"status":1,"chainInfo":[],"imgUrl":"/assets/images/newcoins/tether.svg"},"3":{"id":3,"name":"Ethereum","symbol":"ETH","currencyType":0,"precision":0,"withdrawalFee":0.001,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":2,"chainName":"BEP20","canDeposit":false,"canWithdraw":true,"withdrawFee":1361238727.24179,"minWithdraw":0,"depositAddressCurrency":3,"feePer":"10.0000"}],"imgUrl":"/assets/images/newcoins/ethereum.svg"},"4":{"id":4,"name":"LItecoin","symbol":"LTC","currencyType":0,"precision":0,"withdrawalFee":0.01,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":2,"chainName":"BEP20","canDeposit":true,"canWithdraw":true,"withdrawFee":928936367.8588017,"minWithdraw":0,"depositAddressCurrency":3,"feePer":"10.0000"}],"imgUrl":"/assets/images/newcoins/litecoin.svg"},"5":{"id":5,"name":"cosmos","symbol":"ATOM","currencyType":0,"precision":0,"withdrawalFee":0.01,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":3,"chainName":"BEP20","canDeposit":false,"canWithdraw":true,"withdrawFee":8344.84156526,"minWithdraw":0,"depositAddressCurrency":3}],"imgUrl":"/assets/images/newcoins/cosmos.svg"},"6":{"id":6,"name":"Turkish Lira","symbol":"TRY","currencyType":0,"precision":0,"withdrawalFee":0,"canWithdraw":8,"status":1,"chainInfo":[],"imgUrl":"/assets/images/newcoins/turkish_lira.svg"}}