import React, { Component, useRef } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes } from '../../../helpers/theme';
import { __ } from '../../../helpers/common';

interface Props {
    chainInfo?: any,
    selectedChain?: any
    onSelect?: any,
    onClose?: any
}
interface State {


}

const deviceHight = Dimensions.get("window").height
class ChainNetwork extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    onItemChange = (item: any) => {
        this.props.onSelect(item)
    }
    close = () => {
        this.props.onClose()
    }
    render(): React.ReactNode {
        // console.log(this.props.chainInfo,this.props.selectedChain);
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.textpadd}>
                            <Text style={styles.textsett}>
                                {__('s_select_network_chain')}
                            </Text>
                            <Pressable onPress={this.close}>
                                <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                            </Pressable>
                        </View>
                        <View style={styles.pd24}>
                            {this.props.chainInfo?.map((item: any, i: number) => (
                                <Pressable key={i} style={styles.itemContainer}
                                    onPress={() => this.onItemChange(item)}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.textsett}>{item.chainName}</Text>
                                    </View>
                                    {item?.chainId === this.props.selectedChain?.chainId && <Image style={{ width: WidthToDp(18), height: HeightToDp(18) }} source={require("../../../assets/images/icons/select-tick.png")} />}
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
            </>
        )
    }

}
export default ChainNetwork;

const styles = StyleSheet.create({
    pd24: {
        paddingHorizontal: 24
    },
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 300
    },
    noticepadd: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    textpadd: {
        paddingHorizontal: 24,
        paddingBottom: 16,
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textsett: {
        fontFamily: theme.fonts.euclidCircularARegular,
        fontSize: fontSizes(15),
        color: theme.colors._text.darkest,
    },

    imgsetting: {
        height: WidthToDp(32),
        width: WidthToDp(32)
    },
    heading2: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(14),
        color: theme.colors._text.darkest,
        paddingBottom: 12
    },
    mainWrapper: {
        paddingHorizontal: WidthToDp(18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: WidthToDp(12)
    },
    txtmain: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextMedium,
        color: theme.colors._text.dark
    },
    dflex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pv24: {
    },
    itemContainer: {
        paddingTop: WidthToDp(5),
        paddingBottom: WidthToDp(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },

})