import { StyleSheet } from "react-native";
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    btn: {
        height: HeightToDp(24),
        borderRadius: 4,
        backgroundColor: theme.colors._bg.color4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: WidthToDp(8)
    },
    btnLarge: {
        height: HeightToDp(36),
        borderRadius: 4,
        borderWidth:1.5,
        borderColor: theme.colors._border.light,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: WidthToDp(12)
    },
    btnLargeTxt: {
        fontSize: fontSizes(14),
        color: theme.colors._text.default
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
        paddingBottom: HeightToDp(24)
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
        justifyContent: 'space-between',
        height: HeightToDp(56),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    },
    itemTxt: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        color: theme.colors._text.default
    },
    itemIcon: {
        width: WidthToDp(24),
        height: WidthToDp(24), 
        resizeMode: 'contain'
    },
    closeBtn: {
        paddingVertical: HeightToDp(16),
        justifyContent: 'center'
    },
    closeBtnText: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        textAlign: 'center',
        color: theme.colors._primary.darkest
    }
})