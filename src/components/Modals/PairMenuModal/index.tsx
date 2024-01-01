import React, { useEffect, useRef, useState } from "react";
import { Text, View, Pressable, Image, ViewStyle, StatusBar, Modal, Dimensions } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../../../helpers/theme";
import Search from "../../Search";
import CustomTabView from "../../TabView";
import { filterPairs, setPairMenuModal } from "../../../redux/actions/pair";
import { connect } from "react-redux";
import styles from "./styles";
import { Pair, Pairs } from "../../../models/market";
import { __, sleep } from "../../../helpers/common";
import ToastNotification from "../../Notification";
import PairItems from "./PairItem";
import { CHANGE_PAIR, CHANGE_PAIR_MARGIN, SET_DERIVATIVEPAIR_MODAL, SET_PAIRMENU_MODAL } from "../../../redux/actions/types";
import { HOME, MARKET, TRADE_DETAIL } from "../../../navigation/routeNames";
import { store } from "../../../redux/Store";
import DefaultTabView from "../../DefaultTabView";
import { DefaultBackgorund } from "../../Background";
import { HeaderCenter, HeaderLeft, HeaderTopWrap, PageTitle } from "../../Header";
import { CustomBackButton, NormalBackButton } from "../../BackButton";
import { IActiveTabs } from "../../../helpers/interfaces";
import PriceChange from "../../../screens/Trade/PriceChange";
import PairRate from "../../../screens/Trade/PairRate";

interface Props {
    setPairMenuModal?: any,
    isSearchIcon?: boolean,
    iconType?: string,
    pairSelect?: ViewStyle | ViewStyle[],
    modalVisible?: boolean,
    selectedPair?: any,
    value?: string,
    filterPair?: any,
    navigation?: any,
    isMarginPairs?: boolean,
    selectedPairMargin?: number,
    currentTab?: any
    activeTab: IActiveTabs,
    marginOrderType?: number,
    isRate?: boolean
    isNewDesign?: boolean
}

const PairMenuModal = (props: Props) => {
    // console.log(props)
    const pairs = Pairs.getInstance();
    const [selectedTab, setSelectedTab] = useState(0)
    let tabRef: any = useRef()
    let inputRef: any = useRef();
    // console.log(props.isMarginPairs);
    const tabRoutes = [
        { key: 'fav', title: 'Favorites' },
        { key: 'btc', title: 'BTC' },
        { key: 'usdt', title: 'USDT' },
        // { key: 'usdc', title: 'USDC' }
    ]
    const goToTrades = (item: Pair) => {
        // if(!item.rate){
        //   Notification.show('Can not change pair', NotificationType.Danger, NotificationPosition.Top)
        //   return;
        // }
        setTimeout(() => {
            if (tabRef?.isClickActive()) {
                try {

                    const state = props.navigation.getState();
                    if (props.activeTab) {
                        // if (props.activeTab.isSpotTradingTab) {
                            if (props.currentTab.key=='tspot') {
                        store.dispatch({ type: CHANGE_PAIR, payload: item.id })
                        // } else if (props.activeTab.isMarginTradingTab) {
                        } else if (props.currentTab.key=='mtrading') {
                        store.dispatch({ type: CHANGE_PAIR_MARGIN, payload: item.id })
                        }

                    } else {


                        if (props.isMarginPairs) {
                            store.dispatch({ type: CHANGE_PAIR_MARGIN, payload: item.id })
                        } else {
                            store.dispatch({ type: CHANGE_PAIR, payload: item.id })
                        }
                    }
                    if (state.routeNames[state.index] === HOME || state.routeNames[state.index] === MARKET) {
                        props.navigation && props.navigation.navigate(TRADE_DETAIL)
                    }
                    store.dispatch({
                        type: SET_DERIVATIVEPAIR_MODAL,
                        payload: false
                    });
                    store.dispatch({
                        type: SET_PAIRMENU_MODAL,
                        payload: false
                    });
                } catch (error) {
                    // console.log(error,'error');
                }
            }
        }, 100)
    }
    const tabRenderScene = ({ route }) => {
        switch (route.key) {
                case 'btc':
                    // if(selectedTab===1)
                    return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs} PairDataType='Btc' navigation={props.navigation} />
                case 'usdt':
                    // if(selectedTab===2)
                    return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs} PairDataType='Usdt' navigation={props.navigation} />
                default:
                    // if(selectedTab===0)
                    return <PairItems changePair={goToTrades} isMarginPairs={props.isMarginPairs} PairDataType='Favorites' navigation={props.navigation} />
        }
    }


    const onModalShow = async () => {
        props.setPairMenuModal(true);
        await sleep(500)
        inputRef?.current?.focus();
    }

    const onClose = () => {
        props.filterPair('')
        props.setPairMenuModal(false);

    }

    const tabindex = async  (index: number) => {
        await setSelectedTab(index);
    }
    return (
        <View>
            {(!props.isRate && props.isNewDesign) && <Pressable onPress={onModalShow} style={[styles.pairSelect, props.pairSelect]}>
                <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/r.png')} />
                <Text style={styles.pairSelectText} numberOfLines={1}>
                    {!props.isMarginPairs ? pairs.getPair(props.selectedPair)?.name :
                        pairs.getPair(props.selectedPairMargin)?.name}</Text>
                    {props.isMarginPairs && <View style={styles.lvrgBadge}><Text style={styles.lvrgText}>{pairs.getPair(props.selectedPairMargin)?.margin[(props.marginOrderType!==undefined && props.marginOrderType==1?'isolatedLVG':'crossLVG')]}x</Text></View>}
            </Pressable>}
            {(props.isRate && props.isNewDesign) && <Pressable onPress={onModalShow}>
                <View style={[styles.pairSelect, props.pairSelect]}>
                    <Text style={[styles.pairSelectText, {fontFamily: theme.fonts.geomanistMedium}]} numberOfLines={1}>
                        {!props.isMarginPairs ? pairs.getPair(props.selectedPair)?.name : pairs.getPair(props.selectedPairMargin)?.name}</Text>
                    <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/arrow-down-2.png')} />
                    {/* {props.isMarginPairs && <View style={styles.lvrgBadge}><Text style={styles.lvrgText}>{pairs.getPair(props.selectedPairMargin)?.margin[(props.marginOrderType!==undefined && props.marginOrderType==1?'isolatedLVG':'crossLVG')]}x</Text></View>} */}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <PairRate selectedPair={props.isMarginPairs ? props.selectedPairMargin : props.selectedPair} />
                    <PriceChange hideUpDownArrow={true} pchangeTextStyle={{fontSize: fontSizes(14)}} selectedPair={props.isMarginPairs ? props.selectedPairMargin : props.selectedPair} />
                </View>
            </Pressable>}
            {(!props.isNewDesign) && <Pressable onPress={onModalShow} style={[styles.pairSelect, props.pairSelect]}>
                <Text style={styles.pairSelectText} numberOfLines={1}>
                    {!props.isMarginPairs ? pairs.getPair(props.selectedPair)?.name :
                        pairs.getPair(props.selectedPairMargin)?.name}</Text>
                <Image style={styles.pairSelectIcon} source={require('../../../assets/images/icons/arrow-down-2.png')} />
                {props.isMarginPairs && <View style={styles.lvrgBadge}><Text style={styles.lvrgText}>{pairs.getPair(props.selectedPairMargin)?.margin[(props.marginOrderType!==undefined && props.marginOrderType==1?'isolatedLVG':'crossLVG')]}x</Text></View>}
            </Pressable>}
            <Modal
                animationType="fade"
                transparent={false}
                visible={props.modalVisible}
                onRequestClose={onClose}
            >
                <View style={styles.centeredView}>
                    <View style={styles.content}>
                        <DefaultBackgorund imageStyle={{ top: StatusBar.currentHeight?0:theme.globalvalues.screenVerticalSpace }} />

                        <ToastNotification />
                        <View style={styles.head}>
                            {/* <View style={styles.headView}>
                                <Text style={styles.headTxt}>{__('spot')}</Text>
                                <Pressable style={styles.closeIcon} onPress={onClose}>
                                    <Ionicons name="close-sharp" size={fontsSize.f24} color={theme.colors._text.darkest} />
                                </Pressable>
                            </View> */}
                            <HeaderTopWrap>
                                <HeaderLeft>
                                    <NormalBackButton goBack={onClose} />
                                </HeaderLeft>
                                <HeaderCenter>
                                    <PageTitle>{props.activeTab.isMarginTradingTab ?__('margin'):__('spot')}</PageTitle>
                                </HeaderCenter>
                            </HeaderTopWrap>
                            <Search newIcon formGroupStyle={{ marginTop: HeightToDp(40), marginBottom: HeightToDp(30) }} inputRef={inputRef} placeholder={__('search')} value={props.value} onChangeText={props.filterPair} />
                        </View>
                        <View style={styles.tabsWrap}>
                            <DefaultTabView ref={ref => tabRef = ref} getTabIndex={(tab: any) => tabindex(tab)} tabBarWrap={{ paddingHorizontal: WidthToDp(10), marginBottom: HeightToDp(32) }} tabSimple={true} initialLayout={WidthToDp(Dimensions.get('window').width - 52)} tabBarStyle={{ backgroundColor: 'rgba(0,0,0,0)', marginHorizontal: WidthToDp(30) }} tabRoutes={tabRoutes} tabRenderScene={tabRenderScene} scrollEnabled={true} />
                            {/* <DefaultTabView ref={ref => tabRef = ref} tabBarWrap={{ paddingHorizontal: WidthToDp(8) }} tabSimple={true} initialLayout={WidthToDp(Dimensions.get('window').width - 52)} tabBarStyle={{ backgroundColor: theme.colors.white }} tabRoutes={tabRoutes} tabRenderScene={tabRenderScene} scrollEnabled={true} /> */}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}


const mapStateToProps = (state: any) => {
    return {
        value: state.pairReducer.inputSearch,
        selectedPair: state.pairReducer.selectedPair,
        selectedPairMargin: state.pairReducer.selectedPairMargin,
        modalVisible: state.pairReducer.modalVisible,
        activeTab: state.userDataReducer.activeTabs,

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        filterPair: (searchVal: any) => dispatch(filterPairs(searchVal)),
        setPairMenuModal: (item: any) => dispatch(setPairMenuModal(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PairMenuModal)
