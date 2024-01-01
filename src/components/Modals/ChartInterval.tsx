import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, View, BackHandler } from 'react-native'
import { HeightToDp, StyleSheetManager, WidthToDp, fontSizes, theme } from '../../helpers/theme';
import { Text } from 'react-native';
import { Image } from 'react-native';
import { __ } from '../../helpers/common';
import { AntDesign } from '@expo/vector-icons';
import CustomBottomSheet from '../Modals/BottomSheet';

interface IInterval {
  symbol: string,
  resolution: number
}
interface Props {
  selectedResolution: number,
  changeInterval: any,
  showLineChart: (show: boolean) => void;
}
const ChartInerval = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [islineChart, setIsLineChart] = useState(false);

  let bottomSheetCurRef = null;
  let backHandler = null;

  const intervals: IInterval[] = [{ symbol: '1m', resolution: 1 },
  { symbol: '5m', resolution: 5 }, { symbol: '30m', resolution: 30 },
  { symbol: '2h', resolution: 120 }, { symbol: '4h', resolution: 240 }, { symbol: '6h', resolution: 360 },
  { symbol: '1D', resolution: 1440 }, { symbol: '2D', resolution: 2880 }, { symbol: '1W', resolution: 10080 }, { symbol: '1M', resolution: 43200 }]

  const changeInterval = async (item: IInterval) => {
    setVisible(false);
    props.changeInterval(item)
  }

  const shwoLineChart = (isshow) => {
    setVisible(false);
    setIsLineChart(isshow);
    props.showLineChart(isshow);
  }

  const showModal = () => {
    // setVisible(true)
    setVisible(true)
    bottomSheetCurRef?.present();
  }

  const hideModal = async () => {
    // await this.props.menuShow(true);
    bottomSheetCurRef?.dismiss();
    setVisible(false)
  }

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
  });

  return (
    <React.Fragment>
      <Pressable style={styles.btn} onPress={showModal}>
        <Image style={styles.btnIcon} source={require('../../assets/images/icons/arrow-down-2.png')} />
      </Pressable>
      <CustomBottomSheet
        portal={true}
        enableDynamicSizing={true}
        handleOnDismiss={hideModal}
        ref={ref => bottomSheetCurRef = ref}
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
          <View>
            <Text style={styles.mheading}>{__('intervals')}</Text>
          </View>
          <View style={styles.intvals}>
            <Pressable
              style={[styles.intvalBtn, ((islineChart) &&
                styles.selectedButton)]}
              onPress={() => shwoLineChart(!islineChart)}>
              <Text style={styles.intvalBtnTxt}>
                {'Line'}
              </Text>
            </Pressable>
            {intervals.map((item, index: number) => {
              return (
                <Pressable key={item.resolution + index.toString()}
                  style={[styles.intvalBtn, ((props.selectedResolution === item.resolution) &&
                    styles.selectedButton)]}
                  onPress={() => changeInterval(item)}>
                  <Text style={styles.intvalBtnTxt}>
                    {item.symbol}
                  </Text>
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
  selectedButton: {
    borderColor: theme.colors._primary.darkest,
    // color: theme.colors.white,
    // colo

  },
  mainContainer: {
    backgroundColor: 'white',
    // marginTop: theme.globalvalues.screenVerticalSpace,
    borderTopLeftRadius: WidthToDp(24),
    borderTopRightRadius: WidthToDp(24),
    paddingVertical: HeightToDp(32),
    paddingHorizontal: WidthToDp(24),

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
  btn: {
    paddingVertical: WidthToDp(8),
    height: WidthToDp(36),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  btnIcon: {
    width: WidthToDp(24),
    height: WidthToDp(24),
    resizeMode: 'contain',
    marginRight: WidthToDp(2)
  },
  intvals: {
    flexDirection: 'row',
    gap: WidthToDp(10),
    flexWrap: 'wrap'
  },
  intvalBtn: {
    paddingHorizontal: WidthToDp(16),
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

export default ChartInerval