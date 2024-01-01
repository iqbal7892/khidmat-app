import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName, Linking } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import { useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Analytics from 'expo-firebase-analytics';
import { Storage } from '../helpers/storage';
import { disptachChangePair } from '../redux/dispatch';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef:any = useNavigationContainerRef();
  const routeNameRef:any = useRef();
  const storage = Storage.getInstance();
  

  const navigationStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      // await Analytics.logEvent('screen_view', { currentRouteName });
    }

    routeNameRef.current = currentRouteName;
  }

  // const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // React.useEffect(() => {
  //   if (
  //     lastNotificationResponse &&
  //     lastNotificationResponse.notification.request.content.data &&
  //     lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
  //   ) {
  //     let url:any = lastNotificationResponse.notification.request.content.data.url;
  //     url = url.split('?');

  //     const routingData = url.length > 1 ? JSON.parse(url[1]) :  null;

  //     const refUrl = url[0].split("#");
  //     if(refUrl.length > 1) {
  //       const data = refUrl[1].split('=');
  //       switch(data[0]) {
  //         case "ChangePair":
  //           disptachChangePair(data[1]);
  //           break;
  //       }
  //     }

  //     if(routingData == null)
  //     {
  //       setTimeout(() => {
  //         navigationRef.navigate(refUrl[0]);
  //       }, 600);
  //     }
  //     else
  //     {
  //       setTimeout(() => {
  //         navigationRef.navigate(refUrl[0], routingData);
  //       }, 600);
  //     }
  //   }
  // }, [lastNotificationResponse]);

  const onReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute().name;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={navigationStateChange}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PortalProvider>
            <DrawerNavigator />
          </PortalProvider>
        </GestureHandlerRootView>
    </NavigationContainer>
    
  );
}





