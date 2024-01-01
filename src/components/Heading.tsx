import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { theme, fontsSize, fontSizes, HeightToDp, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import { __ } from '../helpers/common';

interface Props {
    text?: string;
    subText?: string,
    txtStyle?: TextStyle | TextStyle[],
    subTxtStyle?: TextStyle | TextStyle[]
}

export default function Heading(props: Props) {
    return (
        <View style={styles.view}>
            <Text style={[styles.txt, props.txtStyle]}>{__(props.text)}</Text>
            {props.subText &&<Text style={[styles.txt, styles.subTxt, props.subTxtStyle]}>{__(props.subText)}</Text>}
        </View>
    );
}

const styles = StyleSheetManager.Create({
    view: {
        marginBottom: HeightToDp(32)
    },
    txt: {
        fontSize: fontSizes(32),
        fontFamily: theme.fonts.euclidCircularASemiBold,
        lineHeight: 40,
        color: theme.colors._text.dark
    },
    subTxt: {
        color: theme.colors.primary
    }

});
