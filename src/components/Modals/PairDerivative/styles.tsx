import { StatusBar, StyleSheet } from "react-native";
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    bgColor: {
      backgroundColor: theme.colors._neutral.lightest
    },
    mainBg1: {
        flex: 1,
        maxWidth: WidthToDp(356),
        maxHeight: HeightToDp(356),
        position: 'relative',
        top: theme.globalvalues.screenVerticalSpace,
        left: WidthToDp(48),
        resizeMode: 'contain'
    },
    linear: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-end'
    },
    pairSelect: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pairSelectIcon: {
        width: WidthToDp(24), 
        height: WidthToDp(24), 
        resizeMode: 'contain',
        marginRight: WidthToDp(8)
    },
    pairSelectText: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        textTransform: 'uppercase',
        color: theme.colors._text.default,
    },
    centeredView: {
        backgroundColor: theme.colors._neutral.darkest50,
        flex: 1,
        // paddingRight: WidthToDp(52)
    },
    modelWrapper: {
        height: '100%'
    },
    content: {
        marginTop: StatusBar.currentHeight ? 0 : theme.globalvalues.screenVerticalSpace,
        paddingTop: HeightToDp(16),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        backgroundColor: theme.colors.white,
    },
    closeIcon: {
        alignItems: 'flex-end'
    },
    head: {
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    },
    headView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    headTxt: {
        fontSize: fontSizes(15),  
        fontFamily: theme.fonts.sfProTextSemibold
    },
    tabsWrap: {
        flex: 1,
    },
    backDrop: {
        width: WidthToDp(54),
        backgroundColor: theme.colors._neutral.darkest50
    }
})