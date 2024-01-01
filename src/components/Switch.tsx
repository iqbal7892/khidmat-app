import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { isNullOrUndefined } from "../helpers/common";
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from "../helpers/theme";

const CustomSwitch = (props: any) => {
    let defaultValue: boolean = props.defaultvalue || false
    const [isEnabled, setIsEnabled] = useState(defaultValue);
    const toggleSwitch = (triggerChange: any) => {
        triggerChange = triggerChange??true;
        !props.disableSlide && setIsEnabled(previousState => !previousState)
        if(triggerChange)
        props.valueChange(isEnabled)
    };
    
    if(!isNullOrUndefined(props.toggle))
        props.toggle.fn = () => {
            toggleSwitch(false);
        }
    return (
        <Pressable onPress={toggleSwitch} style={[styles.container]}>
            {props.labelLeft && <Text style={[styles.textstyle,props.labelLeftStyle]}>
                {props.labelLeft}
            </Text>}
            <View style={[styles.mainContainerSwitch, { justifyContent: isEnabled ? 'flex-end' : 'flex-start', backgroundColor: isEnabled ? props.primaryColor ? theme.colors.primary : theme.colors.textmutedLight : props.defaultBackground??'#5a5b73' }]}>
                <View style={styles.track}></View>
            </View>
            {props.label &&<Text style={styles.textstyle}>
                {props.label}
            </Text>}
        </Pressable>
    );
}

export default CustomSwitch

const styles = StyleSheetManager.Create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: theme.globalvalues.headingverticalSpace,

    },
    mainContainerSwitch: {
        height: HeightToDp(25),
        width: 42,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',

    },
    track: {
        height: HeightToDp(21),
        width: HeightToDp(21),
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        margin: HeightToDp(2),

    },
    textstyle: {
        fontFamily: theme.fonts.sfProTextRegular,
        fontSize: fontsSize.f12,
        color: theme.colors.text,
        paddingLeft: WidthToDp(10)
    }
})

