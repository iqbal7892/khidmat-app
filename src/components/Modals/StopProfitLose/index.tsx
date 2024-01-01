import React, { Component } from "react";
import { Modal, Text, View, Pressable, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { HeightToDp, fontSizes, theme, WidthToDp } from "./../../../helpers/theme";
import styles from "./styles";
import CustomTabView from "./../../TabView";
import PositionTp from "./PositionTP";
import TpSl from "./TP/SL";
import { __ } from "../../../helpers/common";
// import IsoLeverage from "../../Trade/BuySell/IsolatedLeverage";
// import IsoLeverage from "../../IsolatedLeverage";




interface Props {
    orderType?: any,
    setOrderType?: any
}
interface State {
    modalVisible?: any,


}

class ProfitLose extends Component<Props, State> {
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


    isolated = () => <View><Text style={{ backgroundColor: 'red' }}>TP/SL</Text></View>
    cross = () => <PositionTp toggleModal={this.toggleModal} />


    tabRoutes = [
        { key: 'isolated', title: 'TP/SL' },
        { key: 'cross', title: 'Position TP/SL' },
    ]


    tabRenderScene = ({ route }) => {
        switch (route.key) {
            case 'isolated':
                return <TpSl toggleModal={this.toggleModal} />
            default:
                return <PositionTp toggleModal={this.toggleModal} />
        }
    }


    render(): React.ReactNode {
        return (
            <View style={{ zIndex: 2 }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({ modalVisible: true });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.custModal}>
                            <View style={styles.noticemain}>
                                <View style={styles.textpadd}>
                                    <Text style={styles.textsett}>
                                        {__('stop_profit_loss')}
                                    </Text>
                                    <Pressable style={styles.closeBtn} onPress={this.toggleModal}>
                                        <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                                    </Pressable>
                                    {/* <View style={styles.bodyContainer}>
                                    </View> */}
                                </View>
                                <View style={styles.bodyContainer}>
                                    <CustomTabView swipeEnabled={false} tabBarStyle={{ paddingVertical: WidthToDp(10), borderRadius: WidthToDp(8), backgroundColor: theme.colors._bg.darkest }} tabRoutes={this.tabRoutes} tabRenderScene={this.tabRenderScene}></CustomTabView>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
export default ProfitLose
