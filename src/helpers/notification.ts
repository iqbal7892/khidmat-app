import Toast from 'react-native-toast-message';

export class TNotification {
    private static lastToast: any = undefined;
    public static show(message: string, type = NotificationType.Success, positions = NotificationPosition.Center, args: any = null) {
       
        if (TNotification.lastToast) {
            Toast.hide(TNotification.lastToast);
        }

        this.lastToast = Toast.show({
            text1: message,
            type: type,
            visibilityTime:type ==='Notfound'? 9000:3000
        })
    }
}
export class Notification extends TNotification {}

export const NotificationType = {
    Success: 'Success',
    Warning: 'Warning',
    Danger: 'Danger',
    Info: 'Info',
    SuccessModal: 'SuccessModal',
    WarningModal: 'WarningModal',
    DangerModal: 'DangerModal',
    InfoModal: 'InfoModal',
    InternetFound: 'InternetFound',
    Notfound: 'Notfound',
}

export const NotificationPosition = {
    Top: 'top',
    Center: 'bottom',
    Bottom: 'bottom'
}


