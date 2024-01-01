import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'
import styles from './styles'

interface Props {
  style?: ViewStyle | ViewStyle[] | TextStyle,
  children?: any,
  headerTitleStyle?: ViewStyle | ViewStyle[],
  newVersion?: boolean
}


const Header = ({ style, children }: Props) => {
  return <View style={[styles.header, style]}>{children}
  </View>
}

const PageHeader = ({ style, children }: Props) => {
  return <View style={[styles.pageHeader, style]}>{children}
  </View>
}

const HeaderTopWrap = ({ style, children }: Props) => {
  return <View style={[styles.headerTopWrap, style]}>{children}</View>
}

const HeaderTop = ({ style, children }: Props) => {
  return <View style={[styles.headerTop, style]}>{children}</View>
}

const HeaderLeft = ({ style, children }: Props) => {
  return <View style={[styles.headerLeft, style]}>{children}</View>
}

const HeaderCenter = ({ style, children }: Props) => {
  return <View style={[styles.headerCenter, style]}>{children}</View>
}

const HeaderRight = ({ style, children }: Props) => {
  return <View style={[styles.headerRight, style]}>{children}</View>
}

const HeaderTitle = ({ style, headerTitleStyle, children }: Props) => {
  return <View style={[styles.headerTitle, headerTitleStyle]}><Text style={[styles.headerTitleTxt, style]}>{children}</Text></View>
}

const PageTitle = ({ style, children }: Props) => {
  return <View style={[styles.headerTitle]}><Text style={[styles.pageTitle, style]}>{children}</Text></View>
}

const CustomHeader = ({ style, children }: Props) => {
  return <View style={[styles.headerCustom, style]}>{children}</View>
}
const Left = ({ style, children }: Props) => {
  return <View style={[styles.Left, style]}>{children}</View>
}
const Center = ({ style, children }: Props) => {
  return <View style={[styles.Center, style]}>{children}</View>
}
const Right = ({ style, children }: Props) => {
  return <View style={[styles.Right, style]}>{children}</View>
}
const BottomHeader = ({ style, children }: Props) => {
  return <View style={[styles.BottomHeader, style]}>{children}</View>
}


export { Header, PageHeader, HeaderTopWrap, HeaderTop, HeaderLeft, HeaderCenter, HeaderRight, CustomHeader, HeaderTitle, Left, Center, Right,BottomHeader, PageTitle }