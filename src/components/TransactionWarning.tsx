import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { __ } from '../helpers/common';


const TransactionWarning = (props: any) => {
    if (props.withdraw) {
        return (
            <View style={styles.topPadding}>
                <View style={[styles.mainContainer, styles.alignitemcenter]}>
                    <View>
                        <Foundation name="info" size={fontsSize.f18} color={theme.colors.danger} />
                    </View>
                    <Text style={styles.warningheading}>
                    {__('attention')}
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('min_withdraw')}: <Text style={{fontFamily:theme.fonts.robotoBold,color:theme.colors.text}}>{props.minimal} {props.currencyCode}</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('p_not_participate_in_ico')}
                        </Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('p_withdraw_wrong_adr')}
                        </Text>
                    </View>
                </View>


            </View>

        )
    }
    else {
        return (
            <View style={[styles.topPadding]}>
                <View style={[styles.mainContainer, styles.alignitemcenter]}>
                    <View>
                        <Foundation name="info" size={fontsSize.f18} color={theme.colors.danger} />
                    </View>
                    <Text style={styles.warningheading}>
                    {__('attention')}
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('p_loss_of_funds' , {Currency: 'btc'})}
                        </Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('p_deposite_immediately' , {Network : 'trc'})}
                        </Text>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View>
                        <Entypo name="minus" size={fontsSize.f16} color={theme.colors.text} />
                    </View>
                    <View>
                        <Text style={styles.mainParagraph}>
                        {__('p_future_assistance')}
                        </Text>
                    </View>
                </View>


            </View>

        )
    }
}

export default TransactionWarning

const styles = StyleSheetManager.Create({
    topPadding: {
        paddingTop: theme.globalvalues.screenVerticalSpace,
        marginVertical:HeightToDp(15),
        backgroundColor:theme.colors.backgroundColorgrey,
        borderRadius:WidthToDp(20),
        paddingHorizontal:WidthToDp(24),
        marginHorizontal:WidthToDp(-24)
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: theme.globalvalues.containerVerticalSpace,
    },
    alignitemcenter: {
        alignItems: 'center'
    },

    mainParagraph: {
        paddingLeft: wp('4.5%'),
        width: wp('85%'),
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors.text,
        includeFontPadding: false,
        lineHeight: hp('3%'),
        overflow: 'hidden',

    },

    warningheading: {
        paddingLeft: wp('4.5%'),
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors.text,
        includeFontPadding: false,

    }
});