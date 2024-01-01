import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, View, Pressable, Image, BackHandler } from "react-native";
import { connect } from "react-redux";
import { Pairs } from "../../../models/market";
import { OrderBookManager } from "../../../services/orderbookmanager";
import styles from "./styles";
import { __ } from "../../../helpers/common";
import { WidthToDp } from "../../../helpers/theme";
import { store } from "../../../redux/Store";
import CustomBottomSheet from "../BottomSheet";

type Props = {
    pair?: any;
    onDecimalChange?: (item:number) => void;
    largeSize?: boolean;
}

const PairPrecision = ({ pair, onDecimalChange, largeSize }: Props) => {
    let bottomSheefRef = null;
    // const setRateGroup = () => {
    //     let precision = [];
    //     const max = pair.marketPrecision;
    //     const min = pair.marketPrecision > 3 ? pair.marketPrecision - 3 : 0;
    //     for (let i = min; i <= max; i++) {
    //         if (!(precision.indexOf(i) > -1)) {
    //             precision.push(i);
    //         }
    //     }
    //     return precision;
    // }
    const setRateGroup = () => {
        let price = store.getState().pairReducer.pairs[pair.id].rate
        // return calculateSteps(price, pair.marketPrecision);
        let bigDecimals = []
        if(price > 1000) {
            bigDecimals = [100, 50, 10];
        }
        let precision = [];
        const max = pair.marketPrecision;
        const min = pair.marketPrecision > 3 ? pair.marketPrecision - 3 : 0;
        for (let i = min; i <= max; i++) {
            if (!(precision.indexOf(i) > -1)) {
                precision.push(i);
            }
        }
        return [...bigDecimals, ...precision];
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [rateGroups, setRateGroups] = useState(setRateGroup());
    const [selectedGroup, setSelectedGroup] = useState(rateGroups[rateGroups.length - 1]);

    let backHandler = null;
    // let rateGroups = [...Array(pair.basePrecision + 1).keys()].splice(-4);
    const selectPrecision = (item: number) => {
        onDecimalChange(item);
        setSelectedGroup(item);
        setModalVisible(!modalVisible)
        bottomSheefRef?.dismiss();
    }
    const showModal = () => {
        setModalVisible(true)
        bottomSheefRef?.present();
    }

    const hideModal = () => {
        setModalVisible(false)
        bottomSheefRef?.dismiss();
    }

    useEffect(() => {
        setRateGroups(setRateGroup());
    }, [pair.id]);

    useEffect(() => {
        setSelectedGroup(rateGroups[rateGroups.length - 1]);
    }, [rateGroups]);
    const handleBack = () => {
        if (bottomSheefRef && modalVisible) {
            bottomSheefRef.dismiss();
            return true;
        }
        return false;
    };
    // 


    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
        return () => {
            backHandler.remove()
        }
    });
    return (
        <React.Fragment>
            {!largeSize && <Pressable style={styles.btn} onPress={showModal}>
                <Text style={{marginRight: WidthToDp(2)}}>{selectedGroup}</Text>
                <Entypo name="chevron-small-down" size={24} color="black" />
            </Pressable>}
            {largeSize && <Pressable style={styles.btnLarge} onPress={showModal}>
                <Text style={styles.btnLargeTxt}>{selectedGroup}</Text>
                <Entypo name="chevron-small-down" size={24} color="black" />
            </Pressable>}
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            {rateGroups.map((item: number) => (
                                <Pressable key={item} onPress={() => selectPrecision(item)} style={styles.item}>
                                    <Text style={styles.itemTxt}>{item}</Text>
                                    {item === selectedGroup && <Image source={require('../../../assets/images/icons/tick-circle.png')} style={styles.itemIcon} />}
                                </Pressable>
                            ))}

                            <Pressable style={styles.closeBtn} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.closeBtnText}>{__('cancel')}</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal> */}
            <CustomBottomSheet portal={true} enableDynamicSizing={true} ref={ref => bottomSheefRef = ref}>
                <View style={styles.modalContent}>
                    {rateGroups.map((item: number) => (
                        <Pressable key={item} onPress={() => selectPrecision(item)} style={styles.item}>
                            <Text style={styles.itemTxt}>{item}</Text>
                            {item === selectedGroup && <Image source={require('../../../assets/images/icons/tick-circle.png')} style={styles.itemIcon} />}
                        </Pressable>
                    ))}

                    <Pressable style={styles.closeBtn} onPress={hideModal}>
                        <Text style={styles.closeBtnText}>{__('cancel')}</Text>
                    </Pressable>
                </View>
            </CustomBottomSheet>
        </React.Fragment>
    )
}


export default React.memo(PairPrecision)

