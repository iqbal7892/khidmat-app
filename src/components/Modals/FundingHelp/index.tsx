import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme';
import { __, getFutureBTCRate, getFutureUSDTPrice, getMarginBTCRate, getMarginUSDTPrice, getSpotBTCRate, getSpotUSDTPrice, toFixedFloor } from '../../../helpers/common';

interface Props {
    onClose: () => void,
    wallet?: any,
    marginwallet?: any,
    futurewallet?: any,

}
interface State {
    modalVisible?: any

}
const deviceHight = Dimensions.get("window").height
class FundHelp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    render(): React.ReactNode {
        const spot =this.props.wallet.wallets
        const spotAvailable = spot.reduce((accumulator, currentValue) => {
                const price = currentValue.currency.currencyType==0? getSpotBTCRate(currentValue.currency.id):0
                const availableValue = currentValue.available>0? parseFloat(currentValue.available) * price:0;
                 return accumulator + availableValue;
            
          }, 0);    
        const margin =this.props.marginwallet.MWallets
        const marginAvailable = margin.reduce((accumulator, currentValue) => {
              const price = getMarginBTCRate(currentValue.CurrencyId)
              const availableValue =  price>0?parseFloat(currentValue.Available) * price:parseFloat(currentValue.Available); // Convert string to number
              return accumulator + availableValue;
            }, 0);
        const future =this.props.futurewallet.DWallets
        const futureAvailable = future.reduce((accumulator, currentValue) => {
              const price = getFutureBTCRate(currentValue.CurrencyId)
              const availableValue =  price>0?parseFloat(currentValue.Available) * price:parseFloat(currentValue.Available); // Convert string to number
              return accumulator + availableValue;
            }, 0);
        const availableValue = futureAvailable + marginAvailable + spotAvailable
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.textpadd}>
                            <Text style={styles.textsett}>
                                {__('Help')}
                            </Text>
                            <Pressable onPress={this.props.onClose}>
                                <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                            </Pressable>
                        </View>
                        <View style = {styles.pd24}>
                            <Text style = {styles.heading2}>{__('t_assets')}</Text>
                            <Text style ={styles.para12px}>{__('t_quantity_coin')}:</Text>
                            <Text style ={[styles.para12px,styles.pb8]}>= {toFixedFloor(this.props.wallet.btcTotal, 8)} BTC</Text>
                            {/* <Text style ={styles.para12px}>{__("t_quantity_fait")}:</Text>
                            <Text style ={styles.para12px}>= 0.00000000 BTC</Text> */}
                        </View>
                        <View style = {[styles.pd24,styles.pd32]}>
                            <Text style = {styles.heading2}>{__('available_bal')}</Text>
                            <Text style ={styles.para12px}>{__('t_quantity_coin')}:</Text>
                            <Text style ={[styles.para12px,styles.pb8]}>= {toFixedFloor(availableValue, 8)} BTC</Text>
                            {/* <Text style ={styles.para12px}>{__('t_quantity_fait')}:</Text>
                            <Text style ={styles.para12px}>= 0.00000000 BTC</Text> */}
                        </View>
                    </View>
                </View>
            </>
        )
    }

}
export default FundHelp;

const styles = StyleSheetManager.Create({
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        borderRadius: 20,
        // borderWidth : 1,

    },
    noticepadd: {
        paddingHorizontal: 24,
        maxHeight: deviceHight * 1,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingBottom: HeightToDp(48)
    },
    textpadd: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        display: 'flex',
        // flex: 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    textsett: {
        fontFamily: theme.fonts.sfProTextSemibold,
        fontSize: fontSizes(15),
        color: theme.colors._text.darkest,
        letterSpacing: -0.1,
    },

    imgsetting: {
        height: WidthToDp(32),
        width: WidthToDp(32)
    },
    heading2: {
        fontFamily : theme.fonts.sfProTextMedium,
        fontSize : WidthToDp(14),
        color : theme.colors._text.darkest,
        paddingBottom : 12
    },
    para12px : {
        fontFamily : theme.fonts.sfProTextRegular,
        fontSize : WidthToDp(12),
        color : theme.colors._text.lightest
    },
    pd24 : {
        paddingHorizontal : 24
    },
    pd32:{
        paddingBottom : 32,
        paddingTop : 24
    },
    pb8 : {
        paddingBottom : 8
    }

})