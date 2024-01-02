import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import GlobalProvider from './src/redux/Provider';
import Navigation from './src/navigation';
import { startUp } from './src/startup';
import { theme, StyleSheetManager } from './src/helpers/theme';
import * as SplashScreen from 'expo-splash-screen';
import { CustomActivityIndicator } from './src/components/CustomActivityIndicator';
import { Storage } from './src/helpers/storage';
import NetInfo from '@react-native-community/netinfo';
import {TNotification, NotificationType } from './src/helpers/notification';
import ToastNotification from './src/components/Notification';
import { User } from './src/models/user';
import { dispatchLoginState } from './src/redux/dispatch';
import { AppSettings } from './src/config/config';


export default function App() {
  SplashScreen.hideAsync();
  const [ConnectionStatus, setConnectionStatus] = React.useState(true)
  const isStartupComplete = startUp();
  const storage = Storage.getInstance()
  NetInfo.addEventListener(state => {
    if (ConnectionStatus !== state.isConnected) {
      setConnectionStatus(state.isConnected ? state.isConnected : false);
      state.isConnected ? TNotification.show('asd', NotificationType.InternetFound):  TNotification.show('asdasd', NotificationType.Notfound)
    }
  });

  if (!isStartupComplete) {
    return <View style={{ flex: 1, backgroundColor: '#0b0c19' }}><CustomActivityIndicator style={{ backgroundColor: theme.colors.white }} /></View>;
  } else {
    const touchAuth = async () => {
      const user = User.getInstance();
      
      if(user.authVerifyState === 1)
      return;

      const sessionLastUpdated = Number(await storage.getStore(user._sessionLastUpdatedKey));
      if (user.localAuth.isActive() && !((sessionLastUpdated + user.sessionExpirationTime) <  Date.now())) {
        if (await user.localAuth.authenticate()) {
            await user.updateAuthVerify(1)
            await user.init();
            if (user.isLoggedIn())
                dispatchLoginState(true);
            else
                TNotification.show("s_session_expired", NotificationType.Danger)
        }
      }
    };
    setTimeout(() => {
      touchAuth()
    }, 1000)
    
    StyleSheetManager.rebuild();

    
    return (
      <GlobalProvider>
        <StatusBar style="dark" />
        <Navigation colorScheme={'dark'} />
        {AppSettings.isStagingEnv && <Text style={{fontSize: 12, textAlign: 'center'}}>Staging App</Text>}
        <ToastNotification />
      </GlobalProvider>
    );
  }
}
