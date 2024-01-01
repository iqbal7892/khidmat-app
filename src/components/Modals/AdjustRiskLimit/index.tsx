import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme';
import { __ } from '../../../helpers/common';

interface Props {
    onClose: () => void

}
interface State {
    modalVisible?: any,
    isActive: any

}
const deviceHight = Dimensions.get("window").height
class AdjustRisk extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.toggleActive = this.toggleActive.bind(this);
    }

    data = [
        {
            risklimit: 2000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
        {
            risklimit: 4000000,
            margin: 0.5,
            intialmargin: 1.0
        },
    ];
    toggleActive() {
        this.setState({
          isActive: !this.state.isActive
        });
      }

    render(): React.ReactNode {
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.textpadd}>
                            <Text style={styles.textsett}>
                                {__('adjust_risk_limit')}
                            </Text>
                            <Pressable onPress={this.props.onClose}>
                                <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                            </Pressable>
                        </View>
                        <View style={[styles.pd24, styles.dflex]}>
                            <Text style={styles.para12px}>{__('riks_limit')} ( USDT)</Text>
                            <Text style={styles.para12px}>{__('maintenance_margin')}</Text>
                            <Text style={styles.para12px}>{__('initial_margin')}</Text>
                        </View>
                        <View style={[styles.pd24, styles.pd32]}>
                            {this.data.map((v: any, i: any) => (
                                <TouchableOpacity onPress={this.toggleActive}>
                                    <View style={[this.state.isActive ? styles.active : styles.inactive,styles.dflex]} key={i}>
                                        <Text style={styles.para14px}>{v.risklimit}</Text>
                                        <Text style={[styles.para14px, styles.TxtRight]}>{v.margin}%</Text>
                                        <Text style={[styles.para14px, styles.pb8, styles.TxtCenter]}>{v.intialmargin}%</Text>
                                    </View>

                                </TouchableOpacity>

                            ))}
                        </View>

                    </View>
                </View>
            </>
        )
    }

}
export default AdjustRisk;

const styles = StyleSheetManager.Create({
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
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
        fontFamily: theme.fonts.sfProTextSemibold,
        fontSize: fontSizes(15),
        color: theme.colors._text.darkest,
        letterSpacing: -0.1,
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
    para12px: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(12),
        color: theme.colors._text.lightest
    },
    pd32: {
        paddingBottom: 24,
        paddingTop: 12
    },
    pb8: {
        paddingBottom: WidthToDp(6)
    },
    pd24: {
        paddingHorizontal: WidthToDp(24)
    },
    dflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    para14px: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(14),
        color: theme.colors._text.darkest
    },
    TxtRight: {
        textAlign: 'right'
    },
    TxtCenter: {
        textAlign: 'center'
    },
    active: {
        backgroundColor: 'rgba(0, 38, 230, 0.1)'
    },
    inactive: {
        backgroundColor: 'white'
    }

})