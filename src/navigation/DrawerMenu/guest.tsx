import React, { useContext, useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import {
  Image,
  Text,
  View,
  TouchableHighlight,
  Platform,
  StatusBar
} from 'react-native';

import CustomButton, { ButtonVariation } from '../../components/Button';
import { HeightToDp, theme } from '../../helpers/theme';
import { ABOUT, HOME, LOGIN, REGISTER } from '../routeNames';
import styles from './styles';
import LanguageModal from '../../components/Modals/LanguageModal';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomHeader } from '../../components/Header';
import { CustomBackButton } from '../../components/BackButton';
import ListItem from '../../components/ListItem';

const DrawerGuestMenu = ({ props }: any) => {
  const navigation = props.navigation
  const [modalVisible, setModalVisible] = useState(false)
  
  const menuGuestItems = [
    {
      icon: require('../../assets/images/icons/info-circle.png'),
      name: 'about_us',
      onPress: () => {
        navigation.navigate(ABOUT);
      }
    }
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
                Home
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
                <Text style={[styles.drawerItemText]}>
                  {name}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        ))}
        <View style={{paddingHorizontal:theme.globalvalues.screenHorizontalSpace}}>
          <View style={styles.cards}>
          {menuGuestItems.map(({ drawerTouchStyle, name, icon, drawerItemStyle, onPress }: any) => (
              <ListItem isAccountInfo={true} key={name} name={__(name)} navigatenext={() => onPress()} />
          ))}
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};




export default DrawerGuestMenu