import { StatusBar, StyleSheet } from "react-native";
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    pairSelect: {
        flexDirection: 'row'
    },
    pairSelectIcon: {
        width: WidthToDp(44), 
        height: WidthToDp(44), 
        resizeMode: 'contain',
        marginRight: WidthToDp(12)
    },
    pairSelectText: {
        fontSize: fontSizes(13),
        fontFamily: theme.fonts.sfProTextMedium,
        textTransform: 'uppercase',
        color: theme.colors._text.darkest,
    },
    pairSelectTextMute: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.sfProTextRegular,
        textTransform: 'uppercase',
        color: theme.colors._text.lightest,
    },
    centeredView: {
    },
    modelWrapper: {
        height: '100%'
    },
    modal: {
        flex: 1,
        backgroundColor: theme.colors._neutral.darkest50,
        paddingTop: StatusBar.currentHeight ? 5 : theme.globalvalues.screenVerticalSpace,
    },
    modalContent: {
        flex: 1,
        backgroundColor: theme.colors.white,
        borderTopRightRadius: WidthToDp(40),
        borderTopLeftRadius: WidthToDp(40),
        paddingTop: HeightToDp(28),
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
    walletitemHeight: {
        flex: 1,
    },
    headerBtn: {
        // paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        justifyContent: 'center',
    },
    tabStyle: {
        width: WidthToDp(84)
    },
})