import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme";

export default StyleSheetManager.Create({
    content: {
        paddingTop: HeightToDp(35),
        textAlign: 'center',
        paddingBottom: HeightToDp(30),
    },
    termCheckbox: {
        display:'flex',
        alignItems:'flex-start',
        flexDirection: "row"
    },
    termCheckbox1: {
        display:'flex',
        alignItems:'center',
        flexDirection: "row",
        paddingBottom: 19
    },
    termText: {
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(14),
        color: theme.colors._text.color3,
        flex: 1,
        // lineHeight: 16.8
    },
    termText1:{
        color: theme.colors._text.color3,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 16.8
    },
    termText2:{
        color: theme.colors._success.light,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(14),
        lineHeight: 16.8
    },
    termLink: {
        color: theme.colors.primary, 
        fontFamily: theme.fonts.euclidCircularAMedium
    },
    formTextError:{
        color: theme.colors.danger,
        fontSize:fontsSize.f11,
        fontFamily: theme.fonts.robotoRegular,
        paddingLeft:WidthToDp(5),
        // paddingBottom:HeightToDp(15),
        // marginTop: HeightToDp(-5)
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
        paddingBottom: HeightToDp(6)
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
      },
      pb42: {
        paddingBottom: HeightToDp(42),
        flexDirection: 'row'
      }

})

