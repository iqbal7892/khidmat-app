import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes } from '../../../helpers/theme';
import CustomButton from '../../Button';
import { __ } from '../../../helpers/common';
import { WELCOME_DERIVATIVE } from '../../../navigation/routeNames';
import { disptachDerQuizAlert } from '../../../redux/dispatch';

interface Props {
    navigation?: any
    selectedCurrency?: any
    selectedChain?: any;
    closeModal?: any;
    modalvisible?: boolean;
    isGoBack?: boolean;
}
interface State {
    modalvisible?: boolean

}

class DerivativesAlert extends Component<Props, State> {
    private navigation;
    constructor(props: Props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation;
        this.state = {
            modalvisible: false
        }

    }
    acceptTerms = async () => {
        this.closeModal();
        disptachDerQuizAlert(false)
        this.navigation.navigate(WELCOME_DERIVATIVE)
    }
    closeModal = () => {

        disptachDerQuizAlert(false)

        if(this.props.isGoBack)
        this.navigation.goBack()
    }


    render(): React.ReactNode {
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        {/* <View style={styles.crossimgsett}>
                            <Pressable onPress={this.closeModal}>
                                <Image style={styles.crossimg} source={require('../../../assets/images/icons/crosscircle.png')} />
                            </Pressable>
                        </View> */}
                        <View style={styles.crossimgsett1}>
                            <Image style={styles.alertimg} source={require('../../../assets/images/icons/derivativeAlert.png')} />
                        </View>
                        {/* <ScrollView> */}
                            <View style={styles.pd24}>
                                <View style={styles.txt1set}>
                                    <Text style={styles.txt1}>{__('attention')}</Text>
                                </View>
                                <View style={styles.pt16}>
                                    <View style={styles.dflex}>
                                        <Text style={styles.txtcircle}>{'\u2022'}</Text>
                                        <Text style={styles.txt2}>{__('p_before_begin_trading')}</Text>
                                    </View>
                                    <View style={styles.pt16}>
                                        <CustomButton onPress={this.acceptTerms}
                                            style={{ borderRadius: 4 }}
                                            title="start_now" color="bglight"></CustomButton>
                                    </View>
                                </View>
                            </View>
                        {/* </ScrollView> */}

                    </View>
                </View>
            </>
        )
    }

}
export default DerivativesAlert;

const styles = StyleSheet.create({
    noticemain: {
        paddingTop: HeightToDp(28),
        paddingBottom: HeightToDp(40),
        minHeight: HeightToDp(426)
    },
    noticepadd: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    alertimg: {
        width: WidthToDp(132),
        height: HeightToDp(120)
    },
    crossimg: {
        width: WidthToDp(40),
        height: HeightToDp(40)
    },
    crossimgsett: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: WidthToDp(24)
    },
    crossimgsett1: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: WidthToDp(24),
        paddingTop: 5
    },
    pd24: {
        paddingHorizontal: WidthToDp(24)
    },
    txt1set: {
        paddingTop: HeightToDp(32),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt1: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistMedium,
        lineHeight: 22.4
    },
    dflex: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    txt2: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6,
        paddingBottom: HeightToDp(16),
        marginLeft: 8
    },
    txt3: {
        color: theme.colors._primary.darkest,
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6,
    },
    txtcircle: {
        fontSize: fontSizes(16)
    },
    pt16: {
        paddingTop: HeightToDp(16),
        // paddingBottom: HeightToDp(10)
    }


})