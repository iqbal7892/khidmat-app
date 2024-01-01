import React, { Component, useRef } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes } from '../../../helpers/theme';
import { __, getWallet, sleep } from '../../../helpers/common';
import CustomSwitch from '../../Switch';
import { User } from '../../../models/user';
import { DEPOSIT, HOME, MARKETSTATS, TRANSFER, TRANSFERMONEY } from '../../../navigation/routeNames';
import { disptachDepositAlert, disptachisDeposit } from '../../../redux/dispatch';
import { Currencies } from '../../../models/market';
import { transferWallet } from '../../../helpers/interfaces';

interface Props {
    navigation?: any,
    onClose?: any,
    currency?: any,
    pair?: any,
    walletType?: number,
    isolatedData?: any
}
interface State {

}

const deviceHight = Dimensions.get("window").height
class BuySellModal extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }
    handlePress = (type:string) => {
        this.props.onClose();
        if(type === 'buysell')
        this.props.navigation.navigate(MARKETSTATS,{currency: this.props.currency})
        else if(type === 'deposit'){
            disptachDepositAlert(true)
            disptachisDeposit(false)
            this.props.navigation.navigate(HOME,{currency: getWallet(this.props.currency?.id)})
        }else if(type === 'withdrawal'){
            // disptachDepositAlert(true)
            // disptachisDeposit(false)

            // console.log(getWallet(this.props.currency?.id));
            this.props.navigation.navigate(TRANSFERMONEY,{currency: getWallet(this.props.currency?.id)})
            // this.props.navigation.navigate(TRANSFERMONEY,{currency: this.props.currency})
        }else if(type === 'transfer'){
            const wT = this.props.walletType
            // console.log(wT,this.props.isolatedData);
            if(wT===1)
            this.props.navigation.navigate('Transfer',{from:transferWallet.find(e=>e.id===0), to:transferWallet.find(e=>e.id===1),type:0,selectedCurrencyId:this.props.currency?.id})
            else if(wT===2){
                if(this.props.isolatedData==null)
                this.props.navigation.navigate('Transfer',{from:transferWallet.find(e=>e.id===0), to:transferWallet.find(e=>e.id===2),type:1,selectedCurrencyId:this.props.currency?.id})
                else
                this.props.navigation.navigate('Transfer',{from:transferWallet.find(e=>e.id===2), to:transferWallet.find(e=>e.id===3),type:2,pair:this.props.isolatedData.pair, selectedCurrencyId:this.props.isolatedData.currencyId})
            }
            else if(wT===4)
            this.props.navigation.navigate('Transfer',{from:transferWallet.find(e=>e.id===2), to:transferWallet.find(e=>e.id===3),type:2,pair:this.props.isolatedData.pair, selectedCurrencyId:this.props.isolatedData.currencyId})
            else
            this.props.navigation.navigate(TRANSFER)
        }
    }


    render(): React.ReactNode {
        // console.log(this.props.currency);
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.dflex}>
                            <Image source={require('../../../assets/images/icons/border.png')} />
                        </View>
                        <Text style={styles.txt1}>{this.props.currency?.name}</Text>
                        {this.props.walletType ==undefined || this.props.walletType ===0 && <><Pressable onPress={()=>this.handlePress('buysell')}>
                        {this.props.currency?.id!==4 &&<View style={styles.pdglobal} >
                            <Text style={styles.txt6}>{__('buy')} / {__('sell')}</Text>
                        </View>}
                        </Pressable>
                        <Pressable onPress={()=>this.handlePress('deposit')}>
                        <View style={styles.pdglobal}>
                            <Text style={styles.txt6}>{__('deposit')}</Text>
                        </View>
                        </Pressable>
                        <Pressable onPress={()=>this.handlePress('withdrawal')}>
                        <View style={styles.pdglobal}>
                            <Text style={styles.txt6}>{__('withdrawal')}</Text>
                        </View>
                        </Pressable></>}
                        {[1,2].indexOf(this.props.walletType)>-1 && <Pressable onPress={()=>this.handlePress('transfer')}>
                        <View style={styles.pdglobal}>
                            <Text style={styles.txt6}>{__('transfer')}</Text>
                        </View>
                        </Pressable>}
                        <View>
                            <Pressable onPress={()=>this.props?.onClose()}>
                                <Text style={styles.txt5}>{__('cancel')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </>
        )
    }

}
export default BuySellModal;

const styles = StyleSheet.create({

    noticemain: {
        backgroundColor: 'white',
        paddingTop: HeightToDp(12),
        paddingBottom: HeightToDp(40),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // maxHeight: HeightToDp(327),
        paddingHorizontal: HeightToDp(24)
    },
    noticepadd: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    dflex: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt1: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistMedium,
        lineHeight: 22.4,
        textAlign: 'center',
        paddingTop: HeightToDp(24),
        paddingBottom: HeightToDp(8)
    },
    pdglobal: {
        // paddingHorizontal: 24,
        // paddingTop: HeightToDp(24),
        borderBottomWidth: 1,
        borderBottomColor: theme.colors._border.lightest
    },
    dflex1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgstyle1: {
        width: 24,
        height: 24,
        // marginTop: 5
    },
    txt2: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
    },
    txt3: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
        paddingTop: 36,
        paddingBottom: 32
    },
    txt4: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
        // paddingTop: 36,
        // paddingBottom: 32
    },
    dflex2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 36,
        // paddingBottom: 48
    },
    txt5: {
        color: theme.colors._primary.darkest,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        textAlign: 'center',
        paddingTop: 25

    },
    txt6: {
        color: theme.colors._text.color3,
        textAlign: 'center',
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        paddingVertical: HeightToDp(24)
    }

})