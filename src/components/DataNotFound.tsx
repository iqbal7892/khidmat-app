import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'
import { fontSizes, theme, StyleSheetManager  } from '../helpers/theme'
import { __ } from '../helpers/common'

interface Props{
  text: string,
  style?: ViewStyle | ViewStyle[] | TextStyle,
  textStyle?: ViewStyle | ViewStyle[] | TextStyle
}

const DataNotFound = ({ style, textStyle, text}: Props) => {

  return (
      <View style={[styles.record, style]}>
          <Text style={[styles.recordTxt, textStyle]}>{__(text)}</Text>
      </View>
  )
}

export default DataNotFound

const styles = StyleSheetManager.Create({
  record: {
      marginVertical: theme.globalvalues.headingverticalSpace,
      paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
      paddingVertical: theme.globalvalues.headingverticalSpace
  },
  recordTxt: {
      fontSize: fontSizes(14),
      color: theme.colors._text.color4,
      textAlign: 'center',
      fontFamily: theme.fonts.geomanistRegular
  }
})
