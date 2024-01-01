import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, Pressable, StatusBar, Image } from "react-native";
import { ApiCall } from "../../helpers/apicall";
import { TNotification, NotificationType } from "../../helpers/notification";
import { HeightToDp, theme, StyleSheetManager } from "../../helpers/theme";
import { HOME } from "../../navigation/routeNames";
import { CustomBackButton } from "../BackButton";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import ToastNotification from "../Notification";
import styles from "./styles";
import { __ } from "../../helpers/common";


const EmailVerification = (props: any) => {
    const [loader, setLoader] = useState(false)
    const navigation:any = useNavigation()

    const resendEmail = async () => {
        setLoader(true)
        const resp = await ApiCall.getInstance().post('account/resend-email', props.user, true);
        setLoader(false)
        if(resp.Status){
            TNotification.show(resp.Message, NotificationType.SuccessModal)
        } else {
            TNotification.show(resp.Message, NotificationType.DangerModal)
        }
    }

    const goToHome = () => {
        props.onClose()
        navigation.navigate(HOME)
    }

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor={theme.colors.backgroundColor} />
            <CustomBackButton iconColor={theme.colors.primary} goBack={props.onClose}></CustomBackButton>
            {loader && <CustomActivityIndicator />}
            <View style={styles.innerContainer}>
                <ToastNotification />
                <Image source={require('../../assets/images/icons/emailsent.png')}></Image>
                <Text style={styles.closebtn}>{__('check_email')}</Text>
                <Text style={styles.checkemailnote}>{__('p_confirmation_email')}</Text>
                <Text style={styles.checkemailnote}>{props.user.Email}</Text>
                <Pressable style={styles.resendbtnstyle} onPress={goToHome}>
                    <Text style={styles.btntext}>{__('return_to_home')}</Text>
                </Pressable>
                {/* <Pressable style={styles.resendbtnstyle} onPress={resendEmail}>
                    <Text style={styles.btntext}>Resend Email</Text>
                </Pressable> */}
                {/* <Pressable style={{ paddingVertical: HeightToDp(8) }} onPress={props.onSupport} >
                    <Text style={styles.btntext1}>Support</Text>
                </Pressable> */}
            </View>
        </View>
    )
}

export default EmailVerification
