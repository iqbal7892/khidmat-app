import { Dimensions, StyleSheet } from "react-native";
import { HeightToDp, WidthToDp, theme, fontSizes, StyleSheetManager } from "../../helpers/theme";

export default StyleSheetManager.Create({
    bgImg: {
      flex: 1,
      width: '100%',
      backgroundColor: '#09c',
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%'
    },
    bgImgFixed: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      // position: "absolute",
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
    dfBgImgContainer: {
      // position: 'absolute',
      // left: 0,
      // top: 0,
      // right: 0,
      // bottom: 0,
      ...StyleSheet.absoluteFillObject,
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
      width: WidthToDp(100, true),
      height: HeightToDp(356),
    },
    dfBgImg: {
        flex: 1,
        maxWidth: WidthToDp(356),
        maxHeight: HeightToDp(356),
        position: 'relative',
        top: theme.globalvalues.screenVerticalSpace,
        left: WidthToDp(48),
        resizeMode: 'contain'
    }
})