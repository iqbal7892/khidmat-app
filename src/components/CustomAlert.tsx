import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { __ } from '../helpers/common';
import { HeightToDp, WidthToDp, fontSizes, theme } from '../helpers/theme';

type Props = {
    text?: string;
    children?: React.ReactNode
}

const CustomAlert = ({text, children}: Props) => {
  return (
    <View style={styles.alert}>
        <Image style={styles.alertIcon} source={require("../assets/images/icons/info-circle-2.png")} />
        <View style={styles.alertContent}>
            <Text style={styles.alertTxt}>
                {__(text)} 
                {children && children}
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    alert: {
        backgroundColor: theme.colors._warning.lightest,
        paddingVertical: HeightToDp(12),
        paddingLeft: WidthToDp(8),
        paddingRight: WidthToDp(8),
        borderRadius: 8,
        borderColor: theme.colors._warning.medium,
        borderWidth: 1,
        flexDirection: 'row',
        gap: WidthToDp(10)
    },
    alertIcon: {
       width: WidthToDp(24),
       height: WidthToDp(24),
       resizeMode: 'contain'
    },
    alertContent: {
        flex: 1
    },
    alertTxt: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.geomanistRegular,
        color: theme.colors._warning.medium,
        includeFontPadding: false,
        lineHeight: HeightToDp(20),
        flexWrap:"wrap"
    },
});

export default CustomAlert;