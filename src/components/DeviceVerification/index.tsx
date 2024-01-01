import {  AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View, Pressable, Image, StatusBar, Linking } from "react-native";
import { ApiCall } from "../../helpers/apicall";
import { TNotification, NotificationType } from "../../helpers/notification";
import { fontsSize, theme, StyleSheetManager } from "../../helpers/theme";
import { CustomBackButton } from "../BackButton";
import { CustomActivityIndicator } from "../CustomActivityIndicator";
import styles from "./styles";
import ToastNotification from "../Notification";


const DeviceVerification = (props: any) => {
    const [loader, setLoader] = useState(false)
    
    const resendEmail = async () => {
        setLoader(true)
        
        const resp = await ApiCall.getInstance().post('account/resend-email-login', props.user, false);
        setLoader(false)
        if (resp.Status) {
            TNotification.show(resp.Message, NotificationType.Success)
        } else {
            TNotification.show(resp.Message, NotificationType.Danger)
        }

    }
    const onClose = () => {
        props.onClose()
    }

    return (
        <React.Fragment>
            {loader && <CustomActivityIndicator />}
            <View style={styles.container}>
                <ToastNotification /> 
                <StatusBar
                    animated={true}
                    backgroundColor={theme.colors.backgroundColor} />
                <CustomBackButton iconColor={theme.colors.primary} goBack={onClose} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../assets/images/icons/emailsent.png')}></Image>
                    <Text style={styles.closebtn}>device_ver</Text>
                    <Text style={styles.checkemailnote}>p_device_ver_email</Text>

                    <Pressable style={styles.resendbtnstyle} onPress={onClose}>
                        <Text style={styles.btntext}>log_in</Text>
                    </Pressable>

                    <Pressable onPress={resendEmail}>
                        <Text style={styles.btntext1}>resend_email</Text>
                    </Pressable>
                </View>
                <Text style={styles.warningheading}>
                s_havent_recive_email
                </Text>
                <View style={styles.mainContainer}>
                    <AntDesign name="minus" size={fontsSize.f18} color={theme.colors.text} />
                    <Text style={styles.mainParagraph}>
                    s_correct_email
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <AntDesign name="minus" size={fontsSize.f18} color={theme.colors.text} />
                    <Text style={styles.mainParagraph}>
                    s_spam_or_trash
                </Text>
                </View>
                <View style={styles.mainContainer}>
                    <AntDesign name="minus" size={fontsSize.f18} color={theme.colors.text} />
                    <Text style={styles.mainParagraph}>
                    resend_email
                </Text>
                </View>
            </View>
        </React.Fragment>
    )
}

export default DeviceVerification
