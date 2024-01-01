import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../../helpers/theme";

export default StyleSheetManager.Create({
    items: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: WidthToDp(24),
      marginBottom: HeightToDp(7)
    },
    itemHeaderInner: {
      flexDirection: 'row'
    },
    itemHeadTxt:{
      fontSize:fontsSize.f12,
      fontFamily:theme.fonts.sfProTextMedium,
      color:theme.colors._text.lightest
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: theme.colors._primary.darkest3,
      paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
      paddingVertical: HeightToDp(9)
    },
    itemLeft:{
      
    },
    itemRight:{
      textAlign: 'right',
      alignItems: 'flex-end',
    },
    title:{
      color: theme.colors._text.darkest,
      fontSize: fontSizes(14),
      fontFamily: theme.fonts.sfProTextMedium,
      textTransform: 'uppercase',
      lineHeight: HeightToDp(20)
    },
    sbtitle:{
      color: theme.colors._text.lightest,
      fontFamily: theme.fonts.sfProTextRegular,
      fontSize: fontSizes(12),
      lineHeight: HeightToDp(20),
      marginTop: HeightToDp(4)
    },
    lvrg: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    lvrgBadge : {
      width: WidthToDp(36),
      height: HeightToDp(20),
      borderRadius: WidthToDp(6),
      backgroundColor: 'rgba(247, 199, 161, 0.24)',
      color: theme.colors._warning.medium,
      textAlign: 'center',
      lineHeight: 12,
      marginLeft: WidthToDp(4),
      fontSize: fontSizes(10),
      fontFamily: theme.fonts.sfProTextMedium,
      textAlignVertical: 'center'
    }
  })