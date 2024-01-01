import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../helpers/theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { __ } from "../helpers/common";

const CustomeCheckbox = (props: any) => {

    const [isEnabled, setIsEnabled] = useState(false);
    // if(props.isChecked){
    //     setIsEnabled(props.isChecked)
    // }
    
    const toggleSwitch = () => {
        if(props.notClickAble)
        return

        setIsEnabled(previousState => !previousState)
        props.valueChange(!isEnabled)
    };
    if(props.isChecked==true && !isEnabled)
    setIsEnabled(true)

    if(props.isChecked==false && isEnabled)
    setIsEnabled(false)

    return (
        <Pressable onPress={toggleSwitch} style={[styles.container,props.containerStyle]}>

            {props.customCheck && isEnabled  && <Image style={{ width: WidthToDp(24), height: HeightToDp(24),marginRight:WidthToDp(8), resizeMode: 'contain' }} source={require('../assets/images/icons/tick-square.png')} />}
            {props.customCheck && !isEnabled  && <Image style={{ width: WidthToDp(24), height: HeightToDp(24),marginRight:WidthToDp(8), resizeMode: 'contain' }} source={require('../assets/images/icons/check-box.png')} />}
            {!props.customCheck &&<MaterialCommunityIcons style={[styles.icon,props.iconStyle]}  name={isEnabled ? "checkbox-marked" : "checkbox-blank-outline"} size={WidthToDp(28)} color={isEnabled ? theme.colors.primary : theme.colors.text} />}
            {props.label && <Text style={[styles.textstyle,props.textstyle]}>
                {__(props.label)}
            </Text>}
        </Pressable>
    );
}

export default CustomeCheckbox

const styles = StyleSheetManager.Create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
    },
    mainContainerSwitch: {
        height: HeightToDp(25),
        width: 38,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    track: {
        height: HeightToDp(21),
        width: HeightToDp(21),
        backgroundColor: theme.colors.text,
        borderRadius: 15,
        margin: HeightToDp(2),

    },
    icon: {
        marginRight: WidthToDp(8),
    },
    textstyle: {
        fontFamily: theme.fonts.robotoRegular,
        fontSize: fontsSize.f12,
        color: theme.colors.text,
        paddingLeft: WidthToDp(10)
    }
})

