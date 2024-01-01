import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { fontSizes, fontsSize, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme'

export default StyleSheetManager.Create({
  header: {
    paddingTop: theme.globalvalues.screenVerticalSpace + HeightToDp(8),
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    paddingBottom: HeightToDp(18),
    backgroundColor: theme.colors.backgroundColor,
    minHeight: HeightToDp(42)
  },
  pageHeader: {
    paddingTop: theme.globalvalues.screenVerticalSpace + HeightToDp(16),
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    paddingBottom: HeightToDp(16),
    backgroundColor: theme.colors._neutral.lightest,
    minHeight: HeightToDp(40)
  },
  headerTopWrap: {
    minHeight: HeightToDp(40),
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  headerTop: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  headerLeft: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerRight: {
    marginLeft: 'auto',
    height: '100%',
    flexDirection: 'row'
  },
  headerTitle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  headerTitleTxt: {
    fontSize: fontSizes(15),
    lineHeight: HeightToDp(20),
    color: theme.colors._text.darkest,
    fontFamily: theme.fonts.sfProTextSemibold,
    letterSpacing: 0.32,
  },
  headerCustom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.globalvalues.screenVerticalSpace,
    backgroundColor: theme.colors.backgroundColorgrey,
    paddingHorizontal:theme.globalvalues.screenHorizontalSpace,
    paddingBottom: HeightToDp(10),
    width: widthPercentageToDP('100%'),
  },
  Left: {
    width: WidthToDp(22.5,true),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  Center: {
    width: WidthToDp(42.5,true),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Right: {
    width: WidthToDp(22.5,true),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  BottomHeader:{
    paddingTop:HeightToDp(8),
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal:theme.globalvalues.screenHorizontalSpace
  },
  pageTitle: {
    fontSize: fontSizes(16),
    lineHeight: HeightToDp(22),
    color: theme.colors._text.color3,
    fontFamily: theme.fonts.geomanistMedium,
  }
})
