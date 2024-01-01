import React, { useEffect, useState } from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import {
  ABOUT, ADD_COINS, BETOPTRADER, BuyCrypto_CoinPicker, BuyCrypto_CurrencyPicker,
  BUY_CRYPTO, Bydefault, DEPOSIT, DERIVATIVES, DERIVATIVEWALLET, DEVICEMANAGEMENT,
  DeviceVerificationLink, DISTRIBUTION_HISTORY, FEES, FORGET, ForgetPasswordLink,
  HOME, INVITE_FRIENDS, LANGUAGE, LOGIN, LOGOUT, MYACCOUNT, OPEN_ORDERS,
  REFERAL_PROGRAM, REGISTER, RISK_LIMIT, SECURITY, SETTINGS, TRANSFER,
  COINSELECTION, SETTWOFA, SignupVerificationLink, SIMPLEX_CHECKOUT,
  SPOT, STAKED_ACTIVE, STAKING, STAKING_DETAIL, SUPPORT, TRADE,
  TRADE_DETAIL, USDCWALLET, WidthdrawVerificationLink, WITHDRAW, OEER_MAIN_DERIVATIVE,
  MARGINTRADE, PRICEALERTS, MARGINWALLET, MARKET, MARKETCOIN, KYC, LANGUAGE_SCREEN,
  AFFILIATEOVERVIEW, JOIN_AFFILIATE, FEE, WATCHLIST, LOGINROUTE, MARKETCOINDETAIL, AllPAIRWATCHLIST, HELP, ALLRATES, GENERICPAGE,ADDWALLETAUTH ,TRANSFERMONEY , TRANSFERSUCCESS, ASSETS, MARKETROUTE, MARKETS ,TERMSCONDITION,PRIVACYPOLICY ,AFFAGREMENT, MARKETSTATS,
  BUYSELLSCREEN, TRANSFERWHITELIST, ADDWALLET , DERIVATIVEQUIZ, WELCOME_DERIVATIVE, CHAT, SPOT_CHART, MARGIN_CHART, DERIVATIVE_CHART, TRANSACTION_HISTORY_DETAIL, TRANSACTION_HISTORY, TRANSACTION_GUIDE
} from './routeNames';
import ReferalProgram from '../screens/ReferalProgram';
import Fees from '../screens/Fees';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Forget from '../screens/Forget';
import About from '../screens/About';
import Support from '../screens/Support';
import RiskLimit from '../screens/RiskLimit';
import { BottomTabAuthNavigator, BottomTabGuestNavigator } from './BottomTabNavigator';
import DepositHistory from '../screens/Deposit/DepositHistory';
import DepositMain from '../screens/Deposit/DepositMain';
import WalletDetail from '../screens/Wallet/WalletDetail';
import WithdrawHistory from '../screens/Withdraw/WithdrawHistory';
import WithdrawMain from '../screens/Withdraw/WithdrawMain';
import WithdrawHistoryDetail from '../screens/Withdraw/WithdrawHistoryDetail';
import DepositHistoryDetail from '../screens/Deposit/DepositHistoryDetail';
import OrderMain from '../screens/MyOrders/OrderMain';
import OrderMainDerivative from '../screens/Trade/Derivatives/MyOrders/OrderMain';
import OrderItemDetail from '../components/OrderItemDetail';
import OrderHistoryDetail from '../screens/MyOrders/OrderHistoryDetail';
import TransactionHistory from '../screens/Transaction/TransactionHistory';
import { connect } from 'react-redux';
import InviteFriends from '../screens/InviteFriends';
import Security from '../screens/Security';
import Transfer from '../screens/Transfer';
// import CoinSelect from '../screens/Transfer/SelectCoin';
import MyAccount from '../screens/MyAccount';
import AuthenticationSetting from '../screens/MyAccount/MyAccountComponents/AuthenticationSetting';
import ChangePassword from '../screens/MyAccount/MyAccountComponents/ChangePassword';
import LastLogin from '../screens/MyAccount/MyAccountComponents/LastLogin';
import DeviceManagment from '../screens/MyAccount/MyAccountComponents/DeviceManagment';
import AccountVerification from '../screens/MyAccount/MyAccountComponents/AccountVerification';
import DiscountedTrading from '../screens/MyAccount/MyAccountComponents/DiscountedTrading';
import AntiPhishing from '../screens/MyAccount/MyAccountComponents/AntiPhishing';
import GoogleAuthentication from '../screens/MyAccount/MyAccountComponents/GoogleAuthentication';
// import Welcome from '../screens/KYC/Welcome';
// import StepOne from '../screens/KYC/StepOne';
// import StepTwo from '../screens/KYC/StepTwo';
import StepThree from '../screens/KYC/StepThree';
import ThankYou from '../screens/KYC/ThankYou';
import BuyCrypto from '../screens/BuyCrypto';
import AddCoin from '../screens/AddCoin';
import BuyCryptoCoinPicker from '../screens/BuyCrypto/Components/CoinPicker';
import BuyCryptoCurrencyPicker from '../screens/BuyCrypto/Components/CurrencyPicker';
import SimplexCheckout from '../screens/BuyCrypto/SimplexCheckout';
import Post from '../screens/News/Post';
import News from '../screens/News';
import RequestSent from '../components/RequestSent';
import DistributionHistory from '../screens/DistributionHistory';
import { HttpRouting } from '../services/httprouting';
import { useNavigation } from '@react-navigation/native';
import WithdrawVerificationLink from '../screens/HttpLinkScreens/WithdrawVerification';
import SignupEmailLink from '../screens/HttpLinkScreens/SignUpVerification';
import ForgetPasswordEmailLink from '../screens/HttpLinkScreens/ForgetPassword';
import DeviceVerificationEmailLink from '../screens/HttpLinkScreens/DeviceVerification';
import BydefaultLink from '../screens/HttpLinkScreens/BydefaultLink';
import Staking from '../screens/Staking';
import StakingDetail from '../screens/Staking/Detail.tsx';
import StakedAssets from '../screens/Staking/StakedAssets';
import Trade from '../screens/Trade';
import SpotWallet from '../screens/Wallet/SpotWallet';
import DerivativesWallet from '../screens/Wallet/DerivativesWallet';
import UsdcWallet from '../screens/Wallet/UsdcWallet';
import AllTrades from '../screens/MyOrders/AllTrades';
import Derivatives from '../screens/Trade/Derivatives';
import SpotTrade from '../screens/Trade/TradingSpot/SpotTrade';
import MarginTrade from '../screens/Trade/Margin/MarginTrade';
import CoinSelection from '../screens/Transfer/SelectCoin';
import PriceAlert from '../screens/Trade/PriceAlert';
import MarketCoin from '../screens/MarketCoin';
import MarginWallet from '../screens/Wallet/MarginWallet';
import KycSumSub from '../screens/KYC';
import Language from '../screens/Language';
import Fee from '../screens/Fee';
import JoinAffiliate from '../screens/AffiliateSystem/JoinAffiliate';
import AffiliateOverview from '../screens/AffiliateSystem/AffiliateOverview';
import AllWatchList from '../screens/AllWatchList';
import LoginRoute from '../screens/LoginRoute';
import MarketDetail from '../screens/MarketCoinDetails';
import Help from '../screens/Help';
import AllPairWatchList from '../screens/AllPairWatchList';
import AccountInfo from '../screens/AccountInfo';
import AllRates from '../screens/AllRates';
import Generic from '../screens/GenericPages';
import AddWalletAuth from '../components/AddWallet/AddWalletAuth';
import TransferMoney from '../components/AddWallet/TransferMoney';
import TransferSuccess from '../components/AddWallet/TransferSuccess';
import WalletMain from '../screens/Wallet/WalletMain';
import MarketRoute from '../screens/MarketRoute';
import Market from '../screens/Trade/Market';
import TermsandCondition from '../screens/TermsAndCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';
// import DepositeNew from '../screens/DepositNew';
import AffiliateAgreement from '../screens/AffiliateAgreement';
import MarketStats from '../screens/MarketStats';
import BuySell from '../screens/MarketStats/BuySell';
import TransferWhiteList from '../screens/TransferWhitelist';
import AddWallet from '../screens/AddWallet';
import DerivativesQuiz from '../screens/DerivativesQuiz/Quiz';
import DerivativesWelcome from '../screens/DerivativesQuiz/Quiz/Welcome';
import Chat from '../screens/Chat';
import SpotChart from '../screens/Trade/TradeSpotNew/SpotChart';
import MarginChartNew from '../screens/Trade/Margin/MarginChartNew';
import DerivativeChartNew from '../screens/Trade/Derivatives/UsdtPerp/DerivativeChartNew';
import TransactionHistoryDetail from '../screens/Transaction/TransactionDetail';
import TransactionGuide from '../screens/Transaction/TransactionGuide';




const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  cardShadowEnabled: false,
  cardStyleInterpolator: ({ current, next, inverted, layouts: { screen }, closing }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [screen.width, 0],
            }),
          },
          {
            translateX: next ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -screen.width],
            }) : 1,
          },
        ],
      },
    };
  }
}

const HomeStack = createStackNavigator();

const HomeNavigator = (props: any) => {
  const httpLink = HttpRouting.getInstance();
  const [defaultRoute, setDefaultRoute] = useState("BottomTab");
  if (!httpLink.isInitied()) {
    if (httpLink.hasLink())
      setDefaultRoute(httpLink.getRouting() ?? 'BottomTab')
    const nav = useNavigation();
    httpLink.startListener(nav);
  }
  return (
    props.isLoggedIn ? (
      <HomeStack.Navigator initialRouteName={defaultRoute} screenOptions={screenOptions}>
        <HomeStack.Screen name='BottomTab' component={BottomTabAuthNavigator} />
        
        <HomeStack.Screen name={ASSETS} component={WalletMain} />
        <HomeStack.Screen name={DEPOSIT} component={DepositMain} />
        <HomeStack.Screen name='DepositHistory' component={DepositHistory} />
        <HomeStack.Screen name='DepositHistoryDetail' component={DepositHistoryDetail} />
        <HomeStack.Screen name='WALLETDETAIL' component={WalletDetail} />
        <HomeStack.Screen name={WITHDRAW} component={WithdrawMain} />
        <HomeStack.Screen name='WithdrawHistory' component={WithdrawHistory} />
        <HomeStack.Screen name='WithdrawHistoryDetail' component={WithdrawHistoryDetail} />
        <HomeStack.Screen name={OPEN_ORDERS} component={OrderMain} />
        <HomeStack.Screen name={OEER_MAIN_DERIVATIVE} component={OrderMainDerivative} />
        <HomeStack.Screen name='OpenOrderDetail' component={OrderItemDetail} />
        <HomeStack.Screen name='OrderHistoryDetail' component={OrderHistoryDetail} />
        <HomeStack.Screen name='AllTrades' component={AllTrades} />
        <HomeStack.Screen name={TRANSACTION_HISTORY} component={TransactionHistory} />
        <HomeStack.Screen name={TRANSACTION_HISTORY_DETAIL} component={TransactionHistoryDetail} />
        <HomeStack.Screen name={INVITE_FRIENDS} component={InviteFriends} />
        <HomeStack.Screen name={SECURITY} component={Security} />
        <HomeStack.Screen name={TRANSFER} component={Transfer} />
        <HomeStack.Screen name={COINSELECTION} component={CoinSelection} />
        <HomeStack.Screen name={ABOUT} component={About} />
        <HomeStack.Screen name={SUPPORT} component={Support} />
        <HomeStack.Screen name={RISK_LIMIT} component={RiskLimit} />
        <HomeStack.Screen name={FORGET} component={Forget} />
        <HomeStack.Screen name={REFERAL_PROGRAM} component={ReferalProgram} />
        <HomeStack.Screen name={FEES} component={Fees} />
        <HomeStack.Screen name={SETTINGS} component={Settings} />
        <HomeStack.Screen name={TRANSACTION_GUIDE} component={TransactionGuide} />
        {/* <HomeStack.Screen name={MYACCOUNT} component={MyAccount} /> */}

        <HomeStack.Screen name={MYACCOUNT} component={AccountInfo} />
        <HomeStack.Screen name='AuthenticationSetting' component={AuthenticationSetting} />
        <HomeStack.Screen name={SETTWOFA} component={GoogleAuthentication} />
        <HomeStack.Screen name='ChangePassword' component={ChangePassword} />
        <HomeStack.Screen name='LastLogins' component={LastLogin} />
        <HomeStack.Screen name={DEVICEMANAGEMENT} component={DeviceManagment} />
        <HomeStack.Screen name='Verification' component={AccountVerification} />
        <HomeStack.Screen name='DiscountedTrading' component={DiscountedTrading} />
        <HomeStack.Screen name='AntiPhishing' component={AntiPhishing} />
        <HomeStack.Screen name={TRADE} component={Trade} />
        <HomeStack.Screen name={SPOT_CHART} component={SpotChart} />
        {/* <HomeStack.Screen name={'KYCWelcome'} component={Welcome} /> */}
        {/* <HomeStack.Screen name={'KYCStepOne'} component={StepOne as any} /> */}
        {/* <HomeStack.Screen name={'KYCStepTwo'} component={StepTwo} /> */}
        <HomeStack.Screen name={'KYCStepThree'} component={StepThree} />
        <HomeStack.Screen name={'KYCThankYou'} component={ThankYou} />
        <HomeStack.Screen name={BUY_CRYPTO} component={BuyCrypto} />
        <HomeStack.Screen name={BuyCrypto_CoinPicker} component={BuyCryptoCoinPicker} />
        <HomeStack.Screen name={BuyCrypto_CurrencyPicker} component={BuyCryptoCurrencyPicker} />
        <HomeStack.Screen name={SIMPLEX_CHECKOUT} component={SimplexCheckout} />
        <HomeStack.Screen name='Post' component={Post} />
        <HomeStack.Screen name='News' component={News} />
        <HomeStack.Screen name='RequestSent' component={RequestSent} />
        <HomeStack.Screen name={ADD_COINS} component={AddCoin} />
        <HomeStack.Screen name={LANGUAGE} component={Language} />
        <HomeStack.Screen name={DISTRIBUTION_HISTORY} component={DistributionHistory} />
        <HomeStack.Screen name={WidthdrawVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={WithdrawVerificationLink} />
        <HomeStack.Screen name={SignupVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={SignupEmailLink} />
        <HomeStack.Screen name={ForgetPasswordLink} initialParams={{ url: httpLink.getLinkUrl() }} component={ForgetPasswordEmailLink} />
        <HomeStack.Screen name={DeviceVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={DeviceVerificationEmailLink} />
        <HomeStack.Screen name={Bydefault} component={BydefaultLink} />
        <HomeStack.Screen name={STAKING} component={Staking} />
        <HomeStack.Screen name={STAKING_DETAIL} component={StakingDetail} />
        <HomeStack.Screen name={STAKED_ACTIVE} component={StakedAssets} />
        <HomeStack.Screen name={SPOT} component={SpotWallet} />
        <HomeStack.Screen name={DERIVATIVEWALLET} component={DerivativesWallet} />
        <HomeStack.Screen name={MARGINWALLET} component={MarginWallet} />
        <HomeStack.Screen name={USDCWALLET} component={UsdcWallet} />
        <HomeStack.Screen name={DERIVATIVES} component={Derivatives} />
        <HomeStack.Screen name={MARGINTRADE} component={MarginTrade} />
        <HomeStack.Screen name={MARGIN_CHART} component={MarginChartNew} />
        <HomeStack.Screen name={PRICEALERTS} component={PriceAlert} />
        <HomeStack.Screen name={MARKETCOIN} component={MarketCoin} />
        <HomeStack.Screen name={KYC} component={KycSumSub} />
        <HomeStack.Screen name={LANGUAGE_SCREEN} component={Language} />
        <HomeStack.Screen name={FEE} component={Fee} />
        <HomeStack.Screen name={AFFILIATEOVERVIEW} component={AffiliateOverview} />
        <HomeStack.Screen name={JOIN_AFFILIATE} component={JoinAffiliate} />
        <HomeStack.Screen name={WATCHLIST} component={AllWatchList} />
        <HomeStack.Screen name={AllPAIRWATCHLIST} component={AllPairWatchList} />      
        <HomeStack.Screen name={MARKETCOINDETAIL} component={MarketDetail} />
        <HomeStack.Screen name={HELP} component={Help} />
        <HomeStack.Screen name={GENERICPAGE} component={Generic} />
        <HomeStack.Screen name={ALLRATES} component={AllRates} />
        <HomeStack.Screen name={ADDWALLETAUTH} component={AddWalletAuth} />
        <HomeStack.Screen name={TRANSFERMONEY} component={TransferMoney} />
        <HomeStack.Screen name={TRANSFERSUCCESS} component={TransferSuccess} />
        <HomeStack.Screen name={MARKETS} component={Market}/>
        <HomeStack.Screen name={MARKETROUTE} component={MarketRoute}/>
        <HomeStack.Screen name={TERMSCONDITION} component={TermsandCondition}/>
        <HomeStack.Screen name={PRIVACYPOLICY} component={PrivacyPolicy}/>
        <HomeStack.Screen name={AFFAGREMENT} component={AffiliateAgreement}/>
        <HomeStack.Screen name={MARKETSTATS} component={MarketStats}/>
        <HomeStack.Screen name={BUYSELLSCREEN} component={BuySell}/>
        <HomeStack.Screen name={TRANSFERWHITELIST} component={TransferWhiteList}/>
        <HomeStack.Screen name={ADDWALLET} component={AddWallet}/>
        <HomeStack.Screen name={DERIVATIVEQUIZ} component={DerivativesQuiz}/>
        <HomeStack.Screen name={WELCOME_DERIVATIVE} component={DerivativesWelcome}/>
        <HomeStack.Screen name={CHAT} component={Chat}/>
        <HomeStack.Screen name={DERIVATIVE_CHART} component={DerivativeChartNew}/>

        {/* <HomeStack.Screen name={DEPOSITNEW} component={DepositeNew} /> */}


      </HomeStack.Navigator>
    ) : (
      <HomeStack.Navigator initialRouteName={defaultRoute} screenOptions={screenOptions}>
        <HomeStack.Screen name='BottomTab' component={BottomTabGuestNavigator} />
        <HomeStack.Screen name={LOGIN} component={Login} />
        <HomeStack.Screen name={LOGINROUTE} component={LoginRoute}/>
        <HomeStack.Screen name={MARKETROUTE} component={MarketRoute}/>
        <HomeStack.Screen name={REGISTER} component={Signup as any} />
        <HomeStack.Screen name={REFERAL_PROGRAM} component={ReferalProgram} />
        <HomeStack.Screen name={ADD_COINS} component={AddCoin} />
        <HomeStack.Screen name={ABOUT} component={About} />
        <HomeStack.Screen name={SECURITY} component={Security} />
        <HomeStack.Screen name={TRANSFER} component={Login} />
        <HomeStack.Screen name={COINSELECTION} component={CoinSelection} />
        <HomeStack.Screen name={SUPPORT} component={Support} />
        <HomeStack.Screen name={FEES} component={Fees} />
        <HomeStack.Screen name={LANGUAGE} component={Language} />
        <HomeStack.Screen name={FORGET} component={Forget} />
        <HomeStack.Screen name={DEPOSIT} component={Login} />
        <HomeStack.Screen name={WITHDRAW} component={Login} />
        <HomeStack.Screen name={BUY_CRYPTO} component={BuyCrypto} />
        <HomeStack.Screen name={BuyCrypto_CoinPicker} component={BuyCryptoCoinPicker} />
        <HomeStack.Screen name={BuyCrypto_CurrencyPicker} component={BuyCryptoCurrencyPicker} />
        <HomeStack.Screen name='RequestSent' component={RequestSent} />
        <HomeStack.Screen name='Post' component={Post} />
        <HomeStack.Screen name='News' component={News} />
        <HomeStack.Screen name={BETOPTRADER} component={Login} />
        <HomeStack.Screen name={TRADE} component={Trade} />
        <HomeStack.Screen name={SPOT_CHART} component={SpotChart} />
        <HomeStack.Screen name={STAKING} component={Staking} />
        <HomeStack.Screen name={STAKING_DETAIL} component={StakingDetail} />
        <HomeStack.Screen name={STAKED_ACTIVE} component={StakedAssets} />
        <HomeStack.Screen name={WidthdrawVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={WithdrawVerificationLink} />
        <HomeStack.Screen name={SignupVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={SignupEmailLink} />
        <HomeStack.Screen name={ForgetPasswordLink} initialParams={{ url: httpLink.getLinkUrl() }} component={ForgetPasswordEmailLink} />
        <HomeStack.Screen name={DeviceVerificationLink} initialParams={{ url: httpLink.getLinkUrl() }} component={DeviceVerificationEmailLink} />
        <HomeStack.Screen name={Bydefault} component={BydefaultLink} />
        <HomeStack.Screen name={DERIVATIVES} component={Derivatives} />
        <HomeStack.Screen name={MARGINTRADE} component={MarginTrade} />
        <HomeStack.Screen name={MARGIN_CHART} component={MarginChartNew} />
        <HomeStack.Screen name={PRICEALERTS} component={PriceAlert} />
        <HomeStack.Screen name={MARKETCOIN} component={MarketCoin} />
        <HomeStack.Screen name={LANGUAGE_SCREEN} component={Language} />
        <HomeStack.Screen name={FEE} component={Fee} />
        <HomeStack.Screen name={WATCHLIST} component={AllWatchList} />
        <HomeStack.Screen name={AllPAIRWATCHLIST} component={AllPairWatchList} />
        {/* <HomeStack.Screen name={JOIN_AFFILIATE} component={JoinAffiliate} /> */}
        <HomeStack.Screen name={AFFILIATEOVERVIEW} component={AffiliateOverview} />
        <HomeStack.Screen name={MARKETCOINDETAIL} component={MarketDetail} />
        <HomeStack.Screen name={HELP} component={Help} />
        <HomeStack.Screen name={GENERICPAGE} component={Generic} />
        <HomeStack.Screen name={ALLRATES} component={AllRates} />
        <HomeStack.Screen name={MARKETS} component={Market}/>
        <HomeStack.Screen name={TERMSCONDITION} component={TermsandCondition}/>
        <HomeStack.Screen name={PRIVACYPOLICY} component={PrivacyPolicy} />
        <HomeStack.Screen name={CHAT} component={Chat}/>
        <HomeStack.Screen name={DERIVATIVE_CHART} component={DerivativeChartNew}/>
        {/* <HomeStack.Screen name={DEPOSITNEW} component={DepositeNew} /> */}

      </HomeStack.Navigator>
    )
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(HomeNavigator);