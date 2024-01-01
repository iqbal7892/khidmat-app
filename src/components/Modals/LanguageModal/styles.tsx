import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1
    },
    modalView: {
        maxWidth: WidthToDp(270),
        width: '100%',
    },
    modalContent: {
        maxWidth: WidthToDp(270),
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: WidthToDp(13),
    },
    precisionItem: {
        height: WidthToDp(44),
        justifyContent: 'center',
        borderBottomColor: 'rgba(11,12,25,0.12)',
        borderBottomWidth: 0.5
    },
    precisionText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.robotoRegular,
        textAlign: 'center',
        color: theme.colors.success
    },
    closeBtn: {
        marginTop: WidthToDp(4.5),
        borderRadius: WidthToDp(13),
        backgroundColor: '#fff',
        height: WidthToDp(44),
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.robotoMedium,
        textAlign: 'center',
        color: theme.colors.blueDark
    }
})