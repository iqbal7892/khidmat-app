import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Text, View, Pressable, Image, BackHandler } from "react-native";
import { theme, StyleSheetManager } from "../../../helpers/theme";
import styles from "./styles";
import { __ } from "../../../helpers/common";
import CustomBottomSheet from "../BottomSheet";


const OrderBookMode = React.forwardRef(({ orderBookMode }: any, ref) => {
    let bottomSheefRef = null;
    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    let backHandler = null;

    const [selected, selectedMode] = useState<any>(
        {
            title: 'default',
            icon: require('../../../assets/images/icons/odb-default.png'),
            type: 0
        }
    );
    const odbMode = [
        {
            title: 'default',
            icon: require('../../../assets/images/icons/odb-default.png'),
            type: 0
        },
        {
            title: 'bid',
            icon: require('../../../assets/images/icons/odb-bid.png'),
            type: 2
        },
        {
            title: 'ask',
            icon: require('../../../assets/images/icons/odb-ask.png'),
            type: 1
        }
    ]
    const selectMode = (item: any) => {
        orderBookMode(item.type)
        selectedMode(item);
        hideModal();
    }
    // const toggleModal = () => {
    //     setModalVisible(!modalVisible)
    // }

    const showModal = () => {
        setVisible(true)
        bottomSheefRef?.present();
    }

    const hideModal = () => {
        setVisible(false)
        bottomSheefRef?.dismiss();
    }

    useImperativeHandle(ref, () => ({
        selectMode
    }));
    const handleBack = () => {
        if (bottomSheefRef && visible) {
            bottomSheefRef.dismiss();
            return true;
        }
        return false;
    };


    useEffect(() => {
        backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
        return () => {
            backHandler.remove()
        }
    })
    return (
        <React.Fragment>
            <Pressable style={[styles.btn]} onPress={showModal}>
                <Image source={selected.icon} style={styles.btnIcon} />
            </Pressable>
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
                            <Text style={styles.title}>{__('order_book_display')}</Text>
                            {odbMode.map((item:any) => (
                                <Pressable key={item.title} onPress={() => selectMode(item)} style={styles.item}>
                                    <View style={styles.itemLeft}>
                                        <Image source={item.icon} style={[styles.itemIcon, styles.itemModeIcon]} />
                                        <Text style={[styles.itemTxt, {color: selected.type === item.type ? theme.colors._primary.darkest : theme.colors._text.darkest}]}>{__(item.title)}</Text>
                                    </View>
                                    {item.type === selected.type && <Image source={require('../../../assets/images/icons/check-mark.png')} style={styles.itemIcon} />}
                                </Pressable>
                            ))}
                            <Pressable style={styles.closeBtn} onPress={toggleModal}>
                                <Text style={styles.closeBtnText}>{__('cancel')}</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                </View>
            </Modal> */}
            <CustomBottomSheet portal={true} enableDynamicSizing={true} ref={ref => bottomSheefRef = ref}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>{__('order_book_display')}</Text>
                    {odbMode.map((item: any) => (
                        <Pressable key={item.title} onPress={() => selectMode(item)} style={styles.item}>
                            <View style={styles.itemLeft}>
                                <Image source={item.icon} style={[styles.itemIcon, styles.itemModeIcon]} />
                                <Text style={[styles.itemTxt, { color: selected.type === item.type ? theme.colors._primary.darkest : theme.colors._text.darkest }]}>{__(item.title)}</Text>
                            </View>
                            {item.type === selected.type && <Image source={require('../../../assets/images/icons/check-mark.png')} style={styles.itemIcon} />}
                        </Pressable>
                    ))}
                    <Pressable style={styles.closeBtn} onPress={hideModal}>
                        <Text style={styles.closeBtnText}>{__('cancel')}</Text>
                    </Pressable>
                </View>
            </CustomBottomSheet>
        </React.Fragment>
    )
})


export default React.memo(OrderBookMode)

