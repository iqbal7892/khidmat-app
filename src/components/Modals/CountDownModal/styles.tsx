import { StyleSheet } from 'react-native';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../../helpers/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheetManager.Create({
  mainContainer: {
    width: wp('85%'),
    backgroundColor: 'white',
    borderRadius: WidthToDp(13)
  },
  heading:{
    borderTopColor: theme.colors.borderColor,
    borderTopWidth: .4,
    fontSize: fontsSize.f16,
    fontFamily: theme.fonts.robotoMedium,
    color: '#0b0c19',
    textAlign:'center',
    paddingTop:wp('6%'),
    paddingBottom:wp('2.2%'),
  },
  warning:{
    fontSize: fontsSize.f14,
    fontFamily: theme.fonts.robotoRegular,
    color: '#0b0c19',
    opacity:0.9,
    textAlign:'center',
    paddingHorizontal:wp('7%'),
    paddingBottom: WidthToDp(20)

  },
  btnContainer: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: theme.colors.borderColor,
    borderTopWidth: 1.5
  },

  btnCancel: {
    fontSize: fontsSize.f16,
    fontFamily: theme.fonts.robotoRegular,
    color: '#2ebd85',
    width: wp('35%'),
    textAlign:'center',
    paddingVertical: WidthToDp(12)
  },
  counterNumber:{
    marginTop:HeightToDp(12),
    marginBottom:HeightToDp(1),
    fontSize:fontsSize.f42,
    letterSpacing:0.79,
    fontFamily:theme.fonts.robotoRegular,
    textAlign:'center',
    color:theme.colors.white,
    opacity:0.9
  },
  counterLabel:{
    fontSize:fontsSize.f12,
    fontFamily:theme.fonts.robotoRegular,
    letterSpacing:0.48,
    textAlign:'center',
    color:'#cdcfeb',
    opacity:0.6
  },
  counterBox:{
    borderRadius:6,
    // width:WidthToDp(80),
    // height:HeightToDp(120),
    paddingHorizontal:WidthToDp(14),
    paddingVertical:WidthToDp(13),
    marginTop: WidthToDp(5),
    marginBottom:WidthToDp(20),
    marginRight:WidthToDp(5),
    marginLeft:WidthToDp(5),
    backgroundColor:'#12142b'
  }
});