import React, { Component } from "react";
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontsSize, StyleSheetManager  } from '../helpers/theme'
import { connect } from "react-redux";
import CustomlineChart from "./CustomlineChart";
import { widthPercentageToDP, widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CHANGE_PAIR } from "../redux/actions/types";
import { TRADE } from "../navigation/routeNames";
import { AppSettings } from "../config/config";
import { __, isNullOrUndefined } from "../helpers/common";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { Pair, Pairs } from "../models/market";


interface Props {
  data?: any,
  dispatch?: any,
  navigation?: any,
  clickEvent?: any
}

interface State {
}

class MarketTable extends Component<Props, State> {
  private chartdata: any;
  private chartupdatetime = 60000; // 10 sec
  private currenttime: any = new Date();
  private chtUpdate = false;
  private counter = 0;
  private hotpairs=[1, 2, 3, 4, 6, 7, 8]
  constructor(props: Props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    // this.chartdata = await getPairhistory();
    this.chtUpdate = true;
  }

  goToTrade = (item: any) => {
    this.props.clickEvent(item)
    // this.props.dispatch({ type: CHANGE_PAIR, payload: item.id });
    // this.props.navigation.navigate(TRADE)
  }

  // shouldComponentUpdate(nextProps: Props, nextState: State) {
    // if (this.chtUpdate) {
    //   this.chtUpdate = false;
    //   return true;
    // }
    // this.counter++;
    // if (this.counter > 10)
    //   this.counter = 0;
    // return (this.counter == 0) || this.state != nextState;
  // }
  render() {
    // let length = 0;
    // let limit = 15;

    // if (this.props.data[1] !== undefined && this.props.data[1].rate !== undefined) {
    //   let curnt: any = new Date();
    //   let cupdate = false;
    //   if ((curnt - this.currenttime) > this.chartupdatetime) {
    //     this.currenttime = curnt;
    //     cupdate = true;
    //   }
    return (
<View style={{ flex: 1, height: 400 }}>
        <View style={styles.tableheader}>
          <Text style={[styles.head, { maxWidth: WidthToDp(115) }]}>{__('symbol')}</Text>
          <Text style={[styles.head]}>{__('latest_price')}</Text>
          <Text style={[styles.head, { maxWidth: WidthToDp(18, true) }]}>{__('range')}</Text>
        </View>
        {this.props.data && Object.keys(this.props.data).length>0 && 
        this.props.data.map((item1: any, index: any) => {
          // let item: Pair = this.props.data[item1];
          let item: Pair = item1 //this.props.data[item1];
          // console.log(item);
          if (item !== undefined) {
            if (isNullOrUndefined(item?.baseCurrency?.symbol))
              return <View key={index}></View>;
            return (
              <Pressable onPress={() => this.goToTrade(item)} key={item.id.toString()}
                style={[styles.mainassetscontainer,
                { paddingTop: (index == 0 ? HeightToDp(10) : HeightToDp(12)) }]}>
                <View style={styles.imagecontainer}>
                  <View style={styles.itemImg}>
                    <Image style={[styles.itemimage]} source={{ uri: item.baseCurrency.imgUrl }} />
                  </View>
                  <Text numberOfLines={1} style={styles.mainheading}>{item.baseCurrency.symbol} </Text>
                  <Text style={{
                    fontFamily: theme.fonts.sfProTextRegular, color: theme.colors.textLight,
                    fontSize: fontsSize.f8, display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    / {item.marketCurrency.symbol}</Text>
                </View>
                <Text style={[styles.mainvalue]}>{item.rate}</Text>
                <Text style={[{
                  flex: 1, fontFamily: theme.fonts.sfProTextMedium,
                  color: theme.colors.primary, fontSize: fontsSize.f14,
                  maxWidth: WidthToDp(18, true)
                },
                { color: theme.colors[(item?.prevDayPrice > item?.rate) ? 'danger' : 'success'] }]}>
                  {Pairs.getInstance().percentageChange(item)}
                </Text>
              </Pressable>
            )
          }
        })}
      </View>
      /*<View style={{ flex: 1, height: 400 }}>
        <View style={styles.tableheader}>
          <Text style={[styles.head, { maxWidth: WidthToDp(115) }]}>{__('symbol')}</Text>
          <Text style={[styles.head]}>{__('latest_price')}</Text>
          <Text style={[styles.head, { maxWidth: WidthToDp(18, true) }]}>{__('range')}</Text>
        </View>
        {this.props.activePairs && this.props.activePairs.map((item1: any, index: any) => {
          let item: Pair = this.props.data[item1];
          if (item !== undefined) {
            // console.log('pair now', item.rate);
            // length++;
            // item.chartdata = (this.chartdata !== undefined && this.chartdata[item.id] !== undefined ? this.chartdata[item.id] : []); // temporary
            // if (cupdate) {
            //   item.chartdata.push(item?.rate?.toString());
            //   this.currenttime = curnt;
            // }
            // let percentagechange = Math.abs((item?.rate / item?.prevDayPrice * 100) - 100).toFixed(2);
            if (isNullOrUndefined(item?.baseCurrency?.symbol))
              return <View key={index}></View>;
            return (
              <Pressable onPress={() => this.goToTrade(item)} key={item.id.toString()}
                style={[styles.mainassetscontainer,
                { paddingTop: (index == 0 ? WidthToDp(3) : WidthToDp(15)) }]}>
                <View style={styles.imagecontainer}>
                  <View style={styles.itemImg}>
                    <Image style={[styles.itemimage]} source={{ uri: item.baseCurrency.imgUrl }} />
                  </View>
                  <Text numberOfLines={1} style={styles.mainheading}>{item.baseCurrency.symbol} </Text>
                  <Text style={{
                    fontFamily: theme.fonts.sfProTextRegular, color: theme.colors.textLight,
                    fontSize: fontsSize.f8, display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    / {item.marketCurrency.symbol}</Text>
                </View>
                <Text style={[styles.mainvalue]}>{item.rate}</Text>
                <Text style={[{
                  flex: 1, fontFamily: theme.fonts.sfProTextMedium,
                  color: theme.colors.primary, fontSize: fontsSize.f14,
                  maxWidth: WidthToDp(18, true)
                },
                { color: theme.colors[(item?.prevDayPrice > item?.rate) ? 'danger' : 'success'] }]}>
                  {Pairs.getInstance().percentageChange(item)}
                </Text>
              </Pressable>
            )
          }
        })}
      </View>*/
    )
  }
  // return (
  //   <>
  //   <ContentLoader key={1} speed={1} interval={1}
  //     height={HeightToDp(48)}
  //     width={widthPercentageToDP('100%')}
  //     backgroundColor={theme.colors._primary.lightest}
  //     animate={true}
  //     foregroundColor={theme.colors._primary.light}>
  //     <Circle cx="19" cy="27" r="15" />
  //     <Rect x={widthPercentageToDP('13%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('18%')} height='18' />
  //     <Rect x={widthPercentageToDP('38%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('22%')} height='18' />
  //     <Rect x={widthPercentageToDP('65%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('20%')} height='18' />
  //   </ContentLoader>
  //   <ContentLoader key={2} speed={1} interval={1}
  //     height={HeightToDp(48)}
  //     width={widthPercentageToDP('100%')}
  //     backgroundColor={theme.colors._primary.lightest}
  //     animate={true}
  //     foregroundColor={theme.colors._primary.light}>
  //     <Circle cx="19" cy="27" r="15" />
  //     <Rect x={widthPercentageToDP('13%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('18%')} height='18' />
  //     <Rect x={widthPercentageToDP('38%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('22%')} height='18' />
  //     <Rect x={widthPercentageToDP('65%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('20%')} height='18' />
  //   </ContentLoader>
  //   <ContentLoader key={3} speed={1} interval={1}
  //     height={HeightToDp(48)}
  //     width={widthPercentageToDP('100%')}
  //     backgroundColor={theme.colors._primary.lightest}
  //     animate={true}
  //     foregroundColor={theme.colors._primary.light}>
  //     <Circle cx="19" cy="27" r="15" />
  //     <Rect x={widthPercentageToDP('13%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('18%')} height='18' />
  //     <Rect x={widthPercentageToDP('38%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('22%')} height='18' />
  //     <Rect x={widthPercentageToDP('65%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('20%')} height='18' />
  //   </ContentLoader>
  //   <ContentLoader key={4} speed={1} interval={1}
  //     height={HeightToDp(48)}
  //     width={widthPercentageToDP('100%')}
  //     backgroundColor={theme.colors._primary.lightest}
  //     animate={true}
  //     foregroundColor={theme.colors._primary.light}>
  //     <Circle cx="19" cy="27" r="15" />
  //     <Rect x={widthPercentageToDP('13%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('18%')} height='18' />
  //     <Rect x={widthPercentageToDP('38%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('22%')} height='18' />
  //     <Rect x={widthPercentageToDP('65%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('20%')} height='18' />
  //   </ContentLoader>
  //   <ContentLoader key={5} speed={1} interval={1}
  //     height={HeightToDp(48)}
  //     width={widthPercentageToDP('100%')}
  //     backgroundColor={theme.colors._primary.lightest}
  //     animate={true}
  //     foregroundColor={theme.colors._primary.light}>
  //     <Circle cx="19" cy="27" r="15" />
  //     <Rect x={widthPercentageToDP('13%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('18%')} height='18' />
  //     <Rect x={widthPercentageToDP('38%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('22%')} height='18' />
  //     <Rect x={widthPercentageToDP('65%')} y={HeightToDp(22)} rx='2' ry='2' width={widthPercentageToDP('20%')} height='18' />
  //   </ContentLoader>
  //     </>
  // )
  // }

}

const mapStateToProps = (state: any) => {
  return {
    inputSearch: state.walletReducer.inputSearch,
    // data: state.pairReducer.pairs
  }
}


export default connect(mapStateToProps, null)(MarketTable) as any;

const styles = StyleSheetManager.Create({
  tableheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    flex: 1,
    fontSize: fontsSize.f12,
    fontFamily: theme.fonts.sfProTextMedium,
    color: theme.colors.textLight
  },
  mainassetscontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: HeightToDp(12)
  },
  imagecontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: WidthToDp(115),
    flex: 1,
    fontSize: fontsSize.f14,
    fontFamily: theme.fonts.sfProTextMedium,
  },
  itemImg: {
    overflow: 'hidden',
    borderRadius: WidthToDp(60),
    marginRight: WidthToDp(5),
  },
  itemimage: {
    height: WidthToDp(24),
    width: WidthToDp(24),
  },
  mainheading: {
    fontSize: fontsSize.f16,
    fontFamily: theme.fonts.sfProTextMedium,
    color: theme.colors.h000E54,
    includeFontPadding: false,
  },
  mainvalue: {
    fontSize: fontsSize.f14,
    fontFamily: theme.fonts.sfProTextMedium,
    color: theme.colors.h000E54,
    flex: 1
  },

})
