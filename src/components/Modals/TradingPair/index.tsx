import React, { useEffect, useRef, useState } from "react";
import { Text, View, Pressable, Image, ViewStyle, StatusBar, Modal } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { fontsSize, fontSizes, theme, WidthToDp, StyleSheetManager } from "../../../helpers/theme";
import Search from "../../Search";
import PairMenuItems from '../../../components/Trade/PairsMenu';
import CustomTabView from "../../TabView";
import { filterPairs, setPairMenuModal } from "../../../redux/actions/pair";
import { connect } from "react-redux";
import styles from "./styles";
import { Pairs } from "../../../models/market";
import { __, sleep } from "../../../helpers/common";
import ToastNotification from "../../Notification";
import { AppSettings } from "../../../config/config";

interface Props {
    setPairMenuModal?: any,
    isSearchIcon?: boolean,
    iconType?: string,
    pairSelect?: ViewStyle | ViewStyle[],
    modalVisible?: boolean,
    selectedPair?: any,
    value?: string,
    filterPair?: any,
    navigation?: any
}


const TradingPair = (props: Props) => {
    const pairs = Pairs.getInstance();
    let inputRef: any = useRef();

    const tabRoutes = [
        { key: 'usdt', title: 'USDT' },
        { key: 'btc', title: 'BTC' },
        // { key: 'usdc', title: 'USDC' }
    ]

    const tabRenderScene = ({ route }) => {
        switch (route.key) {
            case 'btc':
            return <PairMenuItems PairDataType='Btc' navigation={props.navigation} />
            case 'usdt':
            return <PairMenuItems PairDataType='Usdt' navigation={props.navigation} />
            default:
            return <PairMenuItems PairDataType='Usdt' navigation={props.navigation} />
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


    return (
        <View>
            <Pressable onPress={onModalShow} style={[styles.pairSelect, props.pairSelect]}>
                <Image style={styles.pairSelectIcon} source={{ uri: AppSettings.cdnEndPoint + "assets/images/coins/bitcoin.webp"}} />
                <View>
                    <Text style={styles.pairSelectText} numberOfLines={1}>{pairs.getPair(props.selectedPair)?.name}</Text>
                    <Text style={styles.pairSelectTextMute}>{__('spot')}</Text>
                </View>
            </Pressable>
            <Modal
                animationType="fade"
                transparent={false}
                visible={props.modalVisible}
                onRequestClose={onClose}
            >
                <StatusBar
                        animated={true}
                        backgroundColor={theme.colors._neutral.darkest50} />
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <ToastNotification />    
                        <View style={styles.head}>
                                <View style={styles.headView}>
                                    <Text style={styles.headTxt}>{__('select_trd_pairs')}</Text>
                                    <Pressable style={styles.closeIcon} onPress={onClose}>
                                        <Ionicons name="close-sharp" size={fontsSize.f24} color={theme.colors._text.darkest} />
                                    </Pressable>
                                </View>
                                <Search formGroupStyle={{marginVertical: 16}} inputRef={inputRef} placeholder={__('search')} value={props.value} onChangeText={props.filterPair} />
                            </View>
                        <View style={styles.walletitemHeight}>
                            <CustomTabView tabSimple={true} tabBarStyle={{backgroundColor: '#fff'}} tabRoutes={tabRoutes} tabBarWrap={{paddingHorizontal: WidthToDp(30)}}  tabRenderScene={tabRenderScene} />
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
        modalVisible: state.pairReducer.modalVisible
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        filterPair: (searchVal: any) => dispatch(filterPairs(searchVal)),
        setPairMenuModal: (item: any) => dispatch(setPairMenuModal(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingPair)
