import React from 'react'
import { StyleSheet, View, Text, StatusBar, Pressable } from 'react-native'
import { theme, fontsSize, fontSizes, HeightToDp, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import CustomButton from './Button';
import { __ } from '../helpers/common';


const ConfirmPopUp = (props: any) => {
    return (
        <View style={styles.ModalContainer}>
            <StatusBar
                animated={true}
                backgroundColor={'#00000095'} />
            <View style={[styles.mainBox]}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.subtitle}>{props.desc}</Text>
                <View style={styles.btnContainer}>
                    <Pressable onPress={props.onNo} style={styles.btnStyle}>
                        <Text style={styles.titleStyle}>{__('no')}</Text>
                    </Pressable>
                    <Pressable onPress={props.onYes} style={[styles.btnStyle, { borderRightWidth: 0 }]}>
                        <Text style={[styles.titleStyle, { fontFamily: theme.fonts.robotoRegular, color: 'black' }]}>{__('yes')}</Text>
                    </Pressable>

                </View>
            </View>
        </View>

    )
}
export default ConfirmPopUp


const styles = StyleSheetManager.Create({
    ModalContainer: {
        flex: 1,
        backgroundColor: '#00000095',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainBox: {
        paddingTop: HeightToDp(20),
        width: WidthToDp(250),
        backgroundColor: theme.colors.text,
        borderRadius: 13,
    },
    title: {
        fontSize: fontsSize.f16,
        color: 'black',
        fontFamily: theme.fonts.robotoMedium,
        textAlign: 'center',
        paddingHorizontal: WidthToDp(20),
    },
    subtitle: {
        paddingTop: HeightToDp(8),
        paddingBottom: HeightToDp(18),
        fontSize: fontsSize.f14,
        color: 'black',
        fontFamily: theme.fonts.robotoRegular,
        textAlign: 'center',
        paddingHorizontal: WidthToDp(20),
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: theme.colors.borderColor,
        height: HeightToDp(42),
    },
    btnStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        width: WidthToDp(125),
        borderRightColor: theme.colors.borderColor,
        borderRightWidth: 1,
        borderRadius: 0,
    },
    titleStyle: {
        fontFamily: theme.fonts.robotoBold,
        fontSize: fontsSize.f16,
        color: theme.colors.primary
    }


})
