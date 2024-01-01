import React from 'react'
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'
import CustomButton from './Button'
import { theme, HeightToDp, WidthToDp, fontsSize, StyleSheetManager  } from '../helpers/theme'
import { HOME } from '../navigation/routeNames'
import { __ } from '../helpers/common'



const RequestSent = (props: any) => {

    return (
        <View style={styles.centeredView}>
            <StatusBar
                animated={true}
                backgroundColor={theme.colors.backgroundColorDark} />
                <View style={[styles.mainBox]}>
                    <Image source={require('../assets/images/icons/complete.png')} style={{ marginBottom: HeightToDp(20), width: WidthToDp(73), height: WidthToDp(73) }}></Image>
                    <Text style={styles.title}>{__('request_sent')}</Text>
                    <Text style={styles.subtitle}>{__('p_recived_request')}</Text>
                    <CustomButton title='back_to_home' color='success' onPress={() => props.navigation.navigate(HOME)} style={{ paddingVertical: HeightToDp(8), paddingHorizontal: WidthToDp(15), borderRadius: 4 }} titleStyle={{ fontFamily: theme.fonts.robotoRegular, fontSize: fontsSize.f12 }}></CustomButton>
                </View>

        </View >

    )
}
export default RequestSent


const styles = StyleSheetManager.Create({
    centeredView: {
        flex: 1,
        backgroundColor:theme.colors.backgroundColorDark
    },
    mainBox: {
        marginTop: HeightToDp(160),
        marginHorizontal: WidthToDp(40),
        paddingVertical: HeightToDp(35),
        paddingHorizontal: WidthToDp(40),
        borderRadius: 12,
        backgroundColor: theme.colors.backgroundColorMuted,
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: fontsSize.f16,
        color: theme.colors.text,
        fontFamily: theme.fonts.robotoBold,
        textAlign: 'center'
    },
    subtitle: {
        paddingVertical: HeightToDp(18),
        fontSize: fontsSize.f16,
        color: theme.colors.textmutedgrey,
        fontFamily: theme.fonts.robotoRegular,
        textAlign: 'center',
        lineHeight: HeightToDp(25)
    },
})
