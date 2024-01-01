import { StatusBar, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';

export default StyleSheetManager.Create({
    container: {
        flex: 1,
        height: heightPercentageToDP('100%'),
        width: widthPercentageToDP('100%'),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        paddingTop: StatusBar.currentHeight ? 0 : theme.globalvalues.screenVerticalSpace,
        backgroundColor: theme.colors.backgroundColor,
    },
    innerContainer:{
        marginTop:HeightToDp(80),
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:theme.colors.white,
        paddingHorizontal:WidthToDp(32),
        paddingVertical:HeightToDp(50),
        borderRadius:12
    },
    checkemailnote:{
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.text,
        textAlign:'center',
        lineHeight:HeightToDp(22),
        width:WidthToDp(60, true)
    },
    resendbtnstyle:{
        borderRadius: 4,
        backgroundColor:theme.colors.primary,
        paddingHorizontal:WidthToDp(24),
        paddingVertical:HeightToDp(8),
        marginTop:HeightToDp(30),
        marginBottom:HeightToDp(12),
    },
    btntext:{
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.white,
    },
    btntext1:{
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.text,
    },
    closebtn: {
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.robotoMedium,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: HeightToDp(17),
        paddingBottom:HeightToDp(9),
    },
})