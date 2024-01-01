import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../../helpers/theme";

export default StyleSheetManager.Create({
    ItemBorder: {
        borderBottomWidth: .4,
        borderBottomColor: theme.colors.borderColor,
        paddingRight: theme.globalvalues.screenHorizontalSpace,
        marginLeft: theme.globalvalues.screenHorizontalSpace,
        width: WidthToDp(93.5, true)
    },
    mainpaddings: {
        // paddingTop: 
        // paddingBottom: 
    },
    namecontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: theme.colors.textmutedDark,
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('.1%'),
        marginHorizontal: wp('1%'),
        borderRadius: 3
    },
    badgeText: {
        fontSize: fontsSize.f10,
        fontFamily: theme.fonts.robotoBold,
        color: theme.colors.backgroundColorDark,
    },
    xbadge: {
        borderColor: theme.colors.warning,
        borderWidth: 1,
        marginHorizontal: wp('1%'),
        paddingHorizontal: wp('.2%'),
        borderRadius: 3
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagecontainer: {
        display: 'flex',
        width: wp('33%'),
        flexDirection: 'row'
    },
    itemimage: {
        height: wp('8%'),
        width: wp('8%'),
        marginRight: wp('3%'),
        borderRadius: 5,
        resizeMode: 'cover',
    },
    mainheading: {
        fontSize: fontSizes(13),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.darkest,
        includeFontPadding: false
    },
    pair: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextSemibold,
        color: theme.colors._text.darkest,
        includeFontPadding: false,
    },
    marginType: {
        fontSize: fontSizes(13),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.dark,
        includeFontPadding: false,
    },
    unrealizePNL: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.sfProTextSemibold,
        color: theme.colors._text.dark,
        includeFontPadding: false,
    },
    dLabel: {
        fontSize: fontSizes(13),
        color: theme.colors._text.lightest,
        fontFamily: theme.fonts.sfProTextRegular,
        paddingTop: hp('.4%'),
        includeFontPadding: false
    },
    dValue: {
        fontSize: fontSizes(13),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest,
        includeFontPadding: false,
        paddingTop: hp('.4%'),
        maxWidth: WidthToDp(110)
    },
    currency: {
        fontSize: fontSizes(13),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest,
        includeFontPadding: false,
        maxWidth: WidthToDp(110)
    },
    text: {
        fontSize: fontSizes(11),
        color: theme.colors._text.lightest,
        fontFamily: theme.fonts.sfProTextRegular,
        paddingTop: hp('.4%'),
        includeFontPadding: false
    },
    titleStyle: {
        fontSize: fontsSize.f11,
        fontFamily: theme.fonts.sfProTextSemibold,
        paddingHorizontal: WidthToDp(7),
    },
    cbuttons: {
        height: HeightToDp(30),
        borderRadius: WidthToDp(7)
    },
    mbuttons: {
        height: HeightToDp(50),
        borderRadius: WidthToDp(7)
    },
    mtitleStyle: {
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.sfProTextSemibold,
        paddingHorizontal: WidthToDp(7),
    },
    iconPadding: {
        paddingLeft: WidthToDp(10),
    },
    detailStyle: {
        backgroundColor: theme.colors.backgroundColor,
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        paddingTop: theme.globalvalues.containerVerticalSpace,
        paddingBottom: theme.globalvalues.headingverticalSpace,
        marginBottom: wp('2%'),
        borderRadius: 10
    },
    mainValue: {
        paddingTop: hp('1%'),
        paddingHorizontal: wp('1%'),
        fontSize: fontsSize.f14,
        color: theme.colors.text,
        fontFamily: theme.fonts.robotoBold,
    },
    lighttext: {
        paddingTop: hp('1%'),
        paddingHorizontal: wp('1%'),
        fontSize: fontsSize.f14,
        color: theme.colors.textmutedDark,
        fontFamily: theme.fonts.robotoMedium,
    },
    modelContainer: {
        flex: 1,
        margin: 0,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#00000080',
    },

    mainContainer: {
        width: WidthToDp(100, true),
        backgroundColor: 'white',
        borderRadius: WidthToDp(13),
        paddingVertical: HeightToDp(20),
        paddingHorizontal: WidthToDp(24)
    },
    mclosebtn: {
        position: 'absolute',
        right: WidthToDp(0)
    },
    mheading: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest,
        includeFontPadding: false,
        textAlign: 'center',
        // backgroundColor:'teal'
    },
    mminpos: {
        fontSize: fontSizes(14),
        paddingVertical: HeightToDp(7),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._neutral.dark,
        includeFontPadding: false,
    },
    mwarningmsg: {
        fontSize: fontSizes(12),
        paddingVertical: HeightToDp(7),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._danger.default,
        includeFontPadding: false,
    },
    formGroupStyle: {
        paddingTop: HeightToDp(40),
        marginBottom: HeightToDp(7)
    },
    formControlWrap: {
        backgroundColor: theme.colors._bg.color1,
        borderRadius: WidthToDp(8),
        borderWidth: 0,
        height: HeightToDp(44),
    },
    formControl: {
        paddingHorizontal: WidthToDp(12),
        flex: 1,
        fontSize: fontSizes(12),
        textAlign: 'center'
    },
    appendTxt: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.darkest50
    },
    mpair: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextSemibold,
        color: theme.colors._text.dark,
        includeFontPadding: false,
    },
    modelbody: {
        paddingTop: HeightToDp(20),
        paddingBottom: HeightToDp(5),
        flex: 1
    },
    line: {
        height: HeightToDp(2),
        width: WidthToDp(87, true),
        marginVertical: HeightToDp(7),
        backgroundColor: theme.colors._text.lightest50
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    formGroupStyles: {
        paddingTop: HeightToDp(0),
        marginBottom: HeightToDp(0),
    },
    btnBottom: {
        
    }
})