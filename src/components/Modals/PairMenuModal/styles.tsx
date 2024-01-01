import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from "../../../helpers/theme";

export default StyleSheetManager.Create({
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
    content: {
        flex: 1,
        // marginTop: StatusBar.currentHeight ? 0 : theme.globalvalues.screenVerticalSpace,
        // marginTop: StatusBar.currentHeight ? 0 : theme.globalvalues.screenVerticalSpace,
        backgroundColor: theme.colors.white,
        // borderTopRightRadius: WidthToDp(40),
        // borderBottomRightRadius: WidthToDp(40),
        paddingTop: HeightToDp(StatusBar.currentHeight?28:56)
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
        maxWidth: '100%'
    },
    lvrgBadge : {
        width: WidthToDp(36),
        height: HeightToDp(20),
        borderRadius: 6,
        backgroundColor: 'rgba(247, 199, 161, 0.24)',
        justifyContent:'center'
    },
    lvrgText : {
        color: theme.colors._warning.medium,
        textAlign: 'center',
        lineHeight: HeightToDp(12),
        fontSize: fontSizes(10),
        fontFamily: theme.fonts.sfProTextMedium,
        textAlignVertical: 'center'
    }
})