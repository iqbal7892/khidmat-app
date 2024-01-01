import { ActivityIndicator, View, Text, Modal, StyleSheet, StatusBar } from 'react-native';
import { Fontisto, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import React from 'react';
import { widthPercentageToDP } from 'react-native-responsive-screen';
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
    // SuccessModal: (props: any) => (
    //   <View style={[styles.centeredView, { marginTop: -HeightToDp(250) }]}>
    //     <View style={[styles.mainBox, { paddingTop: HeightToDp(15), backgroundColor: theme.colors.success }]}>
    //       <Fontisto name="flash" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
    //       <Text style={styles.title}>{props.text1}</Text>
    //     </View>
    //   </View >
    // ),
    SuccessModal: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(250) }]}>
        <View style={[styles.mainBox, styles.mainBoxSucces, { paddingTop: WidthToDp(30),}]}>
          <Fontisto name="flash" size={fontsSize.f18} color={theme.colors._success.default} />
          <Text style={[styles.title,{color: theme.colors._success.default}]}>{props.text1}</Text>
        </View>
      </View >
    ),
    // WarningModal: (props: any) => (
    //   <View style={[styles.centeredView, { marginTop: -HeightToDp(250) }]}>
    //     <View style={[styles.mainBox, styles.mainBoxWarning, { paddingTop: HeightToDp(15), backgroundColor: theme.colors.warning }]}>
    //       <Octicons name="bell" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
    //       <Text style={styles.title}>{props.text1}</Text>
    //     </View>
    //   </View >
    // ),
    WarningModal: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(250) }]}>
        <View style={[styles.mainBox, styles.mainBoxWarning, { paddingTop: WidthToDp(30), }]}>
          <Octicons name="bell" size={fontsSize.f18} color={theme.colors._warning.color1} />
          <Text style={[styles.title, {color: theme.colors._warning.color1}]}>{props.text1}</Text>
        </View>
      </View >
    ),
    // DangerModal: (props: any) => (
    //   <View style={[styles.centeredView,{ marginTop: -HeightToDp(50) }]}>
    //     <View style={[styles.mainBox, {paddingTop:HeightToDp(15), backgroundColor: theme.colors.danger }]}>
    //       <MaterialCommunityIcons name="triangle-outline" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
    //       <Text style={styles.title}>{props.text1}</Text>
    //     </View>
    //   </View >
    // ),
    DangerModal: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(50) }]}>
        <View style={[styles.mainBox, styles.mainBoxDanger, { paddingTop: WidthToDp(30), }]}>
          <MaterialCommunityIcons name="triangle-outline" size={fontsSize.f18} color={theme.colors._neutral.danger} />
          <Text style={[styles.title, {color: theme.colors._danger.default}]}>{props.text1}</Text>
        </View>
      </View >
    ),
    InfoModal: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(50) }]}>
        <View style={[styles.mainBox, { paddingTop: HeightToDp(15), backgroundColor: theme.colors.backgroundColorMuted }]}>
          <MaterialIcons name="info" size={fontsSize.f18} color={theme.colors._neutral.lightest} />
          <Text style={styles.title}>{props.text1}</Text>
        </View>
      </View >
    ),

    InternetFound: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(50) }]}>
        <StatusBar backgroundColor={'transparent'} />
        <View style={[styles.mainBox, { paddingTop: HeightToDp(35), height: HeightToDp(95), justifyContent: 'center', flexDirection: 'column', backgroundColor: theme.colors.success }]}>
          <Text style={styles.title}>Internet connection found</Text>
        </View>
      </View >
    ),

    Notfound: (props: any) => (
      <View style={[styles.centeredView, { marginTop: -HeightToDp(50) }]}>
        <StatusBar backgroundColor={theme.colors.danger} />
        <View style={[styles.mainBox, { paddingTop: HeightToDp(35), flexDirection: 'column', backgroundColor: theme.colors.danger }]}>
          <ActivityIndicator color='#fff' size="small" />
          <Text style={[styles.title, { paddingTop: HeightToDp(10) }]}>No internet connection</Text>
        </View>
      </View >
    )
  };

  return (
    <Toast config={toastConfig} />
  )


}

const styles = StyleSheetManager.Create({
  centeredView: {
    flex: 1,
    width: widthPercentageToDP('100%'),
    zIndex: 999,
  },
  marginTop: {
    marginTop: HeightToDp(30)
  },
  mainBox: {
    paddingVertical: HeightToDp(9),
    paddingHorizontal: WidthToDp(23),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 99
  },
  title: {
    fontSize: fontsSize.f12,
    // color: theme.colors._neutral.danger,
    fontFamily: theme.fonts.euclidCircularARegular,
    textAlign: 'center',
    paddingHorizontal: WidthToDp(4)
  },
  mainBoxDanger: {
    backgroundColor: 'white',
    borderBottomColor: theme.colors._neutral.danger,
    borderBottomWidth: 3,
    paddingBottom: WidthToDp(12),
    justifyContent: 'center',
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  mainBoxSucces: {
    backgroundColor: 'white',
    borderBottomColor: theme.colors._success.default,
    borderBottomWidth: 3,
    paddingBottom: WidthToDp(12),
    justifyContent: 'center',
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  mainBoxWarning: {
    backgroundColor: 'white',
    borderBottomColor: theme.colors._warning.color1,
    borderBottomWidth: 3,
    paddingBottom: WidthToDp(12),
    justifyContent: 'center',
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  
})