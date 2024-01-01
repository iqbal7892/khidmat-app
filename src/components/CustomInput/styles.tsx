import { fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme";

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
    borderWidth: 1.5,
    borderColor: theme.colors._border.light,
    borderRadius: 4,
    height: HeightToDp(48)
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
    fontSize: fontSizes(14),
    paddingHorizontal: WidthToDp(16),
    fontFamily: theme.fonts.geomanistRegular,
    color: theme.colors._text.default,
  },
  label: {
    fontSize: fontSizes(16),
    fontFamily: theme.fonts.geomanistMedium,
    color: theme.colors._text.default,
    lineHeight: HeightToDp(20),
    marginBottom: HeightToDp(12)
  },
  errorTxt: {
    position: 'absolute',
    left: 0,
    top: '105%',
    // bottom: HeightToDp(-17),
    // color: 'rgba(217, 38, 31, 0.7)',
    color: theme.colors._danger.default,
    fontSize: fontSizes(12),
    fontFamily: theme.fonts.geomanistRegular,
    lineHeight: fontSizes(13.5)
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