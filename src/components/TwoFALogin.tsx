import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, View, Text, Pressable, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
// import { QuizInput } from 'react-native-quiz-input';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ApiCall } from '../helpers/apicall';
import { theme, fontsSize, fontSizes, HeightToDp, WidthToDp, StyleSheetManager } from '../helpers/theme';
import { User } from '../models/user';
import { EXTERNALROUTES, GENERICPAGE, HOME, MARKET, SUPPORT } from '../navigation/routeNames';
import CustomButton from './Button';
// import { OtpInputs } from './OtpInputs';
import CustomTabView from './TabView';
import { TNotification, NotificationPosition, NotificationType } from '../helpers/notification';
import { useNavigation } from '@react-navigation/native';
import { CustomActivityIndicator } from './CustomActivityIndicator';
import ToastNotification from './Notification';
import { __ } from '../helpers/common';
import OtpInputs from './OtpInputs';
import GradientText from './LinerGradient';


const TwoFALogin = (props: any) => {
    const navigation: any = useNavigation();
    const [tabType, setTabType] = useState(0);
    const [loader, setLoader] = useState(false);
    const [code, setCode] = useState('');
    const [isCodeSent, setISCodeSent] = useState(false);
    const [counter, setCounter] = useState(60);
    const [isMobileTab, setIsMobileTab] = useState(false);
    let timeInterval = useRef<any>();


    const onSubmit = async () => {


        if (code.length < 6) {
            return;
        }
        if (!props.isWithdraw) {
            setLoader(true)
            const phoneVerif = props.type === 'both' ? (tabType === 1 ? true : false) : (props.type === 'google' ? false : true);
            const body = { PhoneVerif: phoneVerif, Code: code };
            const endPoint = 'account/authenticate-2fa';
            const resp: any = '';
            let json = await apiCaller.halfAuth(endPoint, body, false);
            setLoader(false)
            if (json['Status']) {
                TNotification.show('login_sucessfull', NotificationType.SuccessModal)
                const user = User.getInstance();
                await user.updateAuthVerify(1);
                await user.save(User.getInstance().getInfo());
                onClose();
                navigation.navigate(HOME);
            } else {
                TNotification.show(json.Message, NotificationType.DangerModal);
            }
            // });
        } else {
            onClose(code);
        }

    }
    const onClose = (code?: any) => {
        props.onClose(code)
    }
    const sendSms = () => {
        props.sendSms();
    }
    const startTimer = () => {
        let count = counter;
        timeInterval.current = setInterval(() => {
            if (count > 0) {
                count--;
                setCounter(count);
                if (count === 0) {
                    setISCodeSent(false);
                }
            } else {
                clearInterval(timeInterval.current);
                setCounter(60)
            }
        }, 1000);
    }
    const apiCaller = ApiCall.getInstance();
    const googleAuth = (item: any) => {
        setCode(item);

        if (item.length === 6) {
            onSubmit()
        }
    }
    useEffect(() => {
        if (code.length === 6) {
            onSubmit()
        }
        if ((props.type === 'sms') && !isCodeSent) {
            sendSms()
            startTimer()
            setISCodeSent(true);
        }
    }, [code]);

    // useEffect(() => {
    //     if (props.type == 'sms') {
    //         sendSms();
    //     }
    // }, []);

    const onSupport = () => {
        onClose();

        if(props?.onNavigate)
        props?.onNavigate()
    
        // navigation.navigate(SUPPORT)
        navigation.navigate(GENERICPAGE, { hideHeader: true, pageTitle: 'contact_support', pageUrl: EXTERNALROUTES.SUBMITREQUEST });
    }
    const resend = () => {
        sendSms()
        startTimer()
        setISCodeSent(true);
    }
    const Layout = (isSms=false) => {
        return (
            <View>
                <Text style={styles.defaultlabel}>{__('enter_code')}</Text>
                <OtpInputs newstyle={true} onCodeFilled={googleAuth} />
                <Text style={styles.lostlabel}>{__('lost_your')} <Text onPress={onSupport} style={{ color: theme.colors._primary.darkest, fontFamily: theme.fonts.sfProTextMedium }}>
                    {(props.type == 'sms') ? __('mobile_phone') : ((props.type == 'google') ? __('google_authentication') : '')}

                    {props.type == 'both' ? __('mobile_phone') : ''}
                </Text></Text>
                {(props.type == 'sms' || isSms) && <>
                {isCodeSent &&<Text style={{textAlign:'center'}}>{__('p_retry_after', {counter: counter})}</Text>}
                {!isCodeSent &&<CustomButton titleStyle={{fontFamily:theme.fonts.geomanistRegular,lineHeight:HeightToDp(17)}} onPress={resend} title={__('resend')} color="success" style={{height:HeightToDp(30),paddingHorizontal:WidthToDp(25),marginTop: HeightToDp(7),alignSelf:'center',display:'flex'}}/>}
                
                </>}
                <CustomButton onPress={onSubmit} style={{ height: HeightToDp(48), marginTop: HeightToDp((props.type == 'sms'|| isSms) && !isCodeSent?23:40) }} 
                title="Submit" color="success"></CustomButton>
                <Pressable onPress={props.onCloseRequest ?? onClose} >
                    <Text style={styles.closebtn}>
                        {__('close')}
                    </Text>
                </Pressable>
            </View>
        )
    }
    const showtab = () => {
        const a = () => (
            <View>
                {Layout()}
            </View>
        );
        const b = () => (
            <View>
                {Layout()}
            </View>

        );
        const tabRoutes = [
            { key: 'google', title: 'Google' },
            { key: 'sms', title: 'SMS' },
        ]
        // const tabRenderScene = {
        //     'google': a,
        //     'sms': b,
        // }

        const tabRenderScene = ({ route }) => {
            switch (route.key) {
                case 'google':
                    return Layout()
                default:
                    return Layout(true)
            }
        }
        const tabIndex = async (item: any) => {
            if (item == 1) {
                if(!isCodeSent){
                    startTimer()
                    sendSms();
                    setISCodeSent(true);
                }
            }

            setTabType(item);
        }
        if (props.type === 'google') {
            return (
                <View>

                    <View style={styles.mainheaderContainer}>
                        <Text style={styles.txthead}>{__('google')} </Text>
                        <GradientText style={styles.txthead}>{__('auth')} </GradientText>
                    </View>
                    {Layout()}
                </View>)


        }
        else if (props.type === 'sms') {
            return (
                <View>

                    <View style={styles.mainheaderContainer}>
                        {/* <Text style={styles.headerLabel}>{__('sms_auth')}</Text> */}
                        <Text style={styles.txthead}>{__('sms')} </Text>
                        <GradientText style={styles.txthead}>{__('auth')} </GradientText>
                    </View>
                    {Layout()}
                </View>)
        }
        else if (props.type === 'both') {
            return (
                <View style={{ flex: 1 }}>

                    <View style={styles.mainheaderContainer}>
                        <Text style={styles.txthead}>{__('two_fa')} </Text>
                        <GradientText style={styles.txthead}>{__('auth')} </GradientText>
                    </View>
                    <CustomTabView tabSimple={true} getTabIndex={tabIndex.bind(this)} tabRoutes={tabRoutes} tabRenderScene={tabRenderScene} />
                </View>
            )
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.maincontainer}>
                {loader && <CustomActivityIndicator />}
                <View style={styles.modalContainer}>
                    <StatusBar
                        animated={true}
                        backgroundColor={'#00000080'} />
                    <Pressable style={styles.closeIcon} onPress={onClose} >
                        <Ionicons name="close-sharp" size={fontsSize.f30} color={theme.colors.textmutedDark} />
                    </Pressable>
                    <ToastNotification />

                    {showtab()}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default TwoFALogin


const styles = StyleSheetManager.Create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#00000080',
    },
    modalContainer: {
        borderTopRightRadius: WidthToDp(20),
        borderTopLeftRadius: WidthToDp(20),
        flex: 1,
        marginTop: theme.globalvalues.screenVerticalSpace,
        backgroundColor: theme.colors._bg.darkest,
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    },
    lostlabel: {
        paddingTop: HeightToDp(10),
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest,
        textAlign: 'center'
    },
    flexSpaceBetween: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mainheaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        paddingTop: HeightToDp(18),
        paddingBottom: HeightToDp(7),
        marginBottom: HeightToDp(9),
    },
    txthead: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(32),
        lineHeight: 44,
        fontFamily: theme.fonts.geomanistMedium,
        // paddingTop: 25,
        // paddingBottom: HeightToDp(24)
    },
    closebtn: {
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest,
        textAlign: 'center',
        marginTop: HeightToDp(17),
        paddingBottom: HeightToDp(9),
    },
    headerLabel: {
        fontSize: fontsSize.f28,
        fontFamily: theme.fonts.sfProTextSemibold,
        color: theme.colors._text.dark,
    },
    btnstyle: {
        backgroundColor: theme.colors.backgroundColorMuted,
        height: HeightToDp(50),
        width: widthPercentageToDP('35%'),
        marginVertical: HeightToDp(24),
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabstyle: {
        height: HeightToDp(28)
    },
    closeIcon: {
        alignItems: 'flex-end',
        paddingVertical: theme.globalvalues.headingverticalSpace,
    },

    headingContainer: {
        borderBottomWidth: .4,
        borderBottomColor: theme.colors.borderColor,
        paddingBottom: HeightToDp(7),
        marginBottom: HeightToDp(9),
    },

    defaultlabel: {
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.lightest,
        fontSize: fontSizes(16),
        paddingTop: HeightToDp(20),
        paddingBottom: HeightToDp(8),
    },

    displayflex: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputbox: {

    },
})

