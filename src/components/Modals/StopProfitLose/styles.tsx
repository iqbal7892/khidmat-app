import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
    centeredView: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        justifyContent: 'flex-end'
    },
    closeBtn: {
        marginTop: WidthToDp(4.5),
        borderRadius: WidthToDp(13),
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.robotoMedium,
        textAlign: 'center',
        color: theme.colors.success
    },
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        // borderRadius: 20,
        borderTopLeftRadius: 20, // different radii for each corner
        borderBottomRightRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        flex: 1,
        // borderWidth : 1,

    },
    noticepadd: {
        // paddingHorizontal: 24,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingBottom: HeightToDp(48)
    },
    textpadd: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        display: 'flex',
        // flex: 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    textsett: {
        fontFamily: theme.fonts.sfProTextSemibold,
        fontSize: fontSizes(15),
        color: theme.colors._text.darkest,
        letterSpacing: -0.1,
    },

    imgsetting: {
        height: WidthToDp(32),
        width: WidthToDp(32)
    },
    custModal : {
        maxWidth: WidthToDp(370),
        width: '100%',
        // paddingHorizontal : WidthToDp(24),
        flex: 0.8
    },
    bodyContainer: {
       flex: 1,
        // display:'flex',
        // marginTop:WidthToDp(28),
        // marginHorizontal:-22,
        // backgroundColor:theme.colors.white,
        borderRadius:WidthToDp(8),
        paddingHorizontal: WidthToDp(24)
    },
})