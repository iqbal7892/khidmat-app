import React, { Component } from 'react'
import { Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../../helpers/theme'
import { View } from '../../Themed'
import { __ } from '../../../helpers/common'


interface Props {
    onClose: () => void
}

interface State {

}

class TermsCondition extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

    }

    render() {
        return (
            
                <View style={styles.pd24}>
                    
                    <View style={styles.mainbg}>
                        
                            <Pressable onPress={this.props.onClose} style={styles.posrealative}>
                                <Image style = {styles.imgsetting} source={require('../../../assets/images/icons/close.png')} />
                            </Pressable>
                            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                            <Text style={styles.heading}>{__('cond_of_services')}</Text>
                            <Text style={styles.heading2}>Lorem ipsum dolor sit amet consectetur. Ac quis ac vulputate.</Text>
                            <Text style={styles.para}>Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin. Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin.</Text>
                            <Text style={styles.para}>Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin. Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin.</Text>
                            <Text style={styles.heading2}>Lorem ipsum dolor sit amet consectetur. Ac quis ac vulputate.</Text>
                            <Text style={styles.para}>Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin. Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin.</Text>
                            <Text style={[styles.para, styles.para1]}>Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin. Lorem ipsum dolor sit amet consectetur. Blandit eget cras rutrum cras lectus sit ipsum. Ante morbi sed tempus risus id ut. Ac nisl viverra eu id dictum. Quam ultrices eget ut bibendum proin.</Text>
                            </ScrollView>
                    </View>
                </View>
            
        )

    }
}

export default TermsCondition


const styles = StyleSheetManager.Create({
    mainbg: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 24,
        borderRadius: 30,
        paddingVertical: HeightToDp(16),
        flex: 1
    },
    pd24: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: theme.globalvalues.containerVerticalSpace,
        backgroundColor: 'rgba(0,0,0,0.7)',
        
    },
    heading: {
        fontFamily: theme.fonts.sfProTextSemibold,
        fontSize: fontSizes(24),
        // lineHeight : HeightToDp(24),
        color: theme.colors.h000E54,
        paddingBottom: 15
    },
    heading2: {
        fontFamily: theme.fonts.sfProTextMedium,
        fontSize: fontSizes(16),
        color: theme.colors.textDark,
        paddingBottom: 15
    },
    para: {
        fontFamily: theme.fonts.sfProTextRegular,
        fontSize: fontSizes(14),
        color: theme.colors.text,
        paddingBottom: 10
    },
    para1: {
        color: theme.colors.h4766FF
    },
    imgsetting : {
        height : WidthToDp(32),
        width :  WidthToDp(32)
    },
    posrealative : {
        backgroundColor: theme.colors._neutral.lightest,
        alignItems: 'flex-end'
    }
})