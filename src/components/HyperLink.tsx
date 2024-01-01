import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { HeightToDp, fontSizes, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'

const HyperLink = ({style, onPress, title}: any) => {
  return <Text style={[styles.link, style]} onPress={onPress}>{title}</Text>
}

export default HyperLink

const styles = StyleSheetManager.Create({
  link: {
    fontSize: fontSizes(12),
    fontFamily: theme.fonts.euclidCircularARegular,
    color: theme.colors.primary,
    lineHeight: HeightToDp(24)
  },
})