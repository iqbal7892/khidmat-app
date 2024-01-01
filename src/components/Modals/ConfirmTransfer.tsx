import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Modal, Text, View, StyleSheet, TouchableWithoutFeedback, Image, ScrollView, Dimensions, StatusBar } from "react-native";
import { HeightToDp, WidthToDp, fontSizes, theme, StyleSheetManager, fontsSize } from '../../helpers/theme';
import { __ } from '../../helpers/common';
import CustomButton from '../Button';
import navigation from '../../navigation';
import { TRANSFERSUCCESS } from '../../navigation/routeNames';
import { useNavigation } from '@react-navigation/native';
import { NotificationPosition, NotificationType, TNotification } from '../../helpers/notification';
import { User } from '../../models/user';
import { ApiCall } from '../../helpers/apicall';
import { UserWallets } from '../../services/userwallets';
import TwoFALogin from '../TwoFALogin';
import ToastNotification from '../Notification';
import { MotiView } from 'moti';


type Props = {
    modalVisible: boolean;
    closeModal: any
    onRequestClose: () => void;
    onRequestCloseModal?: () => void;
    // children: ReactNode;
    navigation: any;
    title?: string,
    address?: string,
    amount?: string
    chain?: any
    currency?: any
    memo?: any
}

// const data = [
//     {
//         title: 'Sending',
//         amount: '83.41',
//         symbol: 'USDT',
//     },
//     {
//         title: 'From',
//         wallet: 'USDT Wallet',
//     },
//     {
//         title: 'to',
//         adress: '0x09239309ijid982393i92i3EREFja91032'
//     },
//     {
//         title: 'Network Type',
//         type: 'ERC20'
//     },
//     {
//         title: 'fee',
//         amount: 
//     }

// ]

const ConfirmTransfer = ({ modalVisible, onRequestClose, onRequestCloseModal, title, address, amount, chain, currency,memo }: Props) => {
    const modalRef = useRef(null);
    const navigation: any = useNavigation();
    const [Loader, setLoader] = useState(false);
    const [inProcess, setInProcess] = useState(false);
    const [smsLoader, setSmsLoader] = useState(false);
    const [twoFaCode, settwoFaCode] = useState(0);
    const [twoFaModal, settwoFaModal] = useState(false);
    const [requestLimit, setRequestLimit] = useState(false);
    const apiCall = ApiCall.getInstance();

    const handleOutsideClick = (event: any) => {
        if (modalRef.current && event.target === modalRef.current) {
            onRequestClose();
        }
    };
    const handleButtonClick = () => {

        const twoFa = User.getInstance().getInfo()['TwoFactor'];
        if (twoFa !== 1 && twoFa !== 2 && twoFa !== 3) {
            // onRequestClose();
            // navigation.navigate(TRANSFERSUCCESS);
            withdrawNow()
        } else {
            onRequestCloseModal();
            settwoFaModal(true);
        }

    };
    const withdrawNow = async (code: number=0) => {
    // TNotification.show('s_insufficient_bal_to_withdraw', NotificationType.Danger, NotificationPosition.Center)
    //   return 
    // console.log('call withdrawa =====================');

        if (!chain?.canWithdraw) {
            TNotification.show('s_withdraw_is_disabled', NotificationType.DangerModal, NotificationPosition.Center)
            return;
        }
        if (Number(amount) > currency?.available!) {
            TNotification.show('s_insufficient_bal_to_withdraw', NotificationType.DangerModal, NotificationPosition.Center)
            return;
        }
        if (!(address)) {
            TNotification.show(__('s_enter_the_adr'), NotificationType.DangerModal, NotificationPosition.Center)
            return;
        }

        if (Number(amount) < chain.minWithdraw) {
            TNotification.show('min_withdraw_of', NotificationType.DangerModal,
                NotificationPosition.Center,
                { amount: chain.minWithdraw, symbol: currency?.currency.symbol })
            return;
        }
        if(inProcess)
        return;
        await setInProcess(true)

        setLoader(true);

        let body: any = {
            Address: address,
            Amount: Number(amount),
            CurrencyId: currency?.currency?.id,
            Label: '0000',
            Memo: memo?.memoShow ?
                (memo?.Memo === null ? '' : memo?.Memo) : '',
            // Memo: '',
            ChainId: chain?.chainId,
            ReqType: 'mobile',
        };
        // return;
        const twoFa = User.getInstance().getInfo()['TwoFactor'];
        // return;
        // console.log('two fa now', twoFa, code, Number(twoFaCode),twoFaCode)
        // const twoFa = User.getInstance().getInfo()['TwoFactor'];
        if (twoFa !== 1 && twoFa !== 2 && twoFa !== 3) {
            body['AuthType'] = 4;
            body['Code'] = 0;
        } else {
            body['AuthType'] = twoFa;
            body['Code'] = Number(code);

        }
        // console.log('withdraw body',User.getInstance().getInfo(), twoFa,body,twoFa)
        // console.log(body);
        // return
        let json = await apiCall.postAuth('wallet/request-withdraw', body, true);
        // console.log('json response', json);
        setLoader(false);
        if (json['Status']) {
            settwoFaModal(false);
            UserWallets.getInstance().requestRefresh(0);

            TNotification.show(json.Message, NotificationType.SuccessModal, NotificationPosition.Center);
            navigation.navigate(TRANSFERSUCCESS, { amt: amount, symbol: currency.currency.symbol });
        } else {
            TNotification.show(json.Message, NotificationType.DangerModal, NotificationPosition.Center)
        }
        setTimeout(() => {
            setInProcess(false)
        },2000)
    }
    const modalUI = () => {
        const type = ['google', 'sms', 'both'];
        const userIns = User.getInstance().getInfo()['TwoFactor'];
        const twofaType = Number(userIns) - 1;
        return (
            <TwoFALogin sendSms={sendSms} isWithdraw={true}
                onClose={(code: any) => getCode(code)} onCloseRequest={onCloseRequest} type={type[twofaType]}></TwoFALogin>
        )
    }
    useEffect(() => {
        if (requestLimit) {
          const timer = setTimeout(() => {
            setRequestLimit(false); // Unblock the API request after 60 seconds
          }, 80000); // 80 seconds in milliseconds
    
          // Clear the timer if the component unmounts or the effect is re-run
          return () => {
            clearTimeout(timer);
          };
        }
      }, [requestLimit]);
      
    const sendSms = () => {
        if(requestLimit)
        return 

        setRequestLimit(true)
        
        TNotification.show('sending_sms', NotificationType.Success, NotificationPosition.Top)
        // this.setState({ loader: true });
        const apiCaller = ApiCall.getInstance();
        const body = { 'Submit': '1' };
        const endPoint = 'wallet/get-withdraw-verification-sms';
        apiCaller.postAuth(endPoint, body, true).then((json) => {
            // this.setState({ loader: false });
            if (json !== undefined && json['Status']) {
                TNotification.show(json.Message, NotificationType.SuccessModal)
            } else {
                TNotification.show(json.Message, NotificationType.DangerModal)

            }
        }).catch(error => console.error('error on sms verification', error));
    }
    const getCode = async (code: any) => {

        if (isNaN(Number(code))) {
            TNotification.show('enter_the_code', NotificationType.SuccessModal);
            settwoFaModal(false);
        } else {
            // console.log('this is two fa code', code);
            await settwoFaCode(code);
            setTimeout(() => {
                withdrawNow(code);
            }, 500);
            //settwoFaModal(false);
            // this.setState({ twoFaCode: code }, () => {
            // this.withdrawNow()
        };
    }
    const onCloseRequest = async () => {
            settwoFaModal(false);
            onRequestCloseModal();
    }
    const amountFormat = (val:any) => {
        const t = val?.split('.');
        var amt = {
            amount: '0',
            precision:'.00'
        }
        if(t && t.length>0){
            amt.amount = t[0]
            amt.precision = '.'+(t[1]??'00')
        }
        return amt
    }
    return (
        <React.Fragment>
            <Modal
                animationType="slide"
                transparent={true}
                visible={twoFaModal}
                onRequestClose={onCloseRequest}
                >
                <View style={{ flex: 1 }}>
                    {modalUI()}
                </View>
            </Modal>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={onRequestCloseModal}
            >
                {/* <TouchableWithoutFeedback onPress={handleOutsideClick}> */}
                <MotiView
                    from={{ translateY: 0, opacity: 0.5 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ type: 'timing', duration: 400}}
                    style={{ flex: 1 }}>
                    <View ref={modalRef} style={styles.centeredView}>
                        <ToastNotification />
                        <MotiView
                            from={{ translateY: 1000, opacity: 0.5 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            transition={{ type: 'timing', duration: 500}}>
                            <View style={styles.modalView}>
                                <View style={styles.posAbsoulte}>
                                    <Image style={styles.imgstyle} source={require('../../assets/images/icons/confirmTrans.png')} />
                                </View>
                                {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                                    <View style={styles.modalContent}>
                                        <Text style={styles.txthead}>
                                            {__('confirm_trans')}
                                        </Text>
                                        <View style={styles.dflex2}>
                                            {/* <Text style={styles.txt1}>$</Text> */}
                                            <Text style={styles.txt1}>{amountFormat(amount)?.amount}</Text>
                                            <Text style={styles.txt2}>{amountFormat(amount)?.precision}</Text>
                                        </View>
                                        <View style={styles.dflex3}>
                                            <Image style={styles.imgsett} source={require('../../assets/images/icons/info-circle-2.png')} />
                                            <Text numberOfLines={3} style={styles.txt3}>
                                                {__('p_compatible_with_network',{cNetwork: chain?.chainName})}
                                                {/* asihd;aihsd;iahsdiahs aosdh asodha;sodhas;iohdas asohdaoshdaosihd;asiohdas;id a s hdaosdhasoihdoaishdas aosidhasihda;siohdas;iohd asdha;osihd;asiohd;asiohd;asoidh apisdhashid;aoishd;aoshid;asiohd ;ihas;odhi */}
                                            </Text>
                                        </View>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <View style={styles.pt34}>
                                                <View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('sending')}</Text>
                                                    <Text style={styles.txt4}>{(Number(amount) - chain?.withdrawFee).toFixed(currency?.currency?.precision)} <Text>{currency?.currency?.symbol?.toUpperCase()}</Text></Text>
                                                </View>
                                                <View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('from')}</Text>
                                                    <Text style={styles.txt4}>{currency?.currency?.symbol?.toUpperCase()} <Text>{__('wallet')}</Text></Text>
                                                </View>
                                                <View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('to-c')}</Text>
                                                    <Text style={[styles.txt4, { width: WidthToDp(229), textAlign: 'right' }]}>{address}</Text>
                                                </View>

                                                {memo && memo?.memoShow &&<View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('memo')}</Text>
                                                    <Text style={[styles.txt4, { width: WidthToDp(229), textAlign: 'right' }]}>{memo?.Memo}</Text>
                                                </View>}
                                                
                                                <View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('network_type')}</Text>
                                                    <Text style={styles.txt4}>{chain?.chainName}</Text>
                                                </View>
                                                <View style={styles.borderb}>
                                                    <Text style={styles.txt4}>{__('fee')}</Text>
                                                    <Text style={styles.txt4}>{chain?.withdrawFee} <Text>{currency?.currency?.symbol?.toUpperCase()}</Text></Text>
                                                </View>
                                                <View style={[styles.borderb0]}>
                                                    <Text style={styles.txt4}>{__('total')}</Text>
                                                    <Text style={styles.txt5}>{Number(amount)} <Text>{currency?.currency?.symbol?.toUpperCase()}</Text></Text>
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={styles.dflex1}>
                                        <CustomButton onPress={onRequestCloseModal} style={{
                                            flex: 1, marginRight: WidthToDp(24),
                                            borderRadius: 4, backgroundColor: 'white', borderWidth: 1.5,
                                            borderColor: theme.colors._primary.darkest
                                        }}
                                            title="cancel" color="bglight" titleStyle={{ color: theme.colors._primary.darkest }}></CustomButton>
                                        <CustomButton onPress={handleButtonClick}
                                            style={{ flex: 1, borderRadius: 4 }}
                                            title="confirm" color="bglight"></CustomButton>
                                    </View>
                                {/* </ScrollView> */}
                            </View>
                        </MotiView>
                    </View>
                </MotiView>
                {/* </TouchableWithoutFeedback> */}
            </Modal>
        </React.Fragment>
    )
}


export default ConfirmTransfer
const styles = StyleSheetManager.Create({
    dflex2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: HeightToDp(12),
        alignItems: 'baseline'
    },
    txt1: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistMedium,
        fontSize: fontSizes(44),
    },
    txt2: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistMedium,
        fontSize: fontSizes(24),
    },
    dflex3: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors._bg.color3,
        paddingHorizontal: 12,
        height: 52,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors._border.warning,
        marginTop: 18
    },
    txt3: {
        color: theme.colors._warning.medium,
        marginLeft: 10,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6
    },
    borderb: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: theme.colors._border.lightest
    },
    txt4: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        lineHeight: 22.4,
        alignItems: "flex-start"
    },
    txt5: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistMedium,
        fontSize: fontSizes(16),
        lineHeight: 22.4
    },
    pt34: {
        paddingTop: 10,
        paddingBottom:10
    },
    imgsett: {
        width: 20,
        height: 20
    },
    txthead: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 22.4,
        textAlign: 'center',
        paddingTop: 12
    },
    borderb0: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    posAbsoulte: {
        position: 'absolute',
        top: -40,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    imgstyle: {
        width: 80,
        height: 80
    },
    dflex1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10, // temporarily
        paddingBottom: 44
    },
    centeredView: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        // backgroundColor: 'teal',
        flex: 1,
    },
    modalView: {
        backgroundColor: '#fff',
        borderTopLeftRadius: WidthToDp(24),
        borderTopRightRadius: WidthToDp(24),
        paddingTop: HeightToDp(36),
        height: HeightToDp(690),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace
    },
    modalContent: {
        flex: 1
    },
})