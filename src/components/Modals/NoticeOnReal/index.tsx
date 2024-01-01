import React, { Component, useRef } from 'react'
import { View, Text, Image, StatusBar, ActivityIndicator, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme';
import { __ } from '../../../helpers/common';

interface Props {
    onClose : () => void

}
interface State {
    modalVisible? : any 

}
const deviceHight = Dimensions.get("window").height
class NoticeReal extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.textpadd}>
                            <Text style={styles.textsett}>
                                {__('p_delay_update_data')}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.props.onClose} style={styles.lightgraybtn}>
                                <Text style = {styles.btntext}>{__('confirm')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>
        )
    }

}
export default NoticeReal;

const styles = StyleSheetManager.Create({
    noticemain: {
        backgroundColor: 'white',
        paddingTop: 28,
        paddingBottom: 12,
        borderRadius: 20,
        // borderWidth : 1,

    },
    noticepadd: {
        paddingHorizontal: 24,
        maxHeight : deviceHight * 1,
        display : 'flex',
        flex : 1 ,
        justifyContent : 'flex-end',
        backgroundColor : 'rgba(0, 0, 0, 0.7)',
        paddingBottom : HeightToDp(48)
        

    },
    textpadd: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    textsett: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(12),
        textAlign: 'center',
        color: theme.colors._text.darkest,
        letterSpacing: -0.1,
    },
    lightgraybtn : {
        backgroundColor : theme.colors._neutral.extralight,
        paddingVertical :10,
    },
    btntext : {
       fontFamily : theme.fonts.sfProTextRegular,
       fontSize : WidthToDp(14),
       textAlign : 'center',
       color : theme.colors._text.lightest,
    },

})