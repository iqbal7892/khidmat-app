import React from 'react'
import { Text, Pressable, ViewStyle, Image, View } from 'react-native'
import { fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'
import { useNavigation } from '@react-navigation/native';
import { __ } from '../helpers/common';

interface Props {
  title?: string,
  style?: ViewStyle | ViewStyle[],
  titleStyle?:any,
  iconColor?: string,
  goBack?: any,
  goNext?: any,
  isTitle?: boolean,
  icon?: string
}


const BackButton = ({ title, style, titleStyle, iconColor, goBack }: Props) => {
  return DefaultBackButton()

  const navigation = useNavigation();
  const goBackNow = function() {
    if(navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // navigation.navigate("BottomTab" as any, { screen: HOME })
    }
  }
  return (
    <Pressable onPress={goBackNow} style={[styles.btn, style]}>
      <Image style={styles.btnIcon} source={require("../assets/images/icons/back.png")} />
      {/* <Image style={styles.btnIcon} source={require("../assets/images/icons/arrow-left.png")} /> */}
      {title && <Text style={[styles.btnText, titleStyle]}>{title}</Text>}
    </Pressable>
  )
}

const NextButton = ({ goNext, title, style, titleStyle }: Props) => {
  const navigation = useNavigation();
  return (
    <Pressable style={[styles.btn, style]} onPress={goNext}>
      {title && <Text style={[styles.btnText, titleStyle]}>{__(title)}</Text>}
    </Pressable>
  )
}

const CustomBackButton = ({title, iconColor, goBack }: Props) => {
  // return (
  //   <Pressable style={[styles.headerContainer]} onPress={goBack}>
  //     <Image style={{width:WidthToDp(24),height:HeightToDp(24)}} source={require("../assets/images/icons/arrow-left.png")} />
  //     {title && <Text style={[styles.headertext, { color: iconColor }]}>{title}</Text>}
  //   </Pressable>
  // )
  return DefaultBackButton(goBack)
}

const DefaultBackButton = (goBack:any=null) => {
  const navigation = useNavigation();
  let isGoBack = true
  if(goBack!==null){
    isGoBack =Object.keys(goBack).length>0
  }else{
    isGoBack =false
  }
  return (
    <Pressable style={styles.btnTwo} onPress={isGoBack?goBack:navigation.goBack}>
      <Image style={styles.btnTwoIcon} source={require("../assets/images/icons/back-2.png")} />
    </Pressable>
  )
}

const NormalBackButton = ({ goBack, icon }: Props) => {
  return (
    <Pressable style={styles.btnTwo} onPress={goBack}>
      <Image style={styles.btnTwoIcon} source={icon ?? require("../assets/images/icons/back-2.png")} />
    </Pressable>
  )
}

export { BackButton, NextButton, CustomBackButton, DefaultBackButton, NormalBackButton }


const styles = StyleSheetManager.Create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnIcon: {
    width: WidthToDp(40),
    height: HeightToDp(40), 
    resizeMode: 'contain' 
  },
  btnBackIcon: {
    paddingRight: WidthToDp(5)
  },
  btnNextIcon: {
    paddingLeft: WidthToDp(5)
  },
  btnText: {
    fontSize: fontSizes(16),
    fontFamily: theme.fonts.euclidCircularAMedium,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.primary
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // minWidth: WidthToDp(60),
    width: WidthToDp(40),
    height: HeightToDp(40), 
    marginHorizontal: WidthToDp(-10),
    paddingHorizontal: WidthToDp(10)
  },
  headertext: {
    fontSize: fontSizes(16),
    fontFamily: theme.fonts.sfProTextRegular,
    paddingLeft: WidthToDp(5),
  },
  btnTwo: {

  },
  btnTwoIcon: {
    width: WidthToDp(40),
    height: WidthToDp(40),
    resizeMode: 'contain'
  }
})
