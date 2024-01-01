import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme";

export default StyleSheetManager.Create({
  formGroup: {
    marginBottom: HeightToDp(20)
  },
  formControlMainWrap: {
    position: 'relative',
    paddingBottom: HeightToDp(4)
  },
  formControlWrap: {
    position: 'relative',
    flexDirection: 'row',
    display: 'flex',
    borderWidth: 2,
    borderColor: theme.colors.primaryLight,
    borderRadius: 8,
    height: HeightToDp(48),
  },
  formControlPrepend: {
    paddingLeft: WidthToDp(16),
    paddingRight: WidthToDp(5),
    justifyContent: 'center'
  },
  formControlAppend: {
    paddingRight: WidthToDp(16),
    justifyContent: 'center'
  },
  formControl: {
    flex: 1,
    fontSize: fontSizes(16),
    paddingHorizontal: WidthToDp(16),
    fontFamily: theme.fonts.euclidCircularARegular,
    color: theme.colors.text,
  },
  label: {
    fontSize: fontSizes(16),
    fontFamily: theme.fonts.euclidCircularARegular,
    color: theme.colors.text,
    lineHeight: HeightToDp(24),
    marginBottom: HeightToDp(8)
  },
  errorTxt: {
    position: 'absolute',
    left: 0,
    top: '101%',
    // bottom: HeightToDp(-17),
    color: 'rgba(217, 38, 31, 0.7)',
    fontSize: fontSizes(12),
    fontFamily: theme.fonts.euclidCircularAMedium,
    lineHeight: HeightToDp(20)
  },
  labelBotm: {
    marginTop: HeightToDp(4),
    flexDirection: 'row'
  },
  labelBotmLeft: {

  },
  labelBotmRight: {
    marginLeft: 'auto'
  }
})