
import { StyleSheet } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../helpers/theme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheetManager.Create({
  
       mainwrpper: {
        height: HeightToDp(46),
        paddingBottom: wp('1%'),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(202, 206, 255, 0.12)',
        borderRadius: 8,
        paddingHorizontal:WidthToDp(20),
        marginBottom: HeightToDp(8)

    },
    defaultlabel: {
        fontFamily: theme.fonts.robotoRegular,
        color: 'rgba(202, 206, 255, 0.6)',
        fontSize: fontsSize.f16,
    },
    selectedLabel: {
        fontFamily: theme.fonts.robotoMedium,
        color: theme.colors.text,
        fontSize: fontsSize.f16,
    },
    modal:{
        backgroundColor:theme.colors.backgroundColor,
        marginTop:theme.globalvalues.screenVerticalSpace,
        flex:1,
    },
    drodpwonitem:{
        paddingVertical:theme.globalvalues.containerVerticalSpace,
        paddingHorizontal:theme.globalvalues.screenHorizontalSpace,
        borderBottomColor:theme.colors.borderColor,
        borderBottomWidth:.4
    },


});