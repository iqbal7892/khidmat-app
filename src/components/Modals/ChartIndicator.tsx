import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, View, BackHandler } from 'react-native'
import { HeightToDp, StyleSheetManager, WidthToDp, fontSizes, theme } from '../../helpers/theme';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { __ } from '../../helpers/common';
import { IchartStudies } from '../../helpers/interfaces';
import { Storage } from '../../helpers/storage';
import CustomBottomSheet from '../Modals/BottomSheet';

interface IInterval {
  symbol: string,
  resolution: number
}

let supported = [
  'bollinger bands', // BOLL
  'Volume', // volume
  'parabolic sar', // SAR
  'moving average exponential', // EMA
  'MACD',
  'relative strength index', // RSI
  'stochastic rsi', //Stoch RSI
  'trix', // trix
  'rate of change', // 'ROC'
  'directional movement', // DMI
  'commodity channel index', // CCI
];
interface Props {
  addStudy: any,
}
const ChartIndicator = (props: Props) => {
  let bottomSheetCurRef = null;
  const [visible, setVisible] = useState(false);
  const studiesKey = 'studies';
  let backHandler = null;
  const [activeIndicator, setActiveIndicator] =
    useState<{ [id: string]: IchartStudies }>({
      'VOLUME': { name: 'VOLUME', fullName: 'Volume' },
      'EMA': { name: 'EMA', fullName: 'moving average exponential' }
    });
  let allIndicator: IchartStudies[] = [
    { name: 'MA', fullName: 'moving average' },
    { name: 'EMA', fullName: 'moving average exponential' },
    { name: 'BOLL', fullName: 'bollinger bands' },
    { name: 'RSI', fullName: 'relative strength index' },
    { name: 'VOLUME', fullName: 'Volume' },
    { name: 'MACD', fullName: 'MACD' },
    { name: 'StochRSI', fullName: 'stochastic rsi' },
    { name: 'TRIX', fullName: 'trix' },
    { name: 'ROC', fullName: 'rate of change' },
    { name: 'DMI', fullName: 'directional movement' },
    { name: 'CCI', fullName: 'commodity channel index' },
  ]
  useEffect(() => {
    const setStudies = async () => {
      let studies = await Storage.getInstance().tryGet(studiesKey);
      if (studies.hasValue) {
        setActiveIndicator(studies.value);
      }
    }


  })

  let secondaryIndicator: IchartStudies[] = [
    // { name: 'MA', fullName: 'moving average' },
    // { name: 'EMA', fullName: 'moving average exponential' },
    // { name: 'BOLL', fullName: 'bollinger bands' },
    // { name: 'RSI', fullName: 'relative strength index' },
    // { name: 'VOLUME', fullName: 'Volume' },
    { name: 'MACD', fullName: 'MACD' },
    { name: 'StochRSI', fullName: 'stochastic rsi' },
    { name: 'TRIX', fullName: 'trix' },
    { name: 'ROC', fullName: 'rate of change' },
    { name: 'DMI', fullName: 'directional movement' },
    { name: 'CCI', fullName: 'commodity channel index' },
  ]
  const mainIndicator: IchartStudies[] = [
    allIndicator[0],
    allIndicator[1],
    allIndicator[2],
    allIndicator[3],
    allIndicator[4]];
  const secIndicator: IchartStudies[] = secondaryIndicator;


  const addStudy = async (item: IchartStudies) => {
    let stdy = { ...activeIndicator };
    if (stdy[item.name]) {
      delete stdy[item.name];
    } else {
      stdy[item.name] = item;
    }
    setActiveIndicator(stdy);
    Storage.getInstance().set(studiesKey, JSON.stringify(stdy))
    setVisible(false);
    props.addStudy(item);
    // props.changeInterval(item)
  }

  const showModal = () => {
    setVisible(true)
    bottomSheetCurRef?.present();
  }
  const hideModal = async () => {
    // await this.props.menuShow(true);
    setVisible(false)
    bottomSheetCurRef?.dismiss();
  };

  const handleBack = () => {
    if (bottomSheetCurRef && visible) {
      bottomSheetCurRef.dismiss();
      return true;
    }
    return false;
  };


  useEffect(() => {
    backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      backHandler.remove()
    }
  })

  return (
    <React.Fragment>

      <Pressable style={styles.btn} onPress={showModal}>
        <Text style={styles.btnTxt}>{__('indicators')}</Text>
      </Pressable>

      <CustomBottomSheet
        portal={true}
        enableDynamicSizing={true}
        handleOnDismiss={hideModal}
        ref={ref => bottomSheetCurRef = ref}
      // transparent={true}
      // visible={visible}
      // onRequestClose={() => setVisible(false)}
      >
        {/* <MotiView
          from={{ translateY: 0, opacity: 0.5 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          style={{ flex: 1 }}> */}
        {/* <View style={styles.modalContainer}> */}
        {/* <MotiView
              from={{ translateY: 1000, opacity: 0.5 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 400 }}> */}
        <View style={styles.mainContainer}>
          {/* <Pressable onPress={() =>
                  setVisible(false)}
                  style={styles.mclosebtn}>
                  <Image style={{ width: WidthToDp(24), height: WidthToDp(24), resizeMode: 'contain' }} source={require('../../assets/images/icons/close.png')} />
                </Pressable> */}
          <Text style={styles.mheading}>
            {__('indicators')}</Text>
          <Text style={styles.sheading}>{__('main_indicator')}</Text>
          <View style={styles.intvals}>
            {mainIndicator.map((item, index: number) => {
              return (
                <Pressable key={item + index.toString()} style={[styles.intvalBtn, (activeIndicator[item.name] && styles.topBarBtnActive)]}
                  onPress={() => addStudy(item)}>
                  <Text style={styles.intvalBtnTxt}>{item.name}</Text>
                </Pressable>)
            })}
          </View>
          <Text style={[styles.sheading, { marginTop: HeightToDp(16) }]}>{__('secondary_indicator')}</Text>
          <View style={styles.intvals}>
            {secIndicator.map((item, index: number) => {
              return (
                <Pressable key={item + index.toString()}
                  style={[styles.intvalBtn, (activeIndicator[item.name] && styles.topBarBtnActive)]}
                  onPress={() => addStudy(item)}>
                  <Text style={styles.intvalBtnTxt}>{item.name}</Text>
                </Pressable>)
            })}
          </View>
        </View>
        {/* </MotiView> */}
        {/* </View> */}
        {/* </MotiView> */}
      </CustomBottomSheet>
    </React.Fragment>
  )
}

const styles = StyleSheetManager.Create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: '#00000080',
  },
  topBarBtnActive: {
    borderColor: theme.colors._primary.darkest,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 71, 187, 0.05)'
  },
  mainContainer: {
    backgroundColor: 'white',
    // marginTop: theme.globalvalues.screenVerticalSpace,
    borderTopLeftRadius: WidthToDp(24),
    borderTopRightRadius: WidthToDp(24),
    paddingVertical: HeightToDp(32),
    paddingHorizontal: WidthToDp(24),
    position: 'relative'
  },
  mclosebtn: {
    position: 'absolute',
    right: WidthToDp(16),
    top: WidthToDp(16)
  },
  mheading: {
    fontSize: fontSizes(16),
    fontFamily: theme.fonts.geomanistMedium,
    color: theme.colors._text.default,
    includeFontPadding: false,
    textAlign: 'center',
    marginBottom: HeightToDp(16)
  },
  sheading: {
    fontSize: fontSizes(14),
    fontFamily: theme.fonts.geomanistRegular,
    color: theme.colors._text.default,
    includeFontPadding: false,
    marginBottom: HeightToDp(16)
  },
  btn: {
    paddingVertical: WidthToDp(8),
    paddingHorizontal: WidthToDp(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: theme.colors._bg.default,
    borderWidth: 1,
    borderColor: theme.colors._bg.default
  },
  btnTxt: {
    fontSize: fontSizes(14),
    color: theme.colors._text.default
  },
  intvals: {
    flexDirection: 'row',
    gap: WidthToDp(10),
    flexWrap: 'wrap'
  },
  intvalBtn: {
    height: HeightToDp(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WidthToDp(2),
    borderWidth: 1,
    borderColor: theme.colors._border.light,
    minWidth: WidthToDp(73)
  },
  intvalBtnTxt: {
    color: theme.colors._text.default,
    textAlign: 'center',
    fontSize: fontSizes(14),
    fontFamily: theme.fonts.geomanistRegular
  },
})

export default ChartIndicator