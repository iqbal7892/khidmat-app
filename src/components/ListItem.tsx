import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet ,Image } from 'react-native'
import { theme, WidthToDp, fontsSize, HeightToDp, fontSizes, StyleSheetManager } from '../helpers/theme';
import { User } from '../models/user';


const ListItem = (props: any) => {
    const onItemDetail = () => {
        if (props.navigatenext) {
            props.navigatenext()
        }
    }
    const switchValue = async (value: any) => {
        if(!(await props.switch(!value))) {
            toggleRef.fn();
        }
    }
    const toggleRef = {
        fn: () => {
        }
    }
    return (
        <Pressable style={[styles.container,props.containerStyle]} onPress={onItemDetail}>
            <View style={styles.border}>
                <View style={styles.itemname}>

                    {props.icon && <Image style={[{ width: WidthToDp(props.isAccountInfo?24:40), height: HeightToDp(props.isAccountInfo?24:40),marginRight:WidthToDp(props.isAccountInfo?8:12), resizeMode: props.isAccountInfo?'cover':'contain' },props.iconStyle]} source={props.icon} /> }
                    <View style={props.leftStyle}>
                        <View style={styles.flex}>
                            {props.name && <Text numberOfLines={2} style={[props.isAccountInfo?styles.nameDefault:styles.name,props.nameStyle,{paddingRight: WidthToDp(30)}]}>{props.name}</Text>}
                            {props.nameIcon && <Image style={{ width: WidthToDp(13), height: WidthToDp(13), resizeMode: 'contain',marginLeft:WidthToDp(12) }} source={props.nameIcon} />}
                        </View>

                        
                        <View style={[styles.flex]}>
                            {props.value && !props.isAccountInfo && <Text numberOfLines={1} style={[styles.subname, props.valueStyle]}>{props.value}</Text>}
                            {props.subvalue && <Text numberOfLines={1} style={[styles.subname,styles.subvalue]}> {props.subvalue}</Text>}
                        </View>
                    </View>
                    {props.navigatenext && <View style={[{display:'flex',flexDirection:'row',flex:1,alignItems:'center',justifyContent:'flex-end'}, props.rightStyle]}>
                        {props.rightValue && <Text  style={styles.rightValue}>{__(props.rightValue)}</Text>}
                        {!props.iconRight && <Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain', }} source={props.isAccountInfo?require('../../../assets/images/icons/arrow-right.png'):require('../../../assets/images/icons/angle-right.png')} />}
                        {props.iconRight && <Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain', }} source={props.iconRight} />}
                    </View>}
                </View>
            </View>
            {props.description && <Text style={styles.desctext}>{props.description}</Text>}
        </Pressable>
    )

}

export default ListItem

const styles = StyleSheetManager.Create({
    container: {
        paddingVertical: HeightToDp(15),
        
        // borderBottomColor: theme.colors.borderColor,
        // borderBottomWidth: .4,
        // marginLeft: theme.globalvalues.screenHorizontalSpace,
        // paddingRight: theme.globalvalues.screenHorizontalSpace,
    },
    border: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    flex:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemname:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: fontsSize.f13,
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors.textDark,
        includeFontPadding: false,
        lineHeight:17,
        paddingTop:2,
    },
    nameDefault: {
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.color3,
        includeFontPadding: false,
        lineHeight:17,
        paddingTop:2,
        paddingRight:WidthToDp(20)
    },
    rightValue: {
        fontSize: fontsSize.f13,
        fontFamily: theme.fonts.euclidCircularAMedium,
        color: theme.colors._informative.darkest,
        includeFontPadding: false,
        lineHeight:WidthToDp(24),
        marginRight:WidthToDp(16)
    },
    subname:{
        lineHeight:20,
        paddingTop:4,
        fontSize: fontsSize.f13,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.text,
        includeFontPadding: false,
    },
    subvalue:{
        color: theme.colors.primary
    },
    value: {
        fontSize: fontsSize.f13,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.textmutedLight,
        paddingRight: WidthToDp(12),
        includeFontPadding: false
    },
    desctext: {
        paddingTop: HeightToDp(10),
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.textmutedLight,
    },


});