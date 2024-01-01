import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes, StyleSheetManager } from '../../helpers/theme';
import { __ } from '../../helpers/common';

const RepeatedAlert = (props) => {

    const closeModal = () => {
        props.closeModal()
    }

    return (
        <View style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                        {__('repeated_alerts')}
                    </Text>
                    <Pressable onPress={closeModal}>
                        <Image style={styles.closeIcon} source={require('../../assets/images/icons/close.png')} />
                    </Pressable>
                </View>
                <Text style={styles.para}>{__('p_recurring_reminder_al')}</Text>
            </View>
        </View>

    )
}
export default RepeatedAlert;

const styles = StyleSheetManager.Create({
    modal: {
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingBottom: HeightToDp(40),
        paddingTop: WidthToDp(40)
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        borderRadius: WidthToDp(20),
        paddingHorizontal: WidthToDp(theme.globalvalues.screenHorizontalSpace),
        paddingVertical: HeightToDp(32)
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: HeightToDp(16)
    },
    modalTitle: {
        fontSize: fontSizes(15),
        fontFamily: theme.fonts.sfProTextSemibold,
        color: theme.colors._text.darkest
    },
    closeIcon: {
        height: WidthToDp(32),
        width: WidthToDp(32)
    },
    para: {
        fontFamily: theme.fonts.sfProTextRegular,
        fontSize: fontSizes(12),
        color: theme.colors._text.lightest,
        lineHeight: HeightToDp(20),
        letterSpacing: -0.2,
    }
})