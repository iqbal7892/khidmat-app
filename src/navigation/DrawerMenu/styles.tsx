import { StyleSheet } from "react-native"
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme"

export default StyleSheetManager.Create({
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
    logoWrap: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: WidthToDp(24), 
        paddingVertical: HeightToDp(36), 
        justifyContent: 'space-between',
    },
    logo: {
        width: WidthToDp(144), 
        height: HeightToDp(26), 
        resizeMode: 'contain' 
    },
    closeBtn: {
        width: WidthToDp(24), 
        height: HeightToDp(24), 
        resizeMode: 'contain' 
    },
    userBtns: {
        flexDirection: 'row',
        paddingVertical: HeightToDp(8),
        paddingBottom: HeightToDp(30),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WidthToDp(24)
    },
    userMenu: {
        flexDirection: 'row',
        paddingBottom: HeightToDp(16),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: WidthToDp(24)
    },
    userBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderRadius: 8,
        padding: WidthToDp(10)
    },
    userBtn1: {
        marginRight: WidthToDp(9)
    },
    userBtnText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.euclidCircularAMedium,
    },
    userAvatarWrap: {
        marginRight: WidthToDp(10),
    },
    userAvatar: {
        width: WidthToDp(40), 
        height: WidthToDp(40), 
        resizeMode: 'contain',
        borderRadius:100
    },
    userContent: {
        flexDirection:'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    usertitle: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.euclidCircularARegular,
        color: theme.colors.textDark,
        lineHeight: HeightToDp(24)
    },
    userSubTitle: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.euclidCircularARegular,
        color: theme.colors.text,
        lineHeight: HeightToDp(24)
    },
    userCopy: {
        width: WidthToDp(20), 
        height: WidthToDp(20), 
        resizeMode: 'contain'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: WidthToDp(24),
        paddingVertical: HeightToDp(16),
    },
    drawerItemIconWrap: {
        marginRight: WidthToDp(16),
        width: WidthToDp(24),
    },
    drawerItemIcon: {
        width: WidthToDp(24), 
        height: WidthToDp(24), 
        resizeMode: 'contain'
    },
    flex:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    drawerItemContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    drawerItemText: {
        color: theme.colors.text,
        fontSize: fontsSize.f14,    
        fontFamily: theme.fonts.euclidCircularARegular
    },
    jaDrawerItemText : {
        fontSize: fontsSize.f13
    },
    drawerItemContentRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    logBtn: {
        // backgroundColor: theme.colors.D9D9D920,
        // marginTop: HeightToDp(16)
    },
    logBtnText: {
        color: theme.colors._text.color3,
        fontSize: fontsSize.f14,  
        textAlign: 'center',
        lineHeight: 30,
        // paddingBottom: HeightToDp(10),
        paddingLeft:WidthToDp(8),
        fontFamily: theme.fonts.sfProTextRegular
    },
    logoutsection:{
        paddingBottom:HeightToDp(20)
    },
    cards:{
        backgroundColor:'rgba(250, 252, 255, 0.80)',
        borderColor:theme.colors._border.light,
        borderWidth:WidthToDp(2),
        // paddingHorizontal:WidthToDp(21),
        paddingLeft:WidthToDp(16),
        paddingRight:WidthToDp(16),
        marginBottom:HeightToDp(24),
        borderRadius: WidthToDp(4),
        shadowColor: '#0000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.02,
        shadowRadius: 10,
        elevation: 2, // For Android, since box-shadow is not directly supported.
        // paddingBottom:WidthToDp(27),
        // marginBottom:WidthToDp(24),
        // borderRadius:WidthToDp(4),
        // position:'relative',
        // shadowColor: '0px 4px 10px 0px rgba(0, 0, 0, 0.02)',
        // shadowOffset: { width: 0, height: 1 },
        // shadowRadius: 14,
        // elevation: 14,
        
      },
    headingCon:{
    paddingBottom:WidthToDp(16),
    },
    balheading: {
    fontSize: fontsSize.f16,
    color: theme.colors._text.color3,
    fontFamily: theme.fonts.sfProTextRegular,
    // lineHeight: WidthToDp(24)
    },
   
    // drawerVersionSection: {
    //     marginBottom: 10
    // },
    // version: {
    //     fontSize: 11,
    //     textAlign:'center',
    //     color: 'rgba(202, 206, 255, 0.6)',
    //     letterSpacing: 0.44,
    //     fontFamily: theme.fonts.hurmGeoSans1Regular,
    // }   
})