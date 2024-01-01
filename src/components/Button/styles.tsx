import { StyleSheet } from 'react-native';
import { fontSizes, fontsSize, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';

export default StyleSheetManager.Create({
  btn: {
    borderRadius: 8,
    height: HeightToDp(56),
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
  },
  btnSm: {
    borderRadius: 8,
    padding: 8
  },
  btnText: {
    textAlign: 'center',
    fontSize: fontSizes(14),
    color: theme.colors.white,
    fontFamily: theme.fonts.geomanistMedium
  },
  primary: {
    backgroundColor: theme.colors._primary.darkest
  },
  outline_primary: {
    backgroundColor: 'white',
    borderColor: theme.colors._primary.darkest,
    borderWidth: 1
  },
  danger: {
    backgroundColor: theme.colors._danger.default
  },
  success: {
    backgroundColor: theme.colors._success.default
  },
  txtprimary: {
    color: theme.colors.white
  },
  light: {
    backgroundColor: theme.colors.light
  },
  txtlight: {
    color: theme.colors.lightDark
  },
  txtoutline_primary: {
    color: theme.colors._primary.darkest
  },


});