import React from 'react'
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { fontsSize, fontSizes, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'
import { __ } from '../helpers/common'

interface Props{
  text: string,
  style?: ViewStyle | ViewStyle[],
  recordStyle?: ViewStyle | ViewStyle[]
}

const RecordNotFound = ({ style, recordStyle, text}: Props) => {

  return (
    <View style={{ flex: 1 }}>
        <View style={[styles.norecordntainer, recordStyle]}>
            <Image style={styles.norecordImage} source={require('../assets/images/icons/norecords.png')} />
            <Text style={styles.norecordText}>{__(text)}</Text>
        </View>
    </View>
  )
}

export default RecordNotFound

const styles = StyleSheetManager.Create({
    norecordntainer: {
      backgroundColor: theme.colors._neutral.lightest,
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: theme.globalvalues.headingverticalSpace,
      marginHorizontal: theme.globalvalues.screenHorizontalSpace,
      paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
      paddingVertical: theme.globalvalues.headingverticalSpace,
  },
  norecordImage: {
      height: WidthToDp(7, true),
      width: WidthToDp(7, true),
      resizeMode: 'contain',
  },
  norecordText: {
      fontSize: fontsSize.f14,
      color: theme.colors.text,
      fontFamily: theme.fonts.euclidCircularARegular,
      paddingLeft: theme.globalvalues.screenHorizontalSpace
  }
})
