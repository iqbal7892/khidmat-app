import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Text, View, Pressable, StyleSheet } from "react-native";
import { HeightToDp, WidthToDp, theme, fontSizes, StyleSheetManager } from "../../helpers/theme";
import { __ } from "../../helpers/common";


const Generic = (props) => {
    const [data, setData] = useState(props.data);

    const selectItem = (item: any) => {
        props.onSelectItem(item)
    }
    // console.log(data)
  return (
        <React.Fragment>
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    {data.map((item: any) => (
                        <Pressable key={item.key} onPress={() => selectItem(item)} style={styles.item}>
                            <Text style={styles.itemTxt}>{__(item.key.toLowerCase())}</Text>
                        </Pressable>
                    ))}
                    <Pressable style={styles.closeBtn} onPress={props.onClose}>
                        <Text style={styles.closeBtnText}>{__('cancel')}</Text>
                    </Pressable>
                </View>
            </View>
        </React.Fragment>
    )
}


export default Generic

const styles = StyleSheetManager.Create({
    modal: {
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        paddingBottom: HeightToDp(40),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: WidthToDp(20),
        paddingTop: HeightToDp(8),
        paddingBottom: HeightToDp(8),
    },
    title: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.lightest,
        textAlign: 'center'
    },
    item: {
        height: WidthToDp(60),
        justifyContent: 'center'
    },
    itemTxt: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextMedium,
        textAlign: 'center',
        color: theme.colors._text.darkest
    },
    closeBtn: {
        backgroundColor: theme.colors._neutral.grey20,
        height: WidthToDp(40),
        justifyContent: 'center',
        borderBottomLeftRadius: WidthToDp(20),
        borderBottomRightRadius: WidthToDp(20),
    },
    closeBtnText: {
        fontSize: fontSizes(14),
        fontFamily: theme.fonts.sfProTextRegular,
        textAlign: 'center',
        color: theme.colors._text.lightest
    }
})

