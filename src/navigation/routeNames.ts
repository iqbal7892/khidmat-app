export const LOGIN = 'Login';
export const LOGINROUTE = 'LoginRoute';
export const REGISTER = 'Register';
export const FORGET = 'Forget';
export const HOME = 'Home';
export const ABOUT = 'AboutUs';
export const FEES = 'Fees';
export const REFERAL_PROGRAM = 'Referal Program';
export const SETTINGS = 'Settings';
export const SUPPORT = 'Support';
export const MARKET = 'Market';
export const MARKETS = 'Markets';
export const TRADE = 'Trade';
export const ALLRATES = 'AllRates';
export const SPOT_CHART = 'Spot Chart';
export const MARGIN_CHART = 'Margin Chart';
export const DERIVATIVE_CHART = 'Derivative Chart';

// export const TRADE = 'Derivative';


export const DERIVATIVES = 'Derivatives';
export const TRADE_MAIN = 'Trade Main';
export const WALLETS = 'Wallets';
export const ASSETS = 'Assets';
export const DTRADE = 'Copy Trade';
export const LOGOUT = 'Logout';
export const TRADE_DETAIL = 'Trade Detail';
export const TRADE_DERIVATIVE = 'Derivative';

export const All_HISTORIES = 'All Histories';
export const OPEN_ORDERS = 'Open Orders';
export const OEER_MAIN_DERIVATIVE = 'OrderMainDerivative';
export const INVITE_FRIENDS = 'Invite Friends';
export const RISK_LIMIT = 'Risk Limit';
export const DEPOSIT = 'Deposit';
export const SPOT = 'SpotWallet';
export const DERIVATIVEWALLET = 'DerivativesWallet';
export const MARGINWALLET = 'MarginWallet';
export const USDCWALLET = 'UsdcWallet';
export const WITHDRAW = 'Withdraw';
export const SECURITY = 'Security';
export const TRANSFER = 'Transfer';
export const COINSELECTION = 'CoinSelection';
export const MYACCOUNT = 'MyAccount';
// export const ACCOUNTINFO = 'Account Info';
export const CHANGE_PASSWORD = 'ChangePassword';
export const SETTWOFA = 'Set Two Fa';
export const BUY_CRYPTO = 'BuyCryptowsithCreditCard';
export const ADD_COINS = 'Add Coin for Listing';
export const CROSS = 'CROSS';
export const DISTRIBUTION_HISTORY = 'Distribution History';
export const LANGUAGE = 'EN';
export const BuyCrypto_CoinPicker = 'Buy Crypto Coin Picker';
export const BuyCrypto_CurrencyPicker = 'Buy Crypto Currency Picker';
export const SIMPLEX_CHECKOUT = 'Simplex Checkout';
export const BETOPTRADER = 'Be Top Trader';
export const STAKING = 'Staking';
export const STAKING_DETAIL = 'StakingDetail';
export const STAKED_ACTIVE = 'StakingDetailActive';

export const WidthdrawVerificationLink = 'Withdraw Verification Email Link';
export const SignupVerificationLink = 'Signup Verification Email Link';
export const ForgetPasswordLink = 'Forget password Email Link';
export const DeviceVerificationLink = 'Device Verification Email Link';
export const Bydefault = 'Default page on Link';
export const DEVICEMANAGEMENT = 'DeviceManagment';
export const LASTLOGIN = 'LastLogins';
export const MARGINTRADE = 'Margin Trade';
export const PRICEALERTS = 'Price Alerts';
export const MARKETCOIN = 'Market Coins';
export const LANGUAGE_SCREEN = 'Language';
export const KYC = 'Kyc';
export const FEE = 'Fee';
export const JOIN_AFFILIATE = 'join_Affiliate';
export const WATCHLIST = 'Watchlist';
export const AllPAIRWATCHLIST = 'AllPairWatchList'
export const AFFILIATEOVERVIEW = 'Affiliate overview';
export const MARKETCOINDETAIL = 'Market Coin Detail';
export const HELP = 'Help';
export const GENERICPAGE = 'Generic Pages';
export const ADDWALLETAUTH = 'Wallet Auth';
export const TRANSFERMONEY = 'Transfer Money';
export const TRANSFERSUCCESS = 'Transfer Success';
export const MARKETROUTE = 'Market Route';
export const TERMSCONDITION = 'Terms Condition';
export const PRIVACYPOLICY = 'Privacy Policy'
// export const TRANSFERSUCCESS = 'Transfer Success'
// export const MARKETROUTE = 'Market Route'
export const TRADEROUTE = 'Trade Route'
export const DERIVATIVEROUTE = 'Derivative Route'
export const AFFAGREMENT = 'Affiliate Agreement'
export const MARKETSTATS = 'Market Stats'
export const BUYSELLSCREEN = 'Buy Sell Screen'
export const TRANSFERWHITELIST = 'Transfer WhiteList'
export const ADDWALLET = 'Add Wallet'
export const DERIVATIVEQUIZ = 'Derivative Quiz'
export const WELCOME_DERIVATIVE = 'Welcome Derivative'
export const CHAT = 'Live Chat';
export const TRANSACTION_HISTORY = 'TransactionHistory'
export const TRANSACTION_HISTORY_DETAIL = 'TransactionHistoryDetail'
export const TRANSACTION_GUIDE = 'TransactionGuide'






// export const DEPOSITNEW = 'Deposite New';


export const EXTERNALROUTES= {
    SUBMITREQUEST: 'help#submitcase',
    HELP: 'help'
}




export const HTTP_ROUTES = {
    'trade/device-authorization': DeviceVerificationLink, // 'device-authorization/:hash/:id',
    'trade/withdraw-confirmation': WidthdrawVerificationLink, // 'withdraw-confirmation/:hash/:id/:type'
    'trade/account/verify-email': SignupVerificationLink,  // 'account/verify-email/:hash1/:hash2/:id'
    'trade/reset-password': ForgetPasswordLink, // 'reset-password/:hash1/:hash2/:id':
    'trade/login': LOGIN, // 'Login':
    'trade/signup': REGISTER, // 'Register':
    'support/home': SUPPORT, // 'Support':
    'support/send-request': SUPPORT,
    'trade/buy-sell-crypto':BUY_CRYPTO , // buy crypto 
    'trade/dtrade-pro/top-traders':DTRADE , // buy crypto 
    'aboutus':ABOUT , // About
    '/':HOME , // Home
    default: Bydefault // Webview component
}


