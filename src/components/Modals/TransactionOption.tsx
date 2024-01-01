import React, { useState } from "react";
import { Image, Text, View, Pressable, StyleSheet, Modal } from "react-native";
import { HeightToDp, WidthToDp, theme, fontSizes, StyleSheetManager } from "../../helpers/theme";
import Generic from "./Generic";


const TransactionOption = (props) => {
    const [visible, setVisible] = useState(false);


    const onSelectItem = (item: any) => {
        props.onSelectItem(item.key)
        setVisible(false)
    }

    const onClose = () => {
        setVisible(false)
    }
    
    const data = props.isDerivative ? [{key:'Transfer'}] : [{key:'Transfer'}, {key: 'Deposit'}]

  return (
        <React.Fragment>
            <Pressable onPress={() => setVisible(true)}>
                <Image source={require('../../assets/images/icons/add-circle.png')} style={{ width: WidthToDp(24), height: HeightToDp(24), marginLeft: WidthToDp(5), resizeMode: 'contain' }} />
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <Generic data={data} onClose={onClose} onSelectItem={onSelectItem}/>
            </Modal>
        </React.Fragment>
    )
}


export default TransactionOption

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
        paddingBottom: HeightToDp(6),
    },
    title: {
        fontSize: fontSizes(12),
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.lightest,
        textAlign: 'center'
    },
    item: {
        height: WidthToDp(60),
        justifyContent: 'center',
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

