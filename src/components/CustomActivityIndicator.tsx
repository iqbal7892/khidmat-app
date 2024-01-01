import React from 'react'
import { View, Dimensions } from 'react-native'
import { theme, StyleSheetManager  } from '../helpers/theme'
import { WebView } from 'react-native-webview';
import { AppSettings } from '../config/config';

export const CustomActivityIndicator = ({ style, color, customModal }: any) => {
  return (
    <View style={[styles.customModal,customModal]}>
      <View style={[styles.centeredView, style]}>
      <WebView
          source={{ uri: `${AppSettings.cdnEndPoint}assets/loader.html?ver=125` }}
          style={{ width: 300, height: 200, backgroundColor: 'rgba(0,0,0,0)' }}
        />
        {/* <ActivityIndicator color={color ?? theme.colors.primary} size="large"/>      */}
      </View>
    </View>
  )
}

const styles = StyleSheetManager.Create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1
  },
  customModal: { 
    position:'absolute',
    flex:1,
    width:'100%',
    height:Dimensions.get('screen').height,
    zIndex:9999999999999999,
    top:0
  }
  
})

