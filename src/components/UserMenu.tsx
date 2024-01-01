import React from 'react'
import { Image, StyleSheet, Pressable, ViewStyle } from 'react-native'
import { connect } from 'react-redux'
import { HeightToDp, fontSizes, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'

interface Props {
  style?: ViewStyle | ViewStyle[],
  navigation: any,
  isLoggedIn?: any,
  home?: boolean,
  closeModal?:boolean
}


const UserMenu = ({ closeModal, navigation, style, home }: Props) => {
  const closeDrawer = async() => {
    if(!closeModal){
      return;
    }
    navigation.toggleDrawer()
  }
  return (
    <React.Fragment>
    {!home && <Pressable style={[styles.menu, style]} onPress={()=>closeDrawer()}>
      <Image style={styles.icon} source={require('../assets/images/icons/menu.png')} />
    </Pressable>}
    {home && <Pressable style={[styles.menu1, style]} onPress={()=>closeDrawer()}>
      <Image style={{height:WidthToDp(24),width:WidthToDp(24),resizeMode:'contain'}} source={require('../assets/images/icons/hamburger-menu.png')} />
  </Pressable>}
    
    </React.Fragment>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(UserMenu)


const styles = StyleSheetManager.Create({
  menu: {
    width: WidthToDp(42),
    height: WidthToDp(42),
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu1: {
    width: WidthToDp(40),
    height: WidthToDp(40),
    borderRadius: WidthToDp(100),
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width:WidthToDp(24),
    height:WidthToDp(24),
    resizeMode:'contain'
  }
})

