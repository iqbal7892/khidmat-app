import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme';
import CustomButton, { ButtonVariation } from '../../Button';
import { IExchangeWalletType, transferWallet } from '../../../helpers/interfaces';
import { __ } from '../../../helpers/common';

interface Props {
    onClose: () => void,
    currentWallet?:any,
    fromWallet?:(x:any) => void,
    toWallet?:(x:any) => void,

}
interface State {
    modalVisible?: any,
    isActive: any

}

const deviceHight = Dimensions.get("window").height
class TransferWallet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.toggleActive = this.toggleActive.bind(this);
    }
    
    data1: IExchangeWalletType[] =   transferWallet
    data2 = [
        {
            name: 'Canada',
        },
        {
            name: 'tokyocrypto',
        },
        {
            name: 'Binance TR',
        },
        {
            name: 'pexpay',
        },

    ]
     updateWallet = (v:any) => {
        if(this.props.fromWallet!==undefined)
        this.props.fromWallet(v)
        if(this.props.toWallet!==undefined)
        this.props.toWallet(v)

        this.props.onClose();
    }
    toggleActive() {
        this.setState({
            isActive: !this.state.isActive
        });
    }
    render(): React.ReactNode {
        // console.log(this.props.currentWallet)
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.textpadd}>
                            <Text style={styles.textsett}>
                                {__('select_a_wallet')}
                            </Text>
                            {/* <Pressable onPress={this.props.onClose}>
                                <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                            </Pressable> */}
                        </View>
                        <View>
                            {
                                this.data1.map((v: IExchangeWalletType, i: any) => (
                                    <Pressable key={v.id} onPress={()=> this.updateWallet(v)} >
                                    <View style={[styles.mainWrapper,{paddingTop:HeightToDp(i>0?32:0)}]}>
                                                    <View style={styles.dflex}>
                                                        <Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain', marginRight : WidthToDp(6) }} source={v.image1} />
                                                        <Text style={styles.txtmain}>{__(v.text)}</Text>
                                                    </View>
                                            <View>
                                            {this.props.currentWallet.id===v.id &&  <Image style={{ width: WidthToDp(24), height: HeightToDp(24),resizeMode: 'contain' }} source={require("../../../assets/images/icons/tick-circle.png")} />}
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                        </View>
                        {/* <View style={styles.pv24}>
                            {this.data2.map((v: any, i: any) => (
                                <View style={styles.mainWrapper}>
                                    <View style={styles.dflex}>
                                        <View style={{ marginRight: WidthToDp(6) }}>
                                            <Image style={{ width: WidthToDp(18), height: HeightToDp(18) }} source={require("../../../assets/images/icons/contrymark.png")} />
                                        </View>
                                        <Text style={styles.txtmain}>{v.name}</Text>
                                    </View>
                                    <View>
                                        <CustomButton titleStyle={{ fontSize: 13 }} style={{ height: HeightToDp(20), marginTop: HeightToDp(10), paddingHorizontal: 12 }} title="Inactive" variation={ButtonVariation.danger}></CustomButton>
                                    </View>
                                </View>
                            ))}
                        </View> */}
                    </View>
                </View>
            </>
        )
    }

}
export default TransferWallet;

const styles = StyleSheetManager.Create({
    noticemain: {
        backgroundColor: 'white',
        // paddingTop: 28,
        paddingBottom: HeightToDp(40),
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30
    },
    noticepadd: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textpadd: {
        // paddingHorizontal: 24,
        paddingBottom: HeightToDp(24),
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textsett: {
        fontFamily: theme.fonts.geomanistMedium,
        fontSize: fontSizes(16),
        color: theme.colors._text.default,
    },

    imgsetting: {
        height: WidthToDp(32),
        width: WidthToDp(32)
    },
    heading2: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(14),
        color: theme.colors._text.darkest,
        paddingBottom: 12
    },
    mainWrapper: {
        paddingHorizontal: WidthToDp(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: WidthToDp(12)
    },
    txtmain: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        color: theme.colors._text.default,
        marginLeft:WidthToDp(4)
    },
    dflex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pv24: {
        paddingVertical: WidthToDp(24)
    }

})