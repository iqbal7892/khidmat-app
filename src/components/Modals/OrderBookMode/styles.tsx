import { StyleSheet } from "react-native";
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    btn: {
        height: HeightToDp(36),
        borderRadius: WidthToDp(4),
        borderWidth:1.5,
        borderColor: theme.colors._border.light,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: WidthToDp(6),
        marginLeft: WidthToDp(12)
    },
    btnIcon: {
        width: WidthToDp(24),
        height: WidthToDp(24), 
        resizeMode: 'contain'
    },
    centeredView: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1
    },
    modalView: {
        backgroundColor: '#fff',
        borderTopLeftRadius: WidthToDp(24),
        borderTopRightRadius: WidthToDp(24),
        paddingTop: HeightToDp(20),
        paddingBottom: HeightToDp(6)
    },
    modalContent: {
        
    },
    title: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.lightest,
        textAlign: 'center'
    },
    item: {
        height: WidthToDp(56),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace
    },
    itemLeft: {
        flexDirection: 'row'
    },
    itemTxt: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextMedium
    },
    itemIcon: {
        width: WidthToDp(24),
        height: WidthToDp(24), 
        resizeMode: 'contain'
    },
    itemModeIcon: {
        marginRight: WidthToDp(9),
    },
    closeBtn: {
        backgroundColor: theme.colors._neutral.grey20,
        height: WidthToDp(40),
        justifyContent: 'center',
        borderBottomLeftRadius: WidthToDp(20),
        borderBottomRightRadius: WidthToDp(20),
    },
    closeBtnText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextRegular,
        textAlign: 'center',
        color: theme.colors._text.lightest
    }
})