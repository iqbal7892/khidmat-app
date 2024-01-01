import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions, ImageStyle, StatusBar, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const {width, height} = Dimensions.get('window');
const scaleWidth = width / 375;
const scaleHeight = height / 812



export const WidthToDp = (val: number, percent = false) => {
    if(percent){
        return wp(val + '%');
    }
    
    
    //design base screen width 375 => 100/375 = 0.266666667;
    return wp(0.266666667 * val + '%');
}

export const HeightToDp = (val: number,percent = false) => {
    //design base screen height 812 => 100/812 = 0.12315270935;
    if(percent){
        return hp(val + '%');
    }
    return hp(0.12315270935 * val + '%');
}

export const fontScale = {
    scale: 1
}

export const fontSizes = (val: number) => {
    // if (Dimensions.get('window').width > 374) {
        return wp(0.266666667 * val * fontScale.scale + '%');
    // }
    // else {
    //     return wp(0.3 * val + '%');
    // }
}


export const StatusBarPadTop = () => {
    if (StatusBar.currentHeight) {
        // return StatusBar.currentHeight
        return (StatusBar.currentHeight) + HeightToDp(10)
    }
    else {
        return HeightToDp(44)
    }
}

export const theme = {
    fonts: {
        hurmGeoSans1Regular: 'EuclidCircularA-Regular',
        hurmGeoSans1Bold: 'EuclidCircularA-Bold',
        hurmGeoSans1SemiBold: 'EuclidCircularA-SemiBold',
        hurmGeoSans1Thin: 'EuclidCircularA-Light',
        robotoThin: 'SF-Pro-Text-Regular',
        robotoLight: 'SF-Pro-Text-Regular',
        robotoRegular: 'SF-Pro-Text-Regular',
        robotoMedium: 'SF-Pro-Text-Medium',
        robotoBold: 'SF-Pro-Text-Bold',
        robotoBlack: 'SF-Pro-Text-Regular',
        euclidCircularARegular: 'EuclidCircularA-Regular',
        euclidCircularALight: 'EuclidCircularA-Light',
        euclidCircularAMedium: 'EuclidCircularA-Medium',
        euclidCircularABold: 'EuclidCircularA-Bold',
        euclidCircularASemiBold: 'EuclidCircularA-SemiBold',
        interBold: 'Inter-Bold',
        interLight: 'Inter-Light',
        interMedium: 'Inter-Medium',
        interRegular: 'Inter-Regular',
        interSemiBold: 'Inter-SemiBold',
        sfProTextBold: 'SF-Pro-Text-Bold',
        sfProTextHeavy: 'SF-Pro-Text-Heavy',
        sfProTextMedium: 'SF-Pro-Text-Medium',
        sfProTextRegular: 'SF-Pro-Text-Regular',
        sfProTextSemibold: 'SF-Pro-Text-Semibold',
        geomanistRegular: 'Geomanist-Regular',
        geomanistLight: 'Geomanist-Light',
        geomanistMedium: 'Geomanist-Medium',
        geomanistBold: 'Geomanist-Bold',
        geomanistUltra: 'Geomanist-Ultra'
    },
    colors: {
        _primary : {
            // darkest: '#0026E6',
            darkest: '#0047BB',
            dark: '#1F44FF',
            medium: '#4766FF',
            light: '#99AAFF',
            lightest: '#D6DDFF',
            darkest3: 'rgba(0, 38, 230, 0.03)',
            darkest2: 'rgba(0, 10, 61, 0.02)',
            darkest4: 'rgba(0,71,187,0.04)',
            darkest5: '#0148BB',
        },
        _success : {
            darkest: '#1E4A1C',
            dark: '#2F6F2A',
            medium: '#3E9438',
            light: '#6BC77C',
            lightest: '#DAF1DF',
            default: '#6BC77C',
            color2: '#43B730',
            ultralight: '#F8FFF9'
        },
        _informative : {
            darkest: '#0F244E',
            dark: '#163578',
            medium: '#1843AA',
            light: '#81AAED',
            lightest: '#E3EBF8',
            darkest40: 'rgba(15,36,78,0.40)'
        },
        _warning : {
            darkest: '#5E2608',
            dark: '#BD4A0F',
            medium: '#ED6625',
            light: '#F7C7A1',
            lightest: '#FDF2E9',
            color1: '#F2C94C'
        },
        _danger : {
            darkest: '#69130F',
            dark: '#9F1E17',
            medium: '#D9261F',
            light: '#F09A99',
            lightest: '#FCEAE9',
            default: '#E43936',
            color1: '#F3696B'
        },
        _neutral: {
            darkest: '#000000',
            dark: '#4D4D4D',
            medium: '#999999',
            light: '#E6E6E6',
            lightest: '#FFFFFF',
            extralight: '#d9d9d933',
            grey: '#D9D9D9',
            grey20: 'rgba(217,217,217,0.2)',
            grey10: 'rgb(249 243 243 / 12%)',
            darkest50: 'rgba(0, 0, 0, 0.5)',
            danger:   '#D9261F',
            colorgray: '#F7FAFD'
        },
        _text : {
            darkest: '#000A3D',
            dark: '#000E54',
            medium: '#00147A',
            light1 : '#221C35',
            light: '#001BA3',
            lightest: '#626B93',
            color1: '#999FBB',
            color2: '#5F76E9',
            color3: '#231C35',
            color4: '#6B6B6B',
            default: '#231C35',
            darkest50: 'rgba(0, 10, 61, 0.5)',
            darkest5: 'rgba(0, 10, 61, 0.05)',
            lightest10: 'rgba(98, 107, 147, 0.1)',
            lightest50: 'rgba(98, 107, 147, 0.5)',
        },
        _bg: {
            darkest: '#F9FAFD',
            dark: '#000E54',
            medium: '#00147A',
            light: '#001BA3',
            lightest: '#626B93',
            default: '#F2F6FC',
            color1: '#E9EBEF',
            color2: '#999FBB',
            color3: '#FEF9F5',
            color4: '#F5F5F5',
            color5: '#FCFDFF',
            succes: '#00CFB4',
            color6: '#ECEFF5',
            color7: '#FAFCFF'
        },
        _border :{
            lightest : '#EEEEF2',
            light: '#DDE3EE',
            warning: '#FCEDE0',
            success: '#6BC77C',
        },
        success: '#2ebd85',
        white: '#fff',
        black: '#000',
        // primary: '#0026E6',
        primary: '#0047BB',
        primaryLight: '#D6DDFF',
        light: '#E6E6E6',
        lightDark: '#999999',
        h999FBB: '#999FBB',
        D9D9D920: 'rgba(217,217,217,0.2)',
        secondary: '#292B45',
        blue: '#23253c',
        accent: '#4895ef',
        danger: '#D9261F',
        grey: '#adb5bd',
        warning: '#fba91c',
        blueDark: '#12142b',
        blueCdark: '#0b0c19',
        blueCdark90: 'rgba(11, 12, 25, 0.9)',
        lightBlueGrey: '#292b43',
        lightBlueGrey12: 'rgba(205,207,235,0.12)',
        lightBlueGrey24: 'rgba(205,207,235,0.24)',
        lightBlueGrey50: 'rgba(205,207,235,0.5)',
        lightBlueGrey60: 'rgba(205,207,235,0.6)',
        lightBlueGrey04: 'rgba(205,207,235,0.04)',
        lightBlueGrey08: 'rgba(205,207,235,0.08)',
        text: '#626B93',
        text20: 'rgba(98,107,147,0.2)',
        text50: 'rgba(98,107,147,0.5)',
        textDark: '#000A3D',
        h000E54: '#000E54',
        hEEEEF2:'#EEEEF2',
        EBF1F4:'#EBF1F4',
        h4766FF : '#4766FF',
        textwhite50: 'rgba(255,255,255,0.5)',
        textwhite60: 'rgba(255,255,255,0.6)',
        textwhite75: 'rgba(255,255,255,0.75)',
        textmutedDark: 'rgba(255,255,255,0.5)',
        textmutedLight: 'rgba(255,255,255,0.75)',
        textmutedLightest:'rgba(0, 14, 84, 0.7)',
        textLight:'rgba(0, 14, 84, 0.4)',
        backgroundLight:'rgba(0, 14, 84, 0.05)',
        textmutedgrey:'#cdcfeb',
        backgroundmutedgrey: 'rgba(205, 207, 235, 0.18)',
        borderColor: '#d9d9d94d',
        backgroundColor: '#F9FAFD',
        backgroundColorgrey: '#F3F6F9',
        backgroundColorDark: '#12142b',
        backgroundColorMuted: '#2d2e46',
        black50: 'rgba(0, 0, 0, 0.5)',
        gray:'rgba(98, 107, 147, 0.1)',
        D0D3DF: '#D0D3DF',
        FBF9F9:'#FBF9F9',
        lightgray: 'rgba(0,14,84,0.4)'
    },

    globalvalues: {
        screenVerticalSpace: StatusBarPadTop(),
        screenHorizontalSpace: WidthToDp(24),
        headingverticalSpace: HeightToDp(10),
        headinghorizontalSpace: wp('2.5%'),
        containerVerticalSpace: HeightToDp(22)
    },
}


export const fontsSize = {
    f8: fontSizes(8),
    f9: fontSizes(9),
    f10: fontSizes(10),
    f11: fontSizes(11),
    f12: fontSizes(12),
    f13: fontSizes(13),
    f14: fontSizes(14),
    f15: fontSizes(15),
    f16: fontSizes(16),
    f17: fontSizes(17),
    f18: fontSizes(18),
    f19: fontSizes(19),
    f20: fontSizes(20),
    f21: fontSizes(21),
    f22: fontSizes(22),
    f23: fontSizes(23),
    f24: fontSizes(24),
    f25: fontSizes(25),
    f26: fontSizes(26),
    f27: fontSizes(27),
    f28: fontSizes(28),
    f29: fontSizes(29),
    f30: fontSizes(30),
    f31: fontSizes(31),
    f32: fontSizes(32),
    f33: fontSizes(33),
    f34: fontSizes(34),
    f35: fontSizes(35),
    f36: fontSizes(36),
    f40: fontSizes(40),
    f42: fontSizes(42),
    f45: fontSizes(45),
    f50: fontSizes(50),
    f55: fontSizes(55)
}

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export class StyleSheetManager
{
  private static sheets = [];
  private static lastScale: number = 1;
  public static Create<T extends NamedStyles<T> | NamedStyles<any>>(st: T | NamedStyles<T>): T
  {
    const sst = StyleSheet.create(st)
    this.sheets.push(sst);
    return sst;
  }
  public static rebuild()
  {
    if (this.lastScale == fontScale.scale)
        return;
    this.lastScale = fontScale.scale;
    this.sheets.forEach(a => {
      for(var key in a)
      {
        if (a[key]['fontSize'] && !a[key]['noFontResize'])
        a[key]['fontSize'] *= fontScale.scale;
      }
    })
  }
}

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
// const scaleWidth = width / 375; // base screen width 375
// const scaleHeight = height / 812; // base screen height 812
// export function normalize(size) {
//     // size in pixel
//     const newSize1 = size * scaleWidth;
//     const newSize2 = size * scaleHeight;


//     if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize1))
//     } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize1))
//     }
// }