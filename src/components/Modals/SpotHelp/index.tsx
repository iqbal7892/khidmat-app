import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions, Pressable, ScrollView } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme';
import { __ } from '../../../helpers/common';

interface Props {
    onClose: () => void,
    helparr: any,
    title: string
}
interface State {


}

const deviceHight = Dimensions.get("window").height
class SpotHelp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <ScrollView>
                            <View style={styles.textpadd}>
                                <Text style={styles.textsett}>
                                    {__(this.props.title)}
                                </Text>
                                <Pressable onPress={this.props.onClose}>
                                    <Image style={styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                                </Pressable>
                            </View>
                            {this.props.helparr.map((v: any,i: React.Key) =>
                                <View style={styles.pd24} key = {v.description}>
                                    {v.heading && <Text style={styles.heading2}>{__(v.heading)}</Text>}
                                    <Text style={styles.para12px}>{__(v.description)}</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </>
        )
    }

}
export default SpotHelp;

const styles = StyleSheetManager.Create({
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 32,
        borderRadius: 20,
        // borderWidth : 1,

    },
    noticepadd: {
        paddingHorizontal: 24,
        // maxHeight: deviceHight * 1,
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingBottom: HeightToDp(48),
        paddingTop: WidthToDp(48)
    },
    textpadd: {
        paddingHorizontal: 24,
        // paddingBottom: 16,
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
        paddingBottom: 12,
        paddingTop: 24
    },
    para12px: {
        fontFamily: theme.fonts.sfProTextRegular,
        fontSize: fontSizes(12),
        color: theme.colors._text.lightest
    },
    pd24: {
        paddingHorizontal: 24
    },
    pd32: {
        paddingBottom: 32,
        paddingTop: 24
    },
    pb8: {
        paddingBottom: 8
    }

})