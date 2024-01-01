import { Entypo } from '@expo/vector-icons';
import React, { Component } from 'react'
import { Text, View, Pressable, Image, BackHandler } from "react-native";
import { HeightToDp, theme } from '../../helpers/theme';
import { connect } from 'react-redux';
import { Currency } from '../../models/market';
import styles from './styles'
import { dispatchOverViewCurrency } from '../../redux/dispatch';
import { User } from '../../models/user';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomBottomSheet from '../Modals/BottomSheet';
import { __ } from '../../helpers/common';

interface Props {
  data?: { [id: number]: Currency },
  overViewCurrnecyId: number,
  menuShow?: any,
  onItemChange?: (id:number) => void
}
interface State {
  modalVisible: boolean;
  districts: [];
  selected: Currency;
  count: number
}


class ProvincePicker extends Component<Props, State> {
  private selectedCurrency = [1, 3, 4];
  private itemHeight = HeightToDp(60);
  private interval;
  private dt = Date.now();
  private bottomSheetCurRef: any;
  private backHandler;

  constructor(props: Props) {
    super(props);
    this.dt = Date.now();

    this.state = {
      modalVisible: false,
      districts: [],
      selected: {},
      count: 0
    };


  }

  showModal = async () => {
    this.setState({
      modalVisible: true
    })

    this.bottomSheetCurRef?.present();
  }

  hideModal = async () => {
    this.setState({
      modalVisible: false
    })

    this.bottomSheetCurRef?.dismiss();
  }

  onItemChange = async (item: Currency) => {
    this.props.onItemChange(item.id)
    User.getInstance().setOverViewCurrencyId(item.id);
    await this.setState({
      selected: item
    })

    this.hideModal();

    if (this.state.count < 2) {
      this.interval = setInterval(() => {
        this.setState({ count: this.state.count + 1 });
        if (this.state.count >= 1) {
          this.setState({ count: 0 });
          clearInterval(this.interval)
        }
      }, 2000);
    }
  }

  rowRenderer = (item: Currency) => {
    return (
      <Pressable key={item.id.toString()} style={styles.itemContainer}
        onPress={() => this.onItemChange(item)}>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.assetsName}>{item?.name}</Text>
        </View>
        {item?.name === this.props.data[this.props.overViewCurrnecyId].name && <Image style={styles.assetsTick}
          source={require('../../assets/images/icons/tick-circle.png')} />}
      </Pressable>
    )
  }

  keyExtractor = (item: any) => {
    return item.currencyId.toString();
  }

  componentDidMount(): void {
    this.getProvinces();

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack = () => {
    if (this.bottomSheetCurRef && this.state.modalVisible) {
      this.bottomSheetCurRef.dismiss();
      return true;
    }
    return false;
  };

  componentWillUnmount(): void {
    this.backHandler && this.backHandler.remove();
  }

  getProvinces = async () => {
    const response = await(await fetch('https://khidmat.molset.com/get-provinces')).json();
    this.setState({
      districts: response
    })
  }

  render(): React.ReactNode {
    const { districts, selected } = this.state;

    return (
      <React.Fragment>
        <TouchableOpacity activeOpacity={1} style={styles.curSelect} onPress={this.showModal}>
          <Text style={styles.curSelectTxt}>{Object.keys(selected).length !== 0 ? selected.name : 'Select Province'}</Text>
          <Entypo name="chevron-small-down" size={26} color={theme.colors._text.default} />
        </TouchableOpacity>
        <CustomBottomSheet portal={true} enableDynamicSizing={true} handleOnDismiss={this.hideModal} ref={ref => this.bottomSheetCurRef = ref}>
          <Text style={styles.title}>Choose District</Text>
          <View style={styles.itemGroup}>
            {(districts?.length !== 0) &&
              districts.map(item => this.rowRenderer(item))
            }
          </View>
        </CustomBottomSheet>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: (state.pairReducer.currencies),
    overViewCurrnecyId: state.pairReducer.overViewCurrnecyId,
  }
}

export default connect(mapStateToProps, null)(ProvincePicker)