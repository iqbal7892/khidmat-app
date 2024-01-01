import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'
import { __ } from '../helpers/common'

interface Props {
  Label?:any
  IconUrl?:any
  [x: string | number | symbol]: unknown;
}

const NavigationButton = ({IconUrl,Label,...props }: Props) => {


  return (
    <View style={styles.box}>
        {IconUrl && <Image style={styles.ImageIcon} source={IconUrl} />}
        {Label && <Text style={styles.label} numberOfLines={1}>{__(Label)}</Text>}
    </View>
  )
}

export default NavigationButton

const styles = StyleSheetManager.Create({
      box:{
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:theme.colors.white,
        width:WidthToDp(160),
        paddingVertical:WidthToDp(20),
        borderRadius:12,
        boxshadow:'0px 1px 14px rgba(136, 136, 136, 0.15)'
      },
      ImageIcon: {
        width: WidthToDp(20), 
        height: WidthToDp(20), 
        resizeMode: 'contain',
        
      },
      label:{
        color:theme.colors.textDark,
        fontFamily: theme.fonts.sfProTextRegular,
        fontSize: fontsSize.f15,
        lineHeight: HeightToDp(24),
        marginTop: HeightToDp(4),
        opacity:0.8
      }
  })
