import React, { useContext, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import {
  Image,
  Alert,
  Text,
  View,
  TouchableHighlight,
  Linking,
  Platform,
  Dimensions,
  Pressable,
  StatusBar
} from 'react-native';

import CustomButton, { ButtonVariation } from '../../components/Button';
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../helpers/theme';
import { ABOUT, HOME, LOGIN, REGISTER, LANGUAGE, SETTINGS, BUY_CRYPTO, LANGUAGE_SCREEN, FEE, HELP, GENERICPAGE, TERMSCONDITION, PRIVACYPOLICY, EXTERNALROUTES, CHAT } from '../routeNames';
// import { ABOUT, HOME, LOGIN, REGISTER, LANGUAGE, SETTINGS, BUY_CRYPTO, LANGUAGE_SCREEN, JOIN_AFFILIATE } from '../routeNames';
import styles from './styles';
import { AppSettings } from '../../config/config';
import LanguageModal from '../../components/Modals/LanguageModal';
import { __ } from '../../helpers/common';
import { LanguageContext } from '../../../LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomHeader } from '../../components/Header';
import { CustomBackButton } from '../../components/BackButton';
import AccountTaskListitem from '../../screens/AccountInfo/MyAccountComponents/AccountTaskListItem';
interface IGenericPage {
  pageTitle?: string,
  pageUrl?: string,
}
const DrawerGuestMenu = ({ props }: any) => {
  const navigation = props.navigation
  const [modalVisible, setModalVisible] = useState(false)
  const {lang} = useContext(LanguageContext) 
  // const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  

  const menuGuestItems = [
    {
      icon: require('../../assets/images/icons/global.png'),
      name: 'language',//props?.currentLang === 'en' ? 'ENG' : props?.currentLang?.toUpperCase(),
      onPress: () => {
        navigation.navigate(LANGUAGE_SCREEN);
      }
    },
    // {
    //   icon: require('../../assets/images/icons/setting.png'),
    //   name: SETTINGS,
    //   onPress: () => {
    //     navigation.navigate(HOME);
    //   }
    // },
    {
      icon: require('../../assets/images/icons/credit-card.png'),
      name: 's_buy_cry_cre_ca',
      onPress: () => {
        navigation.navigate(BUY_CRYPTO);
      },
    },
    
    {
      icon: require('../../assets/images/icons/info-circle.png'),
      name: 'about_us',
      onPress: () => {
        navigation.navigate(ABOUT);
      }
    },
    // {
    //   icon: require('../../assets/images/icons/money.png'),
    //   name: 'USD',
    //   onPress: () => {
    //     navigation.navigate(HOME);
    //   }
    // },
    {
      icon: require('../../assets/images/icons/user.png'),
      name: 'fee',
      onPress: () => {
        navigation.navigate(FEE);
      }
    },
    // {
    //   icon: require('../../assets/images/icons/user.png'),
    //   name: 'aff_program',
    //   onPress: () => {
    //     navigation.navigate(JOIN_AFFILIATE);
    //   }
    // }
  ];

  const HelpItems = [
    {
      name: 'faqs',
      onPress: (name:string) => {
        // navigation.navigate(GENERICPAGE,{hideHeader:true,pageTitle:name, pageUrl:'help'});
        navigation.navigate(GENERICPAGE, {hideHeader:true, pageTitle: name, pageUrl: EXTERNALROUTES.HELP });
      }
    },
    {
      name: 'contact_support',
      onPress: (name:string) => {
        // navigation.navigate(HELP);
        navigation.navigate(GENERICPAGE, {hideHeader:true, pageTitle: name, pageUrl: EXTERNALROUTES.SUBMITREQUEST });

      }
    },
    {
      name: 'live_chat',
      onPress: (name: string) => {
        navigation.navigate(CHAT);
      }
    }
    // {
    //   icon: require('../../assets/images/icons/user.png'),
    //   name: 'aff_program',
    //   onPress: () => {
    //     navigation.navigate(JOIN_AFFILIATE);
    //   }
    // }
  ];

  const AboutMeteor = [
    {
      name: 'terms_conditions',
      onPress: (name:string) => {
        navigation.navigate(TERMSCONDITION);
      }
    },
    {
      name: 'privacy_policy',
      onPress: (name:string) => {
        navigation.navigate(PRIVACYPOLICY);
      }
    }/*,
    {
      name: 'legal_regulations',
      onPress: (name:string) => {
        navigation.navigate(GENERICPAGE,{hideHeader:true, pageTitle:name, pageUrl:'conditions-of-service'});
      }
    },*/
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

  const onClose = () => {
    setModalVisible(false)
  }
  const closeDrawer = () => {
    navigation.closeDrawer()
    // navigation.toggleDrawer()
  }
  return (
    <View style={{ flex:1}}>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.logoWrap}>
          <Pressable>
            <Image style={{ width: WidthToDp(144), height: HeightToDp(26), resizeMode: 'contain' }} source={require("../../assets/images/logo.png")} />
          </Pressable>
          <Pressable onPress={navigation.toggleDrawer}>
            <Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain' }} source={require("../../assets/images/icons/close.png")} />
          </Pressable>
        </View> */}
        <StatusBar
          animated={true}
          backgroundColor={theme.colors.white} />
        <LinearGradient colors={['#ffffff', '#ffffff']}
          start={[0.0, 0.0]}
          end={[1.0, 1.0]}
          style={[styles.linear]}>
        <Image source={require("../../assets/images/bg/newbg1.png")} style={styles.mainBg1}/>
        </LinearGradient>
        <CustomHeader style={{backgroundColor:'rgba(0,0,0,0)',maxHeight:HeightToDp(30),paddingTop:HeightToDp(33),marginBottom:HeightToDp(45)}}>
            <CustomBackButton goBack={() => closeDrawer()}/>
        </CustomHeader>
        <View style={styles.userBtns}>
          <CustomButton title="log_in" variation={ButtonVariation.light} style={[styles.userBtn, styles.userBtn1]} titleStyle={styles.userBtnText}
            onPress={() => navigation.navigate(LOGIN)} />
          <CustomButton title="sign_up" color="primary" style={styles.userBtn}
            titleStyle={styles.userBtnText} onPress={() => navigation.navigate(REGISTER)} />
        </View>
        {false && Platform.OS === 'ios' && <TouchableHighlight onPress={() => navigation.navigate(HOME)} underlayColor={theme.colors.D9D9D920}>
          <View style={styles.drawerItem}>
            <View style={styles.drawerItemIconWrap}>
              <Image style={styles.drawerItemIcon} source={require('../../assets/images/botmtabicon/homeactive.png')} />
            </View>
            <View style={styles.drawerItemContent}>
              <Text style={styles.drawerItemText}>
                {__('home') }
              </Text>
              <View style={styles.drawerItemContentRight}>
                <FontAwesome size={22} name="angle-right" color="rgba(255,255,255,0.3)" />
              </View>
            </View>
          </View>
        </TouchableHighlight>}
        {false && menuGuestItems.map(({ name, icon, onPress  }:any) => (
          <TouchableHighlight onPress={onPress} key={name} underlayColor={theme.colors.D9D9D920}>
            <View style={styles.drawerItem}>
              <View style={styles.drawerItemIconWrap}>
                {icon && <Image style={styles.drawerItemIcon} source={icon} />}
              </View>
              <View style={styles.drawerItemContent}>
                <Text style={[styles.drawerItemText, styles[`${lang}DrawerItemText`]]}>
                  {__(name)}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
        <View style={{paddingHorizontal:theme.globalvalues.screenHorizontalSpace}}>
          <View style={styles.cards}>
          {menuGuestItems.map(({ drawerTouchStyle, name, icon, drawerItemStyle, onPress }: any) => (
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
        </View>
      </DrawerContentScrollView>

      {/* <View style={styles.drawerVersionSection}>
        <Text style={styles.version}>Version {AppSettings.getAppVersion()}</Text>
      </View> */}
      {modalVisible && <LanguageModal onClose={onClose} />}
    </View>
  );
};




export default DrawerGuestMenu