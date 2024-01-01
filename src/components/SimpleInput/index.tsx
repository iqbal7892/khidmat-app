import React, { Component } from 'react'
import { HeightToDp, WidthToDp, fontsSize, theme, StyleSheetManager } from '../../helpers/theme';
import { View, Text, StyleSheet, FlatList, Image, ViewStyle, TextStyle } from 'react-native'
import { BackButton, DefaultBackButton } from '../BackButton';
import { Background } from '../Background';
import Heading from '../Home/Heading';
import { Header, HeaderCenter, HeaderLeft, HeaderTopWrap, PageTitle } from '../../components/Header';

import { __ } from '../../helpers/common';
import OtpInputs from '../OtpInputs';
import CustomButton from '../Button';
// import { OtpInputs } from '../../OtpInputs';

interface Props {
    label? : any,
    image? :any,
    value? :any,
    inputWrapStyle?: ViewStyle | ViewStyle[],
    inputTxtStyle?: TextStyle | TextStyle[],
}

interface State {

}

class SimpleInput extends Component<Props, State> {
    private navigation;
    constructor(props: any) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation;
        this.state = {

        }
    }
    render() {
        return (
            <View>
                <Text style={styles.lableTxt}>
                    {__(this.props.label)}
                </Text>
                <View style={[styles.mainbg, this.props.inputWrapStyle]}>
                    <Text style={[styles.inputTxt, this.props.inputTxtStyle]}>
                        {this.props.value}
                    </Text>
                    <Image style={styles.copyimg} source={this.props.image} />
                </View>
            </View>
        )
    }
}
export default SimpleInput;
const styles = StyleSheetManager.Create({
    copyimg: {
        width: WidthToDp(22),
        height: HeightToDp(22),
    },
    lableTxt: {
        color: theme.colors._text.color3,
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 19.6,
        paddingBottom: 8
    },
    mainbg:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: theme.colors._neutral.lightest,
        paddingRight: 14,
        paddingLeft: 16,
        paddingVertical: 16,
        height: 48,
        borderWidth: 1.5,
        borderColor: theme.colors._border.lightest,
    },
    inputTxt: {
        color: theme.colors._text.color3,
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.geomanistRegular,
        lineHeight: 16.24
    }
})

