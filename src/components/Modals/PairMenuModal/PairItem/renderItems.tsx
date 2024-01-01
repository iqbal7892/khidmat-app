import { Entypo } from '@expo/vector-icons';
import React, { Component } from 'react'
import { View, Text, Animated, Pressable } from 'react-native'
import { connect } from 'react-redux';
import { toFixedFloor } from '../../../../helpers/common';
import { TNotification, NotificationPosition, NotificationType } from '../../../../helpers/notification';
import { theme, WidthToDp, fontSizes } from '../../../../helpers/theme';
import { Pair } from '../../../../models/market';
import { HOME, MARKET, TRADE_DETAIL } from '../../../../navigation/routeNames';
import { CHANGE_PAIR, CHANGE_PAIR_MARGIN, SET_DERIVATIVEPAIR_MODAL, SET_PAIRMENU_MODAL } from '../../../../redux/actions/types';

import styles from './styles'

interface Props {
  item?: any,
  index?: number,
  changePairs?: any,
  dispatch?: any,
  navigation: any,
  isMarginPairs?: boolean,
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

  getBtnColor = (pair:any) => (
    (pair.prevDayPrice > pair.rate) ? theme.colors._danger.medium : theme.colors._success.default
  )

  getPriceChange = (pair:any) => {
     return ((pair.prevDayPrice > pair.rate) ? ('- ' + Math.abs((pair.rate/pair.prevDayPrice * 100) - 100).toFixed(2)) : ('+ ' + Math.abs((pair.rate/pair.prevDayPrice * 100) - 100).toFixed(2))) + '%'
  };

  changePair = (item:Pair) => {
    // if(!item.rate){
    //   Notification.show('Can not change pair', NotificationType.Danger, NotificationPosition.Top)
    //   return;
    // }
    if(this.props.changePairs)
    this.props?.changePairs(item)

    // console.log('====');
    return;
    console.log('change pair called', this.props.isMarginPairs, item.id)
    const state = this.props.navigation.getState();
    
    if(this.props.isMarginPairs){
    this.props.dispatch({type: CHANGE_PAIR_MARGIN, payload: item.id})
    } else {
    this.props.dispatch({type: CHANGE_PAIR, payload: item.id})
    }
    // this.props.dispatch({type: CHANGE_PAIR, payload: item.id})

    if(state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET){
      this.props.navigation && this.props.navigation.navigate(TRADE_DETAIL)
    }
    this.props.dispatch({
      type: SET_DERIVATIVEPAIR_MODAL,
      payload: false
    });
    this.props.dispatch({
      type: SET_PAIRMENU_MODAL,
      payload: false
    });
    
  }

  render() {
    const { item }: any = this.props
    const pname = item.name.split('/');
    // console.log(item);
    return (
        <Pressable onPress={() => this.changePair(item)} style={[styles.item]}>
          <View style={styles.itemLeft}>
           <Text style={[styles.title, { paddingRight: WidthToDp(10) }]} numberOfLines={1}>{pname[0]}/<Text style={styles.sbtitle}>{pname[1]}</Text></Text>
           <View style={styles.lvrg}>
            <Text style={styles.sbtitle}>Spot</Text>
            {item.isMarginEnabled && <View style={styles.lvrgBadge}><Text style={styles.lvrgText}>{item.margin.isolatedLVG}x</Text></View>}
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