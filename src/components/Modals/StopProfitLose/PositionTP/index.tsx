import React, { Component } from "react";
import { Modal, Text, View, Pressable, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { HeightToDp, fontSizes, theme, WidthToDp, StyleSheetManager } from "../../../../helpers/theme";
// import styles from "../../../Header/styles";
import styles from './styles';
import Input from "../../../TextInput";
import OrderTypeModal from "../../../Trade/BuySell/OrderTypeModal";
import CustomButton, { ButtonVariation } from "../../../Button";
import { __ } from "../../../../helpers/common";

interface Props {
    toggleModal?: any,
    setOrderType?: any
}
interface State {
    modalVisible?: any,
}
class PositionTp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalVisible: true,
        }
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }
    render(): React.ReactNode {
        function cancelAllModal(arg0: boolean): void {
            throw new Error("Function not implemented.");
        }

        return (
            <>
                <View style={styles.modelbody}>
                    <View style={{ flex: 1 }}>
                        <View style={[styles.itemContainer]}>
                            <Text style={[styles.dLabel, { maxWidth: WidthToDp(90, true) }]} numberOfLines={1}>{__('Symbol')}</Text>
                            <Text style={[styles.mpair, { textAlign: 'right', color: theme.colors._success.default }]}>BTC/USTD {__('perpetual')} / {__('long')} 20x</Text>
                        </View>
                        <View style={[styles.itemContainer, { paddingTop: HeightToDp(7) }]}>
                            <Text style={[styles.dLabel, { maxWidth: WidthToDp(90, true) }]} numberOfLines={1}>{__('entry_price')}</Text>
                            <Text style={[styles.dValue, { textAlign: 'right' }]}>27952.70</Text>
                        </View>
                        <View style={[styles.itemContainer, { paddingVertical: HeightToDp(7) }]}>
                            <Text style={[styles.dLabel, { maxWidth: WidthToDp(90, true) }]} numberOfLines={1}>{__('mark_price')}</Text>
                            <Text style={[styles.dValue, { textAlign: 'right' }]}>27953.36</Text>
                        </View>
                        <View style={styles.line}></View>
                        <View style={[styles.flex, { paddingVertical: HeightToDp(7) }]}>
                            <View style={{ flex: 1, marginTop: HeightToDp(2), maxWidth: WidthToDp(70, true), marginRight: WidthToDp(5) }}>
                                <OrderTypeModal formGroupStyle={{ height: HeightToDp(42) }} orderType='Mark Price' setOrderType={this.props?.setOrderType} />
                            </View>
                            <View style={{ flex: 1, marginTop: HeightToDp(2), maxWidth: WidthToDp(30, true) }}>
                                <OrderTypeModal formGroupStyle={{ height: HeightToDp(42) }} orderType='Mark Price' setOrderType={this.props?.setOrderType} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.dLabel}>
                                {__('p_estimate_pnl')}
                            </Text>
                        </View>
                        <View style={[styles.flex, { paddingVertical: HeightToDp(7) }]}>
                            <View style={{ flex: 1, marginTop: HeightToDp(2), maxWidth: WidthToDp(70, true), marginRight: WidthToDp(5) }}>
                                <OrderTypeModal formGroupStyle={{ height: HeightToDp(42) }} orderType='Mark Price' setOrderType={this.props?.setOrderType} />
                            </View>
                            <View style={{ flex: 1, marginTop: HeightToDp(2), maxWidth: WidthToDp(30, true) }}>
                                <OrderTypeModal formGroupStyle={{ height: HeightToDp(42) }} orderType='Mark Price' setOrderType={this.props?.setOrderType} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.dLabel}>
                                {__('p_estimate_pnl')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.btnBottom}>
                        <CustomButton variation={ButtonVariation.primary} 
                        titleStyle={styles.mtitleStyle} style={styles.mbuttons} 
                        title="Confirm" onPress={() => cancelAllModal(false)} 
                        color="bglight"></CustomButton>
                    </View>
                </View>
            </>
        )
    }
}
export default PositionTp;
