import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image, ImageBackground, Text, TouchableOpacity, Modal, View } from 'react-native';
import * as React from 'react';
import { theme, fontSizes, HeightToDp, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import Trade from '../screens/Trade';
import { ASSETS, DERIVATIVEROUTE, DEPOSIT, DERIVATIVES, HOME, MARKETROUTE, MARKETS, TRADE, TRADEROUTE, WALLETS } from './routeNames';
import WalletsMain from '../screens/Wallet/WalletMain';
import { StackCardInterpolationProps } from '@react-navigation/stack';
import { __, isIphoneNotch } from '../helpers/common';
import Derivatives from '../screens/Trade/Derivatives';
import NewHome from '../screens/NewHome';
import LoginRoute from '../screens/LoginRoute';
import DepositMain from '../screens/Deposit/DepositMain';
import MarketRoute from '../screens/MarketRoute';
import { disptachDepositAlert, disptachDerQuizAlert, disptachisDeposit } from '../redux/dispatch';
import DerivativeRoute from '../screens/DerivativeRoute';
import TradeRoute from '../screens/TradeRoute';
import { useRoute } from '@react-navigation/native';
import { store } from '../redux/Store';
import { ApiCall } from '../helpers/apicall';
import { FutureApi } from '../helpers/futureapi';
import Market from '../screens/Trade/Market';



const Tab = createBottomTabNavigator();
const excludedTabs = [1,5]

const CustomTabBar = (props) => {
  const _isNotch = isIphoneNotch();
  return (
    // <React.Fragment>
    // {(excludedTabs.indexOf(props.state.index) === -1) && <ImageBackground source={require("../assets/images/bg/bottom-tab.png")} resizeMode='cover' style={{ width: '100%', height: HeightToDp(72 + (_isNotch ? 30 : 0)), backgroundColor: '#fff' }} >
    //   <View style={styles.tabShadow1}></View>
    //   <BottomTabBar {...props} />
    //   <View style={styles.tabShadow2}></View>
    // </ImageBackground>
    // }
    // {excludedTabs.indexOf(props.state.index) > -1 && <BottomTabBar {...props} />}
    // </React.Fragment>

    <ImageBackground source={require("../assets/images/bg/bottom-tab.png")} resizeMode='cover' style={{ width: '100%', height: HeightToDp(72 + (_isNotch ? 30 : 0)), backgroundColor: '#fff' }} >
      <View style={styles.tabShadow1}></View>
      <BottomTabBar {...props} />
      <View style={styles.tabShadow2}></View>
    </ImageBackground>
  );
}


function BottomTabNavigator({ navigation }, isAuth: boolean) {
  const _isNotch = isIphoneNotch(); 
  const apiCall = ApiCall.getInstance()
  const Deposit = () => {
    return isAuth ? NewHome : LoginRoute
      // return DepositAlert
    // return LoginRoute
    // return isAuth ? DepositAlert : LoginRoute
  }
 const showModel = (props:any) => {
  if(store.getState().authReducer.derQuizAlert)
  disptachDerQuizAlert(false);

  var state = navigation.getState();
  // if(!store.getState().authReducer.isDepositPage)
  const index = state?.routes[0]?.state?.index;
  if (index)
    navigation.navigate(HOME)
  else
    disptachDepositAlert(!store.getState().authReducer.depositAlert)
}

const showDerQuizModal = async () => {
  if(store.getState().authReducer.depositAlert)
    disptachDepositAlert(false);
  
  if(isAuth){
    // const resp = await apiCall.getAuthData('margin/marginuser/get-quiz-status', {Status: 1});
    const resp = await FutureApi.getInstance().getQuizStatus()
    if(resp){
        navigation.navigate(DERIVATIVES)
    } else {
        disptachDerQuizAlert(!store.getState().authReducer.derQuizAlert)
    }
  } else {
    navigation.navigate(DERIVATIVES)
  }  
}

 const otherPages = (props:any) => {
  // console.log('okay',props);
  if(store.getState().authReducer.isDepositPage)
  disptachisDeposit(false)
 }

 const navigateToScreen = (route: string) => {
  if(store.getState().authReducer.depositAlert)
    disptachDepositAlert(false);
  
  if(store.getState().authReducer.derQuizAlert)
    disptachDerQuizAlert(false);  
  
  navigation.navigate(route)
 }



  return (
    <>
    <Tab.Navigator
      tabBar={CustomTabBar}
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.D0D3DF,
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
        },
        // tabBarStyle: {
        //   backgroundColor: 'rgba(255,255,255,0)',
        //   elevation: 6,
        //   shadowOffset: { width: 0, height: -1 },
        //   shadowColor: 'rgba(0, 0, 0, 0.04)',
        //   shadowOpacity: 1,
        //   shadowRadius: 24,
        //   borderTopWidth: 0,
        //   paddingTop: HeightToDp(16) + HeightToDp(_isNotch ? 15 : 0),
        //   paddingBottom: HeightToDp(16) + HeightToDp(_isNotch ? 15 : 0),
        //   height: HeightToDp(72 + (_isNotch ? 30 : 0))
        // },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'rgba(255, 255, 255, 0)',
          shadowOffset: { width: 0, height: -1 },
          shadowColor: 'rgba(0, 0, 0, 0.04)',
          shadowOpacity: 1,
          shadowRadius: 24,
          elevation: 6,
          flex: 1
        },
        tabBarItemStyle: {
          elevation: 0,
          backgroundColor: 'transparent',
          position: 'relative',
          paddingTop: HeightToDp(16) + HeightToDp(_isNotch ? 15 : 0),
          paddingBottom: HeightToDp(16) + HeightToDp(_isNotch ? 15 : 0),
          height: HeightToDp(72 + (_isNotch ? 30 : 0))
        },
        tabBarIcon: ({ focused, color }) => {
          let imageName;
          if (route.name === 'DepositMain') {
            return <Image source={require('../assets/images/icons/logo-round.png')} style={styles.tabIconLogo} />
          }else if (route.name === HOME) {
            imageName = focused ? require('../assets/images/botmtabicon/homeactive.png') : require('../assets/images/botmtabicon/home.png');
          } 
          else if (route.name === MARKETROUTE) {
            imageName = focused ? require('../assets/images/botmtabicon/marketactive_n.png') : require('../assets/images/botmtabicon/market_n.png');
          }
          else if (route.name === DERIVATIVEROUTE) {
            imageName = focused ? require('../assets/images/botmtabicon/derivatactive_n.png') : require('../assets/images/botmtabicon/derivat_n.png');
          }
          else if (route.name === TRADEROUTE) {
            imageName = focused ? require('../assets/images/botmtabicon/tradeactive_n.png') : require('../assets/images/botmtabicon/trade_n.png');
          }
          else if (route.name === 'DepositAlert') {
            imageName = focused ? require('../assets/images/botmtabicon/walletactive_n.png') : require('../assets/images/botmtabicon/wallet_n.png');
          }
          return <Image source={imageName} style={styles.tabIcon} />
        }
      })}>
      <Tab.Screen name={HOME} component={NewHome} options={{
        tabBarButton: (props) => <TouchableOpacity {...props} >
          <View>{props.children}</View>
          <View style={[styles.tabActiveBar, {bottom: _isNotch ? HeightToDp(15) : 0}]} />
        </TouchableOpacity>,
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__('home')}</Text>),
      }}/>
      <Tab.Screen name={MARKETROUTE} component={MarketRoute} options={{
        // tabBarStyle: {display: 'none'},
        tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} onPress={() => {navigateToScreen(MARKETS)}}></TouchableOpacity>,
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__('markets')}</Text>),
      }}/>
      {isAuth?<Tab.Screen name={'DepositMain'} component={Deposit()} options={{
        tabBarLabel: '',
        tabBarButton:(props) => (<TouchableOpacity {...props} onPress={()=>{showModel(props)}} />),
        tabBarIconStyle: {marginBottom: HeightToDp(45)}
      }}/>:<Tab.Screen name={'DepositMain'} component={Deposit()} options={{
        tabBarLabel: '',
        tabBarIconStyle: {marginBottom: HeightToDp(45)}
      }}/>}
      <Tab.Screen name={DEPOSIT} component={DepositMain} options={{
        tabBarItemStyle:{display:'none'},
      }}/>
      <Tab.Screen name={DERIVATIVEROUTE} component={DerivativeRoute} options={{
        // tabBarButton: (props) => <TouchableOpacity {...props} onPress={()=>{otherPages(props)}}></TouchableOpacity>,
        tabBarButton:(props) => (<TouchableOpacity activeOpacity={1} {...props} onPress={showDerQuizModal} />),
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__('der')}</Text>),
      }}/>
      <Tab.Screen name={TRADEROUTE} component={TradeRoute} options={{
        // tabBarStyle: {display: 'none'},
        tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} onPress={()=> navigateToScreen(TRADE)}></TouchableOpacity>,
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__(TRADE)}</Text>),
      }}/>
      {/* {isAuth && <Tab.Screen name={ASSETS} component={WalletsMain} options={{
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__(ASSETS)}</Text>),
      }}/>}
      {!isAuth && <Tab.Screen name={ASSETS} component={LoginRoute} options={{
        tabBarLabel:({ focused, color })=>(<Text style={[styles.tabLabel, {color:focused ? theme.colors._primary.darkest: theme.colors._text.color3}]}>{__(ASSETS)}</Text>),
      }}/>} */}
    </Tab.Navigator>
    </>
  );
}

export const BottomTabGuestNavigator = (props) => {
  return BottomTabNavigator(props, false)
}

export const BottomTabAuthNavigator = (props) => {
  return BottomTabNavigator(props, true)
}


const styles = StyleSheetManager.Create({

  tabIcon: {
    height: WidthToDp(20),
    width: WidthToDp(20),
    resizeMode: 'contain',
  },
  tabIconLogo: {
    height: WidthToDp(76),
    width: WidthToDp(76),
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: fontSizes(12),
    fontFamily: theme.fonts.geomanistRegular,
    color: theme.colors._text.color3,
    marginTop: HeightToDp(8),
    flex: 1,
  },
  tabActiveBar: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    height: 4, 
    backgroundColor: theme.colors._primary.darkest, 
    borderTopLeftRadius: 4, 
    borderTopRightRadius: 4
  },
  tabShadow1: {
    backgroundColor: '#FAFCFF', 
    position: 'absolute', 
    top: HeightToDp(-9), 
    left: WidthToDp(24), 
    borderRadius: 4, 
    zIndex:-1,
    height: HeightToDp(72),
    width: WidthToDp(268)
  },
  tabShadow2: {
    backgroundColor: '#FAFCFF', 
    position: 'absolute', 
    top: HeightToDp(-9), 
    right: 0, 
    borderRadius: 4, 
    zIndex:-1,
    height: HeightToDp(72),
    width: WidthToDp(59)
  }

});

