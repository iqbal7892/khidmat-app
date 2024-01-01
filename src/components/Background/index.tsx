import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

export const DefaultBackgorund = (props:any=null) => (
  <View style={[styles.dfBgImgContainer,props?.containerStyle]}>
      <Image
          source={require('../../assets/images/bg/bg.png')}
          style={[styles.dfBgImg,props?.imageStyle]}
      />
  </View>
)
