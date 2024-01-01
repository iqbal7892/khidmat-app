import { StatusBar, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';

export default StyleSheetManager.Create({
    container: {
        flex: 1,
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        paddingTop: theme.globalvalues.screenVerticalSpace,
        backgroundColor: theme.colors.backgroundColor,
    },
    innerContainer: {
        marginTop: HeightToDp(80),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        paddingHorizontal: WidthToDp(32),
        paddingVertical: HeightToDp(50),
        borderRadius: 12
    },
    closebtn: {
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: HeightToDp(17),
        paddingBottom: HeightToDp(9),
    },
    checkemailnote: {
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.text,
        textAlign: 'center',
        lineHeight: HeightToDp(22),
        width: widthPercentageToDP('65%')
    },
    resendbtnstyle: {
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: WidthToDp(45),
        paddingVertical: HeightToDp(7),
        marginTop: HeightToDp(30),
        marginBottom: HeightToDp(12),
    },
    btntext: {
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.white,
    },
    btntext1: {
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.text,
    },
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal:widthPercentageToDP('14%'),        
    },
    warningheading: {
        paddingTop: HeightToDp(40),
        paddingBottom:HeightToDp(10),
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.sfProTextBold,
        paddingHorizontal:widthPercentageToDP('14%'),
        color: theme.colors.text,
        textAlign:'center',
        lineHeight:HeightToDp(18)
    },
    mainParagraph: {
        paddingLeft:WidthToDp(15),
        fontSize: fontsSize.f10,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.text,
    },
   
})