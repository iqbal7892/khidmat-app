import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions, Pressable, Modal, ScrollView } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes } from '../../../helpers/theme';
import CustomButton, { ButtonVariation } from '../../Button';
import { IExchangeWalletType, transferWallet } from '../../../helpers/interfaces';
import { __ } from '../../../helpers/common';
import { ALLRATES, DEPOSIT, TRADE, TRANSFERMONEY } from '../../../navigation/routeNames';
import AccountInfo from '../../../screens/AccountInfo';
import { NotificationType, TNotification } from '../../../helpers/notification';
import { disptachDepositAlert, disptachisDeposit } from '../../../redux/dispatch';
import DepositMain from '../../../screens/Deposit/DepositMain';

interface Props {
    navigation?: any
    selectedCurrency?: any
    selectedChain?: any;
    closeModal?: any;
    modalvisible?: boolean;
    data?: any;
    acceptedTerms?: () => void
}
interface State {
    modalvisible?: boolean

}

const deviceHight = Dimensions.get("window").height
class DepositAlert extends Component<Props, State> {
    private navigation;
    constructor(props: Props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation;
        this.state = {
            modalvisible: false
        }

    }
    acceptTerms = async () => {
        // this.closeModal();
        // disptachisDeposit(true)
        // this.navigation.navigate(DEPOSIT,{data: this.props?.data})

        this.props.acceptedTerms()

    }
    closeModal = () => {

        disptachDepositAlert(false)
    }


    render(): React.ReactNode {
        // console.log(this.props?.data);
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        {/* <View style={styles.crossimgsett}>
                            <Pressable onPress={this.closeModal}>
                                <Image style={styles.crossimg} source={require('../../../assets/images/icons/crosscircle.png')} />
                            </Pressable>
                        </View> */}
                        <View style={styles.crossimgsett1}>
                            <Image style={styles.alertimg} source={require('../../../assets/images/icons/depositAlert.png')} />
                        </View>
                        {/* <ScrollView> */}
                            <View style={styles.pd24}>
                                <View style={styles.txt1set}>
                                    <Text style={styles.txt1}>{__('attention')}</Text>
                                </View>
                                <View style={styles.pt16}>
                                    <View style={styles.dflex}>
                                        <Text style={styles.txtcircle}>{'\u2022'}</Text>
                                        <Text style={styles.txt2}><Text style={styles.txt3}>{__('please_note')}:</Text> {__('p_cry_loss_of_funds')}</Text>
                                    </View>
                                    <View style={styles.dflex}>
                                        <Text style={styles.txtcircle}>{'\u2022'}</Text>
                                        <Text style={styles.txt2}>{__('s_deposited_immediately')}</Text>
                                    </View>
                                    <View style={styles.dflex}>
                                        <Text style={styles.txtcircle}>{'\u2022'}</Text>
                                        <Text style={styles.txt2}>{__('p_tokens_to_incorrect_adr')}</Text>
                                    </View>
                                    <View style={styles.pt16}>
                                        <CustomButton onPress={this.acceptTerms}
                                            style={{ borderRadius: 4 }}
                                            title="accept" color="bglight"></CustomButton>
                                    </View>
                                </View>
                            </View>
                        {/* </ScrollView> */}

                    </View>
                </View>
            </>
        )
    }

}
export default DepositAlert;

const styles = StyleSheet.create({
    noticemain: {
        backgroundColor: 'white',
        paddingTop: HeightToDp(28),
        paddingBottom: HeightToDp(40),
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        minHeight: HeightToDp(586)
    },
    noticepadd: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundColor: 'transparent',
    },
    alertimg: {
        width: WidthToDp(120),
        height: HeightToDp(88),
        resizeMode: 'contain'
    },
    crossimg: {
        width: WidthToDp(40),
        height: WidthToDp(40),
        resizeMode: 'contain'
    },
    crossimgsett: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: WidthToDp(24)
    },
    crossimgsett1: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: WidthToDp(24),
        paddingTop: 5
    },
    pd24: {
        paddingHorizontal: WidthToDp(24)
    },
    txt1set: {
        paddingTop: HeightToDp(32),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt1: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistMedium,
        lineHeight: 22.4
    },
    dflex: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    txt2: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6,
        paddingBottom: HeightToDp(16),
        marginLeft: 8
    },
    txt3: {
        color: theme.colors._primary.darkest,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6,
    },
    txtcircle: {
        fontSize: fontSizes(16)
    },
    pt16: {
        paddingTop: HeightToDp(16),
        // paddingBottom: HeightToDp(10)
    }


})