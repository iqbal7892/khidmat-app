import React, { Component } from 'react'
import { RefreshControl, View, Dimensions, Image, Text } from 'react-native'
import RenderPairItems from './renderItems';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview"

import styles from './styles'
import { theme, WidthToDp, fontSizes } from '../../../../helpers/theme';
import { connect } from 'react-redux';
import { fetchPairs } from '../../../../redux/actions/pair';
import { Storage } from '../../../../helpers/storage';
import RecordNotFound from '../../../RecordNotFound';
import { __ } from '../../../../helpers/common';


const { width } = Dimensions.get('window');

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};

interface Props {
  dataProvider?: any,
  data?: any,
  inputSearch?: any,
  fetchPairs?: any,
  loading?: boolean,
  PairDataType?: string,
  favPairs?: any,
  navigation: any,
  isDerivate: boolean,
  isMarginPairs: boolean,
  changePair?: any
}

interface State {
  dataProvider: any,
  refreshing: any

}

class PairItems extends Component<Props, State> {
  private _layoutProvider;
  private itemHeight: number = WidthToDp(60);
  private dataProvider;
  private static favPairs: any;
  private static favLoaded = false;

  constructor(props: Props) {
    super(props);

    this.dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this.state = {
      dataProvider: this.dataProvider.cloneWithRows(this._generateArray(this.props.data.length)),
      refreshing: false
    };



    this._layoutProvider = new LayoutProvider(
      index => {
        if (index % 3 === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HALF_LEFT:
            dim.width = width;
            dim.height = this.itemHeight;
            break;
          case ViewTypes.HALF_RIGHT:
            dim.width = width;
            dim.height = this.itemHeight;
            break;
          case ViewTypes.FULL:
            dim.width = width;
            dim.height = this.itemHeight;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );
  }
  componentDidUpdate(nextProps: any) {

    if (this.props.inputSearch != nextProps.inputSearch || this.props.data != nextProps.data) {
      this.setState({
        dataProvider: this.dataProvider.cloneWithRows(this._generateArray(this.props.data.length)),
      })
    }
  }

  //  getFavorites = async () => {
  //     PairMenuItems.favPairs = this.props.data.filter((item: any) => this.props.favPairs.includes(item.id));
  //     PairMenuItems.favLoaded = true;
  //  }

  _generateArray = (n: number) => {
    // this.getFavorites();

    if (this.props.PairDataType === 'Favorites') {
      return this.props.data.filter((item: any) => this.props.favPairs.includes(item.id) && (item.type == 2 && this.props.isDerivate) && (this.props.isMarginPairs ? item.isMarginEnabled : true))
    } else if (this.props.PairDataType === 'Leverage') {
      return this.props.data.filter((item: any) => item.leveragePair == true && (item.type == 2 && this.props.isDerivate) && (this.props.isMarginPairs ? item.isMarginEnabled : true))
    }
    else if (this.props.PairDataType === 'DStocks') {
      return this.props.data.filter((item: any) => item.type === 1)
    }
    else if (this.props.PairDataType === 'Btc') {
      return this.props.data.filter((item: any) => item.marketCurrency.symbol == 'BTC' && (item.type == 2 && this.props.isDerivate) && (this.props.isMarginPairs ? item.isMarginEnabled : true))
    }
    else if (this.props.PairDataType === 'Usdt') {
      return this.props.data.filter((item: any) => item.marketCurrency.symbol == 'USDT' && (item.type == 2 && this.props.isDerivate) && (this.props.isMarginPairs ? item.isMarginEnabled : true))
    } else if (this.props.PairDataType === 'Usdc') {
      return this.props.data.filter((item: any) => item.marketCurrency.symbol == 'USDC' && (item.type == 2 && this.props.isDerivate) && (this.props.isMarginPairs ? item.isMarginEnabled : true))
    }
    else {
      return this.props.data
    }
  }



  _rowRenderer = (type: any, item: any, index: number) => {
    switch (type) {
      case ViewTypes.HALF_LEFT:
        return (
          <RenderPairItems changePairs={(item: any) => this.props.changePair(item)} isMarginPairs={this.props.isMarginPairs} item={item} key={item.id} navigation={this.props.navigation} />
        );
      case ViewTypes.HALF_RIGHT:
        return (
          <RenderPairItems changePairs={(item: any) => this.props.changePair(item)} isMarginPairs={this.props.isMarginPairs} item={item} key={item.id} navigation={this.props.navigation} />
        );
      case ViewTypes.FULL:
        return (
          <RenderPairItems changePairs={(item: any) => this.props.changePair(item)} isMarginPairs={this.props.isMarginPairs} item={item} key={item.id} navigation={this.props.navigation} />
        );
      default:
        return null;
    }
  }



  wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.wait(1000).then(() => this.setState({ refreshing: false }));
  };
  render() {

    return (
      <React.Fragment>
        <View style={styles.itemHeader}>
          <View style={styles.itemHeaderInner}>
            <Text style={styles.itemHeadTxt}>{__('trd_pairs')}</Text>
          </View>
          <View style={styles.itemHeaderInner}>
            <Text style={[styles.itemHeadTxt]}>{__('price')}</Text>
            <Text style={[styles.itemHeadTxt, { maxWidth: WidthToDp(108), textAlign: 'right' }]}>/24H {__('change')}</Text>
          </View>
        </View>
        {this.state.dataProvider._data.length !== 0 && <View style={styles.items}>
          <RecyclerListView
            keyboardShouldPersistTaps="always"
            layoutProvider={this._layoutProvider}
            dataProvider={this.state.dataProvider}
            rowRenderer={this._rowRenderer}
            scrollViewProps={{ decelerationRate: 0.95, showsVerticalScrollIndicator: false }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                tintColor={theme.colors.white} colors={[theme.colors.white]} progressBackgroundColor={theme.colors.primary}
              />
            }
          />
        </View>}
        {this.state.dataProvider._data.length === 0 && <RecordNotFound recordStyle={{ marginHorizontal: 0, backgroundColor: theme.colors._primary.darkest3 }} text='no_record_found' />}
      </React.Fragment>
    )
  }
}

const getFilterPairs = (data: any, filter: any) => {

  let pairs = [];
  if (!filter) {
    pairs = data;
  } else {
    pairs = data.filter((obj: any) => obj.name.indexOf(filter.toUpperCase()) > - 1);
  }

  return pairs;
};

const mapStateToProps = (state: any) => {
  return {
    inputSearch: state.pairReducer.inputSearch,
    data: getFilterPairs(Object.values(state.pairReducer.pairs).filter((obj: any) => obj.Status === 1 && obj.type === 2), state.pairReducer.inputSearch),
    loading: state.pairReducer.loading,
    favPairs: state.favPairReducer.favPairs
  }
}

export default connect(mapStateToProps, null)(PairItems)
