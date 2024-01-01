import React, { useEffect, useRef, useState } from "react";
import { Text, View, Pressable, Image, ViewStyle, StatusBar, Modal, Dimensions } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../helpers/theme";
import Search from "../../Search";
import CustomTabView from "../../TabView";
import { filterPairs, setDerivativePairModal } from "../../../redux/actions/pair";
import { connect } from "react-redux";
import styles from "./styles";
import { Pair, Pairs } from "../../../models/market";
import { __, sleep } from "../../../helpers/common";
import ToastNotification from "../../Notification";
import PairItems from "./PairItem";
import { store } from "../../../redux/Store";
import { CHANGE_PAIR_FUTURE, SET_DERIVATIVEPAIR_MODAL } from "../../../redux/actions/types";
import { DERIVATIVES, HOME, MARKET } from "../../../navigation/routeNames";
import { HeaderCenter, HeaderLeft, HeaderTopWrap, PageHeader, PageTitle } from "../../Header";
import { DefaultBackgorund } from "../../Background";
import { CustomBackButton, DefaultBackButton, NormalBackButton } from "../../BackButton";
import MainLayout from "../../MainLayout";
import DefaultTabView from "../../DefaultTabView";
import PriceChange from "../../../screens/Trade/PriceChange";
import PairRate from "../../../screens/Trade/PairRate";

interface Props {
    setDerivativePairModal?: any,
    isSearchIcon?: boolean,
    iconType?: string,
    pairSelect?: ViewStyle | ViewStyle[],
    derivativeMV?: boolean,
    selectedPair?: any,
    value?: string,
    filterPair?: any,
    navigation?: any,
    isMarginPairs?: boolean,
    selectedPairMargin: number,
    isNewDesign?: boolean,
    isRate?: boolean
}


const PairDerivative = (props: Props) => {
    const pairs = Pairs.getInstance();
    let tabRef: any = useRef()
    let inputRef: any = useRef();

    const tabRoutes = [
        { key: 'fav', title: 'favorites' },
        { key: 'usdt', title: 'USDT-' +''+ __('perp') },
        // { key: 'usdc', title: 'USDC-' +''+ __('perp') }
    ]
    const goToTrades = (item:Pair) =>{
        // if(!item.rate){
        //   Notification.show('Can not change pair', NotificationType.Danger, NotificationPosition.Top)
        //   return;
        // }
        setTimeout(() => {
            console.log('item', item, tabRef?.isClickActive())
            if(tabRef?.isClickActive()){
                try {
                    
                    const state = props.navigation.getState();
                    // if(props.currentTab){
                    //     if(props.currentTab?.key==='tspot'){
                    //         store.dispatch({type: CHANGE_PAIR, payload: item.id})
                    //     }else if(props.currentTab?.key==='mtrading'){
                    //         store.dispatch({type: CHANGE_PAIR_MARGIN, payload: item.id})
                    //     }

                    // }else{

                        
                    //     if(props.isMarginPairs){
                    //         store.dispatch({type: CHANGE_PAIR_MARGIN, payload: item.id})
                    //     } else {
                    //         store.dispatch({type: CHANGE_PAIR, payload: item.id})
                    //     }
                    // }
                    // if(state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET){
                    //     props.navigation && props.navigation.navigate(TRADE_DETAIL)
                    // }
                    // store.dispatch({
                    // type: SET_DERIVATIVEPAIR_MODAL,
                    // payload: false
                    // });
                    // store.dispatch({
                    // type: SET_PAIRMENU_MODAL,
                    // payload: false
                    // });
                    /*if((this.props.isMarginPairs)){
                    this.props.dispatch({ type: CHANGE_PAIR_MARGIN, payload: item.id })

                    if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
                        this.props.navigation && this.props.navigation.navigate(TRADE_DETAIL)
                    }
                    } if (item.isSpotPair) {
                    this.props.dispatch({ type: CHANGE_PAIR, payload: item.id })

                    if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
                        this.props.navigation && this.props.navigation.navigate(TRADE_DETAIL)
                    }
                    } else*/ 
                    if (item.isDerivatePair) {
                        store.dispatch({ type: CHANGE_PAIR_FUTURE, payload: item.id })
                        if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
                            props.navigation && props.navigation.navigate(DERIVATIVES)
                        }
                    }
                    store.dispatch({
                    type: SET_DERIVATIVEPAIR_MODAL,
                    payload: false
                    });
                } catch (error) {
                        // console.log(error,'error');
                }
            }
    },100)
    }

    const tabRenderScene = ({ route }) => {
        switch (route.key) {
            case 'fav':
            return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs}   isDerivate={props.isMarginPairs ? false : true}  PairDataType='Favorites' navigation={props.navigation} />
            case 'usdt':
            return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs} isDerivate={props.isMarginPairs ? false : true} PairDataType='Usdt' navigation={props.navigation} />
            default:
            return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs} isDerivate={props.isMarginPairs ? false : true} PairDataType='Usdc' navigation={props.navigation} />
        }
    }


    const onModalShow = async () => {
        props.setDerivativePairModal(true);
        await sleep(500)
        inputRef?.current?.focus();
    }

    const onClose = () => {
        props.filterPair('')
        props.setDerivativePairModal(false);

    }


    return (
        <View>
            {!props.isNewDesign && <Pressable onPress={onModalShow} style={[styles.pairSelect, props.pairSelect]}>
                    <Text style={styles.pairSelectText} numberOfLines={1}>
                    { pairs.getPair(props.isMarginPairs ? props.selectedPairMargin : props.selectedPair)?.name}</Text>
                    <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/arrow-down-2.png')} />
            </Pressable>}
            {!props.isRate && props.isNewDesign && <Pressable onPress={onModalShow} style={[styles.pairSelect, props.pairSelect]}>
                <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/r.png')} />
                <Text style={styles.pairSelectText} numberOfLines={1}>
                    { pairs.getPair(props.isMarginPairs ? props.selectedPairMargin : props.selectedPair)?.name}</Text>
            </Pressable>}
            {(props.isRate && props.isNewDesign) && <Pressable onPress={onModalShow}>
                <View style={[styles.pairSelect, props.pairSelect]}>
                    <Text style={[styles.pairSelectText, {fontFamily: theme.fonts.geomanistMedium}]} numberOfLines={1}>
                        {!props.isMarginPairs ? pairs.getPair(props.selectedPair)?.name : pairs.getPair(props.selectedPairMargin)?.name}</Text>
                    <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/arrow-down-2.png')} />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <PairRate selectedPair={props.selectedPair} />
                    <PriceChange hideUpDownArrow={true} pchangeTextStyle={{fontSize: fontSizes(14)}} selectedPair={props.selectedPair} />
                </View>
            </Pressable>}
            <Modal
                animationType="fade"
                transparent={false}
                visible={props.derivativeMV}
                onRequestClose={onClose}
            >
                <View style={{ flex: 1 }}>
                        <ToastNotification />    
                        {/* <View style={styles.head}>
                            <View style={styles.headView}>
                                <Text style={styles.headTxt}>{__('der')}</Text>
                                <Pressable style={styles.closeIcon} onPress={onClose}>
                                    <Ionicons name="close-sharp" size={fontsSize.f24} 
                                    color={theme.colors._text.darkest} />
                                </Pressable>

                            </View>
                            <Search newIcon formGroupStyle={{marginVertical: 16}} inputRef={inputRef} placeholder={__('search')} value={props.value} onChangeText={props.filterPair} />
                        </View> */}
                       <View style={styles.content}>
                            <StatusBar backgroundColor={theme.colors._neutral.lightest} />
                            <DefaultBackgorund imageStyle={{top:0}} />
                            <HeaderTopWrap>
                                <HeaderLeft>
                                <NormalBackButton goBack={onClose} />
                                </HeaderLeft>
                                <HeaderCenter>
                                    <PageTitle>{__('der')}</PageTitle>
                                </HeaderCenter>
                            </HeaderTopWrap>
                            {/* <Search newIcon formControlWrap={styles.searchFcWrap} placeholderTextColor={theme.colors._text.default} value={this.props.value} placeholder={__('search')} onChangeText={this.props.filterPair} /> */}
                            <Search newIcon formGroupStyle={{marginTop: HeightToDp(40),marginBottom: HeightToDp(20)}} inputRef={inputRef} placeholder={__('search')} value={props.value} onChangeText={props.filterPair} />
                        </View>
                        <View style={styles.tabsWrap}>
                            <DefaultTabView ref={ref => tabRef = ref} tabBarWrap={{marginBottom:HeightToDp(32),marginLeft:WidthToDp(40) }} tabSimple={true} initialLayout={WidthToDp(Dimensions.get('window').width - 52)} tabBarStyle={{backgroundColor: 'rgba(0,0,0,0)'}} tabRoutes={tabRoutes}  tabRenderScene={tabRenderScene} scrollEnabled={true}  />
                        </View>
                    </View> 
                 {/* </View> */}
                {/* </MainLayout> */}
            </Modal>
        </View>

    )
}


const mapStateToProps = (state: any) => {
    return {
        value: state.pairReducer.inputSearch,
        selectedPair: state.pairReducer.selectedPairFuture,
        selectedPairMargin: state.pairReducer.selectedPairMargin,

        // selectedPair: state.pairReducer.selectedPair,
        derivativeMV: state.pairReducer.derivativeMV
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        filterPair: (searchVal: any) => dispatch(filterPairs(searchVal)),
        setDerivativePairModal: (item: any) => dispatch(setDerivativePairModal(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PairDerivative)
