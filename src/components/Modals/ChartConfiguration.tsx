import { MotiView } from 'moti';
import React, { useEffect, useRef, useState } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { HeightToDp, StyleSheetManager, WidthToDp, fontSizes, theme } from '../../helpers/theme';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { __ } from '../../helpers/common';
import { IchartStudies } from '../../helpers/interfaces';
import { Storage } from '../../helpers/storage';
import ChartRangeSlider from '../Chart/ChartRangeSlider';

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


const ChartConfiguration = () => {
  const [visible, setVisible] = useState(false);
  const studiesKey = 'studies';
  let rangeRef:any = useRef();
  const [activeIndicator, setActiveIndicator] =
    useState<{ [id: string]: IchartStudies }>({
      'VOLUME': { name: 'VOLUME', fullName: 'Volume' },
      'EMA': { name: 'EMA', fullName: 'moving average exponential' }
    });
  let allIndicator: IchartStudies[] = [
    { name: 'Last Price', fullName: 'Last Price' },
    { name: 'Price scale (y-axis)', fullName: 'Price scale (y-axis)' },
    { name: 'Countdown', fullName: 'Countdown' },
    { name: 'Price alerts', fullName: 'Price alerts' }
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
    { name: 'Historical orders', fullName: 'Historical orders' },
    { name: 'Open orders', fullName: 'Open orders' }
  ]
  const mainIndicator: IchartStudies[] = [
    allIndicator[0],
    allIndicator[1],
    allIndicator[2],
    allIndicator[3]
];
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
    // props.changeInterval(item)
  }

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)

    if(rangeRef.current)
    rangeRef.current.setTvChartHeight();
  }


  return (
    <React.Fragment>
      <Pressable style={styles.btn} onPress={showModal}>
        <Image style={styles.btnIcon} source={require('../../assets/images/icons/tchart-config.png')} />
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
      >
        <MotiView
          from={{ translateY: 0, opacity: 0.5 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
          style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <MotiView
              from={{ translateY: 1000, opacity: 0.5 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 400 }}>
              <View style={styles.mainContainer}>
                <Pressable onPress={hideModal}
                  style={styles.mclosebtn}>
                  <Image style={{ width: WidthToDp(24), height: WidthToDp(24), resizeMode: 'contain' }} source={require('../../assets/images/icons/close.png')} />
                </Pressable>
                <Text style={styles.mheading}>
                  {__('chart_config')}</Text>
                <Text style={styles.sheading}>{__('graphic')}</Text>
                <View style={styles.intvals}>
                  {mainIndicator.map((item, index: number) => {
                    return (
                      <Pressable key={item + index.toString()} style={[styles.intvalBtn, (activeIndicator[item.name] && styles.topBarBtnActive)]}
                        onPress={() => addStudy(item)}>
                        <Text style={styles.intvalBtnTxt}>{item.name}</Text>
                      </Pressable>)
                  })}
                </View>
                <Text style={[styles.sheading, { marginTop: HeightToDp(16) }]}>{__('order_display')}</Text>
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
                <Text style={styles.sheading}>{__('chart_height')}</Text>
                <ChartRangeSlider ref={rangeRef}/>
              </View>
            </MotiView>
          </View>
        </MotiView>
      </Modal>
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
    marginTop: theme.globalvalues.screenVerticalSpace,
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
    paddingHorizontal: WidthToDp(8),
    marginLeft: WidthToDp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnIcon: {
    width: WidthToDp(24),
    height: WidthToDp(24),
    resizeMode: 'contain'
  },
  intvals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  intvalBtn: {
    height: HeightToDp(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WidthToDp(2),
    borderWidth: 1,
    borderColor: theme.colors._border.light,
    flexBasis:"48%",
    marginBottom: HeightToDp(16)
  },
  intvalBtnTxt: {
    color: theme.colors._text.default,
    textAlign: 'center',
    fontSize: fontSizes(14),
    fontFamily: theme.fonts.geomanistRegular
  },
})

export default ChartConfiguration