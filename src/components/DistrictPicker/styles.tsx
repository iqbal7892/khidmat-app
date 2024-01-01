import { fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme";

export default StyleSheetManager.Create({
    curSelect: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: theme.colors._border.light,
        borderRadius: 4,
        height: HeightToDp(48),
        paddingHorizontal: WidthToDp(16),
        alignItems: 'center',
        marginBottom: HeightToDp(24),
        justifyContent: 'space-between'
    },
    curSelectIconCont: {
        overflow: 'hidden', 
        borderRadius: WidthToDp(100)
    },
    curSelectIcon: {
        width: WidthToDp(24),
        height: WidthToDp(24),
        resizeMode: 'contain',
        marginRight: WidthToDp(4),
        borderRadius: WidthToDp(100)
    },
    curSelectTxt: {
        fontSize: fontSizes(14),
        color: theme.colors._text.default,
        fontFamily: theme.fonts.geomanistRegular,
        marginRight: WidthToDp(4)
    },
    title: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistMedium,
        color: theme.colors._text.default,
        textAlign: 'center',
        marginTop: HeightToDp(24),
        marginBottom: HeightToDp(14)
    },
    itemGroup: {
        paddingBottom: HeightToDp(40)
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: HeightToDp(14),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    assetsImg: {
        width: WidthToDp(32),
        height: WidthToDp(32),
        borderRadius: 100,
        resizeMode: 'cover',
    },
    assetsName: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        color: theme.colors._text.default,
        paddingLeft: theme.globalvalues.headinghorizontalSpace,
    },
    assetsTick: {
        width: WidthToDp(24),
        height: WidthToDp(24),
        borderRadius: 100,
        resizeMode: 'cover',
    }
})