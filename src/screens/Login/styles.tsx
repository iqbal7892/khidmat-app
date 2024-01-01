import { StyleSheet } from 'react-native';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';

export default StyleSheetManager.Create({
    container: {
        paddingTop: HeightToDp(35),
        textAlign: 'center',
        flex: 1,
    },
    title: {
        fontSize: fontsSize.f34,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: HeightToDp(26.5),
        fontFamily: theme.fonts.robotoMedium,
        letterSpacing: 0.4
    },
    text: {
        fontFamily: theme.fonts.robotoMedium,
        textAlign: 'center',
        marginTop:HeightToDp(23),
        fontSize: fontsSize.f16,
        color: theme.colors._text.default
    },
    textLight: {
        marginRight: 8,
        color: '#caceff',
        fontFamily: theme.fonts.robotoRegular,
    },
    touchId: {
        marginTop:HeightToDp(50),
        alignItems:'center'
    },
    touchIdImg: {
        alignSelf: 'center',
        height:HeightToDp(52),
        width:HeightToDp(52)
    },
    formTextError:{
        color: theme.colors.danger,
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.euclidCircularAMedium,
        paddingLeft:WidthToDp(5),
        paddingBottom:HeightToDp(15),
        marginTop: HeightToDp(-5)
    },
    mt12: {
        marginTop: 12
    },
    iframe1: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.4)',
    },
    dVerifyBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        padding: 20,
        borderRadius: 10
    },
    dVerifyPara: {
        color: '#fff'
    },
    txthead: {
        fontSize: fontSizes(32),
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistMedium
    },
      txt2: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(14),
        lineHeight: 19.6,
        paddingTop: 8,
        paddingBottom: 48
      },
      txtlabel:{
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistMedium,
        fontSize: fontSizes(16),
        paddingBottom: 12
      },
      txtplace:{
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(14),
      },
      mainwrapper:{
        flex: 1,
        backgroundColor: theme.colors._neutral.lightest
      },
      pt48:{
        paddingTop: 48,
      },
      txt1:{
        color: theme.colors._text.color3,
        textAlign: 'center',
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular
      }
})