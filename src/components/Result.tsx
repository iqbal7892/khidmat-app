import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ViewStyle, Pressable } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'
import { __ } from '../helpers/common';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { CHANGE_PAIR, CHANGE_PAIR_FUTURE } from '../redux/actions/types';
import { DERIVATIVES, TRADE, TRADE_DERIVATIVE } from '../navigation/routeNames';
import { Pairs } from '../models/market';


interface Props {
  formGroupStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];
  data?:any;
  [x: string | number | symbol]: unknown;
  
}

const Result = ({ formGroupStyle, style, ...props }: Props) => {

    const derivatives = props?.data.filter((item: any) => item.isDerivatePair === true && item.Status === 1).splice(0, 2)
    const spot = props?.data.filter((item: any) => item.isSpotPair === true && item.Status === 1).splice(0, 2)
    const navigation:any= useNavigation();
    const dispatch = useDispatch();

   const goToTrade = (pair:any)=>{
        if(pair.isSpotPair===true){
            dispatch({ type: CHANGE_PAIR, payload: pair.id });
            navigation.navigate(TRADE)
        }
        if(pair.isDerivatePair===true){
            dispatch({ type: CHANGE_PAIR_FUTURE, payload: pair.id });
            navigation.navigate(DERIVATIVES)
        }
    }
return (
    <View style={styles.main}>
        {spot.length > 0 && <View style={{marginTop: HeightToDp(16)}}>
                <Text style={styles.heading}>{__('Spot')}</Text>
                <View style={{marginTop: HeightToDp(12), flexDirection: 'row', 'flexWrap': 'wrap', gap: 15, paddingHorizontal: WidthToDp(14) }}>
                    {spot.map((t)=>
                    <Pressable onPress={() => goToTrade(t)} key={t.name} style={{ width: '47%', flexDirection: 'row', justifyContent: 'space-between', padding: WidthToDp(16), backgroundColor: theme.colors._primary.darkest2, borderRadius:WidthToDp(8) }} >
                        {/* <View  key={t.toString()} style={{ width: '47%', flexDirection: 'row', justifyContent: 'space-between', padding: WidthToDp(16), backgroundColor: theme.colors._primary.darkest2, borderRadius:WidthToDp(8) }}> */}
                            <View>
                                <Text style={styles.pair}>{t.name}</Text>
                                <Text style={styles.pairType}>
                                    {/* USDT Perpetual */}
                                </Text>
                                <Text style={[styles.pairChange,{color:t?.prevDayPrice>t?.rate?theme.colors._danger.medium:theme.colors._success.medium}]}>
                                {Pairs.getInstance().percentageChange(t)}
                                </Text>
                            </View>
                        {/* </View> */}
                    </Pressable>
                    )}
                </View>
            </View>
        }
        {derivatives.length > 0 && <View style={{marginTop: HeightToDp(16)}}>
                <Text style={styles.heading}>{__('Derivative')}</Text>
                <View style={{marginTop: HeightToDp(12), flexDirection: 'row', 'flexWrap': 'wrap', gap: 15, paddingHorizontal: WidthToDp(14) }}>
                    {derivatives.map((t:any)=>
                    // <View  key={t.name} style={{ width: '47%', flexDirection: 'row', justifyContent: 'space-between', padding: WidthToDp(16), backgroundColor: theme.colors._primary.darkest2, borderRadius:WidthToDp(8) }}>
                        <Pressable onPress={() => goToTrade(t)} key={t.name} style={{ width: '47%', flexDirection: 'row', justifyContent: 'space-between', padding: WidthToDp(16), backgroundColor: theme.colors._primary.darkest2, borderRadius:WidthToDp(8) }}>
                        <View>
                            <Text style={styles.pair}>{t.name}</Text>
                            <Text style={styles.pairType}>
                                {t.marketCurrency.symbol} Perpetual
                            </Text>
                            <Text style={[styles.pairChange,{color:t?.prevDayPrice>t?.rate?theme.colors._danger.medium:theme.colors._success.medium}]}>
                                {Pairs.getInstance().percentageChange(t)}
                            </Text>
                        </View>
                        </Pressable>
                    // </View>
                    )}
                </View>
            </View>
        }
    </View>
  )
}

export default Result

const styles = StyleSheetManager.Create({
    main:{
        backgroundColor:theme.colors._neutral.lightest,
        paddingHorizontal: WidthToDp(14),
        paddingBottom:HeightToDp(10)
    },
    formControlWrap: {
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: theme.colors.white,
        height:HeightToDp(48),
        borderRadius:50,
        borderColor:theme.colors.h999FBB,
        borderWidth:1,
    },
    formControl: {
        flex: 1,
        fontSize: fontsSize.f16,
        lineHeight: fontsSize.f20,
        paddingLeft:theme.globalvalues.headinghorizontalSpace,
        letterSpacing: -0.02,
        fontFamily: theme.fonts.euclidCircularARegular,
        color: theme.colors.text,
    },
    formControlPrepend: {
        paddingLeft: WidthToDp(15),
        justifyContent: 'center',
    },
    heading:{
        fontSize: fontsSize.f14,
        lineHeight: fontsSize.f20,
        fontFamily:theme.fonts.euclidCircularAMedium,
        color: theme.colors._text.medium
    },
    pair: {
        fontSize: fontsSize.f14,
        lineHeight: fontsSize.f16,
        fontFamily:theme.fonts.euclidCircularARegular,
        color: theme.colors._text.color2,
        textAlign:'center'
    },
    pairType: {
        fontSize: fontsSize.f12,
        lineHeight: fontsSize.f16,
        fontFamily:theme.fonts.euclidCircularARegular,
        color: theme.colors._text.lightest,
        textAlign:'center',
        marginTop:HeightToDp(4)
    },
    pairChange: {
        fontSize: fontsSize.f12,
        lineHeight: fontsSize.f16,
        fontFamily:theme.fonts.euclidCircularARegular,
        // color: theme.colors._danger.medium,
        textAlign:'center',
        marginTop:HeightToDp(4)

    },
      image: {
      width:WidthToDp(21),
      height:WidthToDp(21),
    }
  })
