import React, { useContext, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import {
  Image,
  // Alert,
  Text,
  View,
  TouchableHighlight,
  Pressable,
  // Linking,
  Platform,
  StatusBar,
  Share
} from 'react-native';
import { HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';
import {
  ABOUT, ADD_COINS, All_HISTORIES, BUY_CRYPTO, CHANGE_PASSWORD, DISTRIBUTION_HISTORY, CROSS, FEES, HOME, INVITE_FRIENDS, LANGUAGE, LOGIN, MYACCOUNT, OPEN_ORDERS, REFERAL_PROGRAM,
  SECURITY, SETTINGS, STAKING, SUPPORT, LANGUAGE_SCREEN, KYC, FEE, AFFILIATEOVERVIEW,
  JOIN_AFFILIATE, HELP, GENERICPAGE, TERMSCONDITION,
  PRIVACYPOLICY, EXTERNALROUTES,
  DERIVATIVEQUIZ,
  CHAT
} from '../routeNames';
// import { ABOUT, ADD_COINS, All_HISTORIES, BUY_CRYPTO, CHANGE_PASSWORD, DISTRIBUTION_HISTORY, CROSS, FEES, HOME, INVITE_FRIENDS, LANGUAGE, LOGIN, MYACCOUNT, OPEN_ORDERS, REFERAL_PROGRAM, SECURITY, SETTINGS, STAKING, SUPPORT, LANGUAGE_SCREEN, KYC, AFFILIATEOVERVIEW, JOIN_AFFILIATE } from '../routeNames';
import styles from './styles';
import { ApiCall } from '../../helpers/apicall';
import { User } from '../../models/user';
import { AppSettings } from '../../config/config';
// import Home from '../../screens/Home';
import LanguageModal from '../../components/Modals/LanguageModal';
// import { Storage } from '../../helpers/storage';
// import MyAccount from '../../screens/MyAccount';
import { __ } from '../../helpers/common';
import { LanguageContext } from '../../../LanguageContext';
import * as Clipboard from 'expo-clipboard';
import { NotificationType, TNotification } from '../../helpers/notification';
import { IAffilateProfile } from '../../helpers/interfaces';
import { AffiliateApi } from '../../helpers/affiliateapi';
// import ProfileImage from './ProfileImage';
import { dispatchUserImage } from '../../redux/dispatch';
import { LinearGradient } from 'expo-linear-gradient';
import {  CustomHeader, HeaderTopWrap } from '../../components/Header';
import { CustomBackButton } from '../../components/BackButton';
import Profile from '../../components/Profile';
import AccountTaskListitem from '../../screens/AccountInfo/MyAccountComponents/AccountTaskListItem';
// import { UserWallets } from '../../services/userwallets';
import { Socket } from '../../services/socket';
// import { Notification, NotificationType } from '../../helpers/notification';

// import Transfer from '../../screens/Transfer';

const DrawerAuthMenus = ({ props }: any) => {


  const navigation = props.navigation;
  const apiCall = ApiCall.getInstance();
  const user = User.getInstance();
  const [email, setEmail] = useState('');
  const [UserId, setUserId] = useState('');
  const [refferal, setrefferal] = useState(null)
  const [totalOrders, settotalOrders] = useState(null)
  const [slevel, setslevel] = useState('Low')
  const [modalVisible, setModalVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false);
  const [isAffilateActivated, setisAffilateActivated] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);


  const { lang } = useContext(LanguageContext)

  useEffect(() => {

    setEmail(user.getEmail())
    setUserId(user.getUserId())
    accountinfo()
    getProfile()
    getProfilePicture()
  }, [])
  const isMatched = (a: string, b: string) => {
    return a?.split('?X-')[0] === b?.split('?X-')[0]
  }
  const getProfile = async () => {
    let res: IAffilateProfile = await AffiliateApi.getInstance().getProfile();

    if (res.Found && res?.Status) {
      setisAffilateActivated(true);
      // this.setState({ profile: res });
      // this.props.navigation.navigate(JOIN_AFFILIATE);

      // let any: any = {...res};
      // this.setState(res);
    } else {
      setisAffilateActivated(false);

      // this.props.navigation.navigate(JOIN_AFFILIATE);
    }
    // let img = await User.getInstance().getProfileImage();
    // if(img){
    //   dispatchUserImage(await User.getInstance().getProfileImage())
    // }
    // const resp = await ApiCall.getInstance().getAuthData('accountsettings/get-profile-picture', {}, false);
    // if (resp?.Status) {
    //   if (!isMatched(resp.Result[1], await User.getInstance().getProfileImage())) {
    //     dispatchUserImage(resp.Result[1]);
    //     User.getInstance().setProfileImage(resp.Result[1])
    //   }
    // }
  }
  const getProfilePicture = async () => {
    const resp = await ApiCall.getInstance().getAuthData('accountsettings/get-profile-picture', {}, false);
    if (resp?.Status) {
      dispatchUserImage(resp.Result[1]);
    }
  }
  const accountinfo = async () => {
    const response = await ApiCall.getInstance().getAuthData('accountsettings/account-info', {}, false);
    if (response?.Status) {
      if ((!response.Result.Sms && !response.Result.GAu && !response.Result.AP)) {
        setslevel('Low')
      } else if ((((response.Result.Sms || response.Result.GAu) && !response.Result.AP) ||
        (response.Result.AP && !response.Result.Sms && !response.Result.GAu))) {
        setslevel('Medium')
      } else if ((response.Result.AP && response.Result.Sms &&
        response.Result.GAu) || (response.Result.AP && (response.Result.Sms || response.Result.GAu))) {
        setslevel('High')
      } else {
        setslevel('Low')
      }
    }
  }

  const shareIt = async () => {
    navigation.toggleDrawer();

    await Share.share({
      message: AppSettings.genericEndpoint+props.currentLang+'/?ref=' + user.getUserId(),
      // url: 'https://www.meteor.io/en/?ref=' + user.getUserId()
    });
  }

  const handleLogout = async () => {

    navigation.toggleDrawer();

    // const deviceToken = await Storage.getInstance().get('deviceToken');
    const response = await apiCall.postAuth('account/logout', { logout: true }, false);
    if (response.Status) {
      // UserWallets.getInstance().resetWallets()
      await user.logout();
      await Socket.getInstance().logout()

      navigation.navigate("HomeNavigator", { screen: LOGIN })
    }
  };
  const handleterminate = () => {
    navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: 'delete_account', pageUrl: EXTERNALROUTES.SUBMITREQUEST });

  }
  const menuAuthItems = [
    {
      icon: require('../../assets/images/icons/global.png'),
      name: 'language',//props?.currentLang === 'en' ? 'ENG' : props?.currentLang?.toUpperCase(),
      onPress: () => {
        navigation.navigate(LANGUAGE_SCREEN);
      }
    },
    {
      icon: require('../../assets/images/icons/profile-2user.png'),
      name: 'invite_friends',
      onPress: shareIt
    },
    {
      icon: require('../../assets/images/icons/credit-card.png'),
      name: 's_buy_cry_cre_ca',
      onPress: () => {
        navigation.navigate(BUY_CRYPTO);
      },
    },
    {
      icon: require('../../assets/images/icons/profile-circle.png'),
      name: 'identify_ver',
      onPress: () => {
        navigation.navigate(KYC);
      },
    },

    {
      icon: require('../../assets/images/icons/money.png'),
      name: 'my_fee_rates',
      onPress: () => {
        navigation.navigate(FEE);
      },
    },
    {
      icon: require('../../assets/images/icons/setting.png'),
      name: 'settings',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      name: 'security',
      onPress: () => {
        navigation.navigate(MYACCOUNT);
      },
    },
    {
      icon: require('../../assets/images/icons/user.png'),
      name: 'aff_program',
      onPress: (name: string) => {
        if(isAffilateActivated){
          navigation.navigate(AFFILIATEOVERVIEW)
          // navigation.AFFILIATEOVERVIEW
        } else {
          navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: name, pageUrl: 'affiliate/affiliate-program' });
        }
        // navigation.navigate(isAffilateActivated ? JOIN_AFFILIATE : JOIN_AFFILIATE);

      }
    },


    // {
    //   icon: require('../../assets/images/icons/user.png'),
    //   name: 'join_program',
    //   onPress: () => {
    //     navigation.navigate(JOIN_AFFILIATE);
    //   }
    // },


    // {
    //   name: TRANSFER,
    //   onPress: () => {
    //     navigation.navigate(Transfer);
    //   },
    // },
    // {
    //   icon: require('../../assets/images/icons/notification.png'),
    //   name: 'notification_center',
    //   drawerTouchStyle: { marginVertical: HeightToDp(16) },
    //   drawerItemStyle: { paddingVertical: HeightToDp(20), marginRight: WidthToDp(80), borderTopWidth: 1, borderBottomWidth: 1, borderTopColor: theme.colors.text20, borderBottomColor: theme.colors.text20 },
    //   onPress: () => {
    //     navigation.navigate(HOME);
    //   },
    // },
    {
      name: 'user_feedback',
      onPress: (name: string) => {
        // navigation.navigate(HELP);
        navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: name, pageUrl: EXTERNALROUTES.SUBMITREQUEST });

      }
    },
    {
      icon: require('../../assets/images/icons/info-circle.png'),
      name: 'about_us',
      onPress: () => {
        navigation.navigate(ABOUT);
      }
    },
  ];

  const HelpItems = [
    {
      name: 'faqs',
      onPress: (name: string) => {
        navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: name, pageUrl: EXTERNALROUTES.HELP });
      }
    },
    {
      name: 'contact_support',
      onPress: (name: string) => {
        // navigation.navigate(HELP);
        navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: name, pageUrl: EXTERNALROUTES.SUBMITREQUEST });

      }
    },
    {
      name: 'live_chat',
      onPress: (name: string) => {
        navigation.navigate(CHAT);
      }
    }
  ];

  const AboutMeteor = [
    {
      name: 'terms_conditions',
      onPress: (name: string) => {
        navigation.navigate(TERMSCONDITION);
      }
    },
    {
      name: 'privacy_policy',
      onPress: (name: string) => {
        navigation.navigate(PRIVACYPOLICY);
      }
    }/*,
    {
      name: 'legal_regulations',
      onPress: (name: string) => {
        navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: name, pageUrl: 'conditions-of-service' });
      }
    }*/
    // {
    //   name: 'Add Wallet',
    //   onPress: (name: string) => {
    //     navigation.navigate(ADDWALLET);
    //   }
    // },

    // {
    //   name: 'Social media',
    //   onPress: (name:string) => {
    //     navigation.navigate(GENERICPAGE);
    //   }
    // },
    // {
    //   icon: require('../../assets/images/icons/user.png'),
    //   name: 'aff_program',
    //   onPress: () => {
    //     navigation.navigate(JOIN_AFFILIATE);
    //   }
    // }
  ];
  const onAccount = () => {
    navigation.navigate(MYACCOUNT);
  }

  const onClose = () => {
    setModalVisible(false)
  }
  const copyToClipboard = async (txt: any) => {
    await Clipboard.setStringAsync(txt.toString())
    if (!isCopied) {

      await setIsCopied(true)
      TNotification.show('copied_to_clipboard', NotificationType.Success)
      setTimeout(async () => {
        await setIsCopied(false)
      }, 5000)
    }
  }
  const closeDrawer = () => {
    navigation.closeDrawer()
    // navigation.toggleDrawer()
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.white} />
        <LinearGradient colors={['#ffffff', '#ffffff']}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
          style={[styles.linear]}>
          <Image source={require("../../assets/images/bg/newbg1.png")} style={styles.mainBg1} />
        </LinearGradient>
        <CustomHeader style={{ backgroundColor: 'rgba(0,0,0,0)', maxHeight: HeightToDp(30), paddingTop: HeightToDp(33), marginBottom: HeightToDp(45) }}>
          <CustomBackButton goBack={() => closeDrawer()} />
        </CustomHeader>
        <Pressable onPress={onAccount} style={[styles.userMenu]}>
          <Profile account={{ Em: email, UserId: UserId }} />
        </Pressable>

        {false && Platform.OS === 'ios' && <TouchableHighlight onPress={() => navigation.navigate(HOME)} underlayColor={theme.colors.D9D9D920}>
          <View style={styles.drawerItem}>
            <View style={styles.drawerItemIconWrap}>
              <Image style={styles.drawerItemIcon} source={require('../../assets/images/botmtabicon/homeactive.png')} />
            </View>
            <View style={styles.drawerItemContent}>
              <Text style={styles.drawerItemText}>
                {__('home')}
              </Text>
              <View style={styles.drawerItemContentRight}>
                <FontAwesome size={22} name="angle-right" color="rgba(255,255,255,0.3)" />
              </View>
            </View>
          </View>
        </TouchableHighlight>}
        <View style={{ paddingHorizontal: theme.globalvalues.screenHorizontalSpace }}>
          <View style={styles.cards}>

            {menuAuthItems.map(({ drawerTouchStyle, name, icon, drawerItemStyle, onPress }: any) => (
              <AccountTaskListitem isAccountInfo={true} key={name} name={__(name)} navigatenext={() => onPress()}></AccountTaskListitem>
            ))}
          </View>
          <View style={styles.headingCon}>
            <Text style={styles.balheading}>{__('help')}</Text>
          </View>
          <View style={styles.cards}>
            {HelpItems.map(({ drawerTouchStyle, name, icon, drawerItemStyle, onPress }: any) => (
              <AccountTaskListitem isAccountInfo={true} key={name} name={__(name)} navigatenext={() => onPress(name)}></AccountTaskListitem>
            ))}
          </View>
          <View style={styles.headingCon}>
            <Text style={styles.balheading}>{__('about_met')}</Text>
          </View>
          <View style={styles.cards}>
            {AboutMeteor.map(({ drawerTouchStyle, name, icon, drawerItemStyle, onPress }: any) => (
              <AccountTaskListitem isAccountInfo={true} key={name} name={__(name)} navigatenext={() => onPress(name)}></AccountTaskListitem>
            ))}
          </View>
          <View>
            <TouchableHighlight onPress={handleLogout} style={styles.logBtn} underlayColor={theme.colors.D9D9D920}>
              <View style={[styles.flex, styles.logoutsection]}>
                <Image style={styles.drawerItemIcon} source={require('../../assets/images/icons/logout.png')} />
                <Text style={styles.logBtnText}>
                  {__('log_out')}
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={handleterminate} style={styles.logBtn} underlayColor={theme.colors.D9D9D920}>
              <View style={[styles.flex, styles.logoutsection]}>
                <Image style={styles.drawerItemIcon} source={require('../../assets/images/icons/logout.png')} />
                <Text style={[styles.logBtnText,{color: theme.colors._danger.medium}]}>
                  {__('delete_account')}
                </Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>
        {/* <TouchableHighlight onPress={handleLogout} style={styles.logBtn} underlayColor={theme.colors.D9D9D920}>
          <Text style={styles.logBtnText}>
            {__('logout')}
          </Text>
        </TouchableHighlight> */}
      </DrawerContentScrollView>

      {/* <View style={styles.drawerVersionSection}>
        <Text style={styles.version}>Version { } {AppSettings.getAppVersion()}</Text>
      </View> */}
      {modalVisible && <LanguageModal onClose={onClose} />}
    </View>
  );
};


export default DrawerAuthMenus