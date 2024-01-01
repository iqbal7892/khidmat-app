import { ActivityIndicator, View, Text, Image, StatusBar } from 'react-native';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { fontsSize, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import React from 'react';
import Toast from 'react-native-toast-message';

export default function ToastNotification() {

  const toastConfig = {

    Success: (props: any) => (
      <View style={[styles.centeredView, styles.marginTop]}>
        <View style={[styles.mainBox, { backgroundColor: theme.colors.success }]}>
          <Fontisto name="flash" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
          <Text style={styles.title}>{props.text1}</Text>
        </View>
      </View>
    ),
    Warning: (props: any) => (
      <View style={[styles.centeredView, styles.marginTop]}>
        <View style={[styles.mainBox, { backgroundColor: theme.colors.warning }]}>
          <Octicons name="bell" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
          <Text style={styles.title}>{props.text1}</Text>
        </View>
      </View >
    ),
    Danger: (props: any) => (
      <View style={[styles.centeredView, styles.marginTop]}>
        <View style={[styles.mainBox, { backgroundColor: theme.colors.danger }]}>
          <MaterialCommunityIcons name="triangle-outline" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
          <Text style={styles.title}>{props.text1}</Text>
        </View>
      </View >
    ),
    Info: (props: any) => (
      <View style={[styles.centeredView, styles.marginTop]}>
        <View style={[styles.mainBox, { backgroundColor: theme.colors.backgroundColorMuted }]}>
          <MaterialIcons name="info" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
          <Text style={styles.title}>{props.text1}</Text>
        </View>
      </View >
    ),
    SuccessModal: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <View style={[styles.mainBox, styles.mainBoxSucces]}>
            <Fontisto name="flash" size={fontsSize.f18} color={theme.colors._success.default} />
            <Text style={[styles.title,{color: theme.colors._success.default}]}>{props.text1}</Text>
          </View>
        </View>
      </View>
    ),
    WarningModal: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <View style={[styles.mainBox, styles.mainBoxWarning]}>
            <Octicons name="bell" size={fontsSize.f18} color={theme.colors._warning.color1} />
            <Text style={[styles.title, {color: theme.colors._warning.color1}]}>{props.text1}</Text>
          </View>
        </View>
      </View>
    ),
    DangerModal: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <View style={[styles.mainBox, styles.mainBoxDanger]}>
            {/* <MaterialCommunityIcons name="triangle-outline" size={fontsSize.f18} color={theme.colors._neutral.danger} /> */}
            <Image style={styles.icon} source={require('../assets/images/icons/info-circle-danger.png')} />
            <Text style={[styles.title, {color: theme.colors._danger.default}]}>{props.text1}</Text>
          </View>
        </View>
      </View>
    ),
    InfoModal: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <View style={[styles.mainBox, { paddingTop: HeightToDp(15), backgroundColor: theme.colors.backgroundColorMuted }]}>
            <MaterialIcons name="info" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
            <Text style={styles.title}>{props.text1}</Text>
          </View>
        </View>
      </View>
    ),

    InternetFound: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <StatusBar backgroundColor={'transparent'} />
          <View style={[styles.mainBox, { paddingTop: HeightToDp(35), height: HeightToDp(95), justifyContent: 'center', flexDirection: 'column', backgroundColor: theme.colors.success }]}>
            <Text style={styles.title}>Internet connection found</Text>
          </View>
        </View>
      </View>
    ),

    Notfound: (props: any) => (
      <View style={styles.toast}>
        <View style={[styles.centeredView]}>
          <StatusBar backgroundColor={theme.colors.danger} />
          <View style={[styles.mainBox, { paddingTop: HeightToDp(35), flexDirection: 'column', backgroundColor: theme.colors.danger }]}>
            <ActivityIndicator color='#fff' size="small" />
            <Text style={[styles.title, { paddingTop: HeightToDp(10) }]}>No internet connection</Text>
          </View>
        </View>
      </View>
    )
  };

  toastConfig.Success = toastConfig.SuccessModal;
  toastConfig.Danger = toastConfig.DangerModal;
  toastConfig.Warning = toastConfig.WarningModal;
  toastConfig.Info = toastConfig.InfoModal;

  return (
    <Toast config={toastConfig} />
  )


}

const styles = StyleSheetManager.Create({
  toast: {
    paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
    width: '100%',
    zIndex: 999,
    backgroundColor: "transparent",
    marginTop: HeightToDp(16)
  },
  centeredView: {
    flex: 1,
    shadowColor: 'rgb(0, 0, 0)',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: { width: 0, height: -1 },
    // shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  marginTop: {
    marginTop: HeightToDp(30)
  },
  mainBox: {
    paddingVertical: HeightToDp(12),
    paddingHorizontal: WidthToDp(24),
    minHeight: HeightToDp(48),
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 99,
    flex: 1,
    backgroundColor: theme.colors._neutral.lightest,
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontsSize.f12,
    fontFamily: theme.fonts.euclidCircularARegular,
    textAlign: 'center',
    marginLeft: WidthToDp(12)
  },
  icon: {
    width: WidthToDp(24),
    height: WidthToDp(24),
    resizeMode: 'contain'
  },
  mainBoxDanger: {
    borderBottomColor: theme.colors._neutral.danger
  },
  mainBoxSucces: {
    borderBottomColor: theme.colors._success.default
  },
  mainBoxWarning: {
    borderBottomColor: theme.colors._warning.color1
  },
  
})