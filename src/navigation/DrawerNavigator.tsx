import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {HOME} from './routeNames';
import DrawerMenu from './DrawerMenu';
import { StatusBarPadTop, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';

const getDrawerContent = (navigation: any) => {
  return <DrawerMenu navigation={navigation} />;
};


const screenOptions = {
  headerShown: false, 
  overlayColor: 'rgba(110,100,135,0.90)',//'rgba(0,0,0,0.5)',
  drawerStyle: {
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 30,
    // width: WidthToDp(321)
    width: WidthToDp(100,true)
  }
}
  

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={screenOptions}
    
      drawerContent={({navigation}) =>
        getDrawerContent(navigation)
      }>
      <Drawer.Screen name='HomeNavigator' component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;