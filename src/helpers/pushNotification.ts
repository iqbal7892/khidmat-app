import * as Notifications from 'expo-notifications';
import { HOME } from '../navigation/routeNames';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Storage } from './storage';
import { ApiCall } from './apicall';
import { sleep } from './common';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

interface PushNotif {
    Title: string,
    Message: string,
    RefUrl: string
}

export class PushNotification {
 
    private static instance: PushNotification;
    public storage = Storage.getInstance();
    public apiCall = ApiCall.getInstance();

    constructor() {
        if(PushNotification.instance)
        {
            throw new Error("Error: Instantiation failed: Use PushNotification.getInstance() instead of new.");
        }
    }
    public static getInstance()
    {
        if (PushNotification.instance == null)
        {
            PushNotification.instance = new PushNotification();
        }
        return this.instance;
    }

    public async schedulePushNotification(notif: PushNotif) {
        await Notifications.scheduleNotificationAsync({
            content: {
            title: notif.Title,
            body: notif.Message,
            data: { data: notif.Message, url: notif.RefUrl == '' ? HOME : notif.RefUrl},
            },
            trigger: { seconds: 2 },
        });
    }

    public async registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          
          // token = (await Notifications.getExpoPushTokenAsync()).data;
          token = (await Notifications.getDevicePushTokenAsync()).data;

        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
    }

    

    public async setDeviceToken(token:string, userId: number) {

      

        const dtoken = await this.storage.tryGet('deviceToken');
        
        if(!dtoken.hasValue){
            this.sendRequest(token, userId);
            this.storage.set('deviceToken', token);
        } else {
            if(token !== dtoken.value){
                this.sendRequest(token, userId)
                this.storage.set('deviceToken', token);
            }
        }
    }


    public async sendRequest(token: string, userId:number) {
      const deviceType = Platform.OS === 'android' ? 0 : 1;
      try{
        if(userId === 0){
          this.apiCall.post('add-device-token', {DeviceToken: token, DeviceType: deviceType})
        } else {
          this.apiCall.post('add-device-token-user', {DeviceToken: token, DeviceType: deviceType})
        }
      } catch(err){
        await sleep(2000);
        this.sendRequest(token, userId)
      }
      
    }

}