import { Entypo } from '@expo/vector-icons';
import React, { Component } from 'react'
import { View, Text, Animated, Pressable } from 'react-native'
import { connect } from 'react-redux';
import { toFixedFloor } from '../../../../helpers/common';
import { TNotification, NotificationPosition, NotificationType } from '../../../../helpers/notification';
import { theme, WidthToDp, fontSizes } from '../../../../helpers/theme';
import { Pair } from '../../../../models/market';
import { DERIVATIVES, HOME, MARKET, TRADE_DETAIL } from '../../../../navigation/routeNames';
import { CHANGE_PAIR, CHANGE_PAIR_FUTURE, CHANGE_PAIR_MARGIN, SET_DERIVATIVEPAIR_MODAL } from '../../../../redux/actions/types';

import styles from './styles'
import { setDerivativePairModal } from '../../../../redux/actions/pair';

interface Props {
  item?: any,
  index?: number,
  changePair?: any,
  dispatch?: any,
  navigation: any,
  isMarginPairs?: boolean,
  changePairs?: any
}

interface State {
  pairReducer?: any
}

class RenderPairItems extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {

    }
  }

  getBtnColor = (pair: any) => (
    (pair.prevDayPrice > pair.rate) ? theme.colors._danger.medium : theme.colors._success.default
  )

  getPriceChange = (pair: any) => {
    return ((pair.prevDayPrice > pair.rate) ? ('- ' + Math.abs((pair.rate / pair.prevDayPrice * 100) - 100).toFixed(2)) : ('+ ' + Math.abs((pair.rate / pair.prevDayPrice * 100) - 100).toFixed(2))) + '%'
  };

  changePair = (item: Pair) => {
    if (item.rate === undefined) {
      TNotification.show('s_cant_change_pair', NotificationType.Danger, NotificationPosition.Top)
      return;
    }
    if(this.props.changePairs)
    this.props?.changePairs(item)

    // console.log('====');
    return;
    const state = this.props.navigation.getState();

    if((this.props.isMarginPairs)){
      this.props.dispatch({ type: CHANGE_PAIR_MARGIN, payload: item.id })

      if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
        this.props.navigation && this.props.navigation.navigate(TRADE_DETAIL)
      }
    } if (item.isSpotPair) {
      this.props.dispatch({ type: CHANGE_PAIR, payload: item.id })

      if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
        this.props.navigation && this.props.navigation.navigate(TRADE_DETAIL)
      }
    } else if (item.isDerivatePair) {
      this.props.dispatch({ type: CHANGE_PAIR_FUTURE, payload: item.id })
      if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
        this.props.navigation && this.props.navigation.navigate(DERIVATIVES)
      }
    }
    this.props.dispatch({
      type: SET_DERIVATIVEPAIR_MODAL,
      payload: false
    });
    // tsetDerivativePairModal(false);
  }

  render() {
    const { item } = this.props
    const pname = item.name.split('/');
    return (
      <Pressable onPress={() => this.changePair(item)} style={[styles.item]}>
        <View style={styles.itemLeft}>
          <Text style={[styles.title, { paddingRight: WidthToDp(10) }]} numberOfLines={1}>{item.isDerivatePair ? item.name : '' } {item.isSpotPair ? pname[0]+'-'+pname[1] : ''}</Text>
          <View style={styles.lvrg}>
            <Text style={styles.sbtitle}>{item.volume} {item.marketCurrency.symbol}</Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          <Text style={[styles.title]}>{item.rate ? toFixedFloor((item.rate), item.marketPrecision) : 'N/A'}</Text>
          <Text style={[styles.sbtitle, { color: this.getBtnColor(item) }]}>{item.rate ? this.getPriceChange(item) : 'N/A'}</Text>
        </View>
      </Pressable>
    )
  }
}

export default connect()(RenderPairItems)