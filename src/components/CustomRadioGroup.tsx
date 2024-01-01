import React from "react";
import { View, StyleSheet, Pressable, ViewStyle } from "react-native";
import { HeightToDp, WidthToDp, theme } from "../helpers/theme";

type Props = {
    options: {value: string, label: React.ReactNode}[], 
    selectedValue: string | number;
    onChange: (val:string) => void;
    containerStyle?: ViewStyle | ViewStyle[]; 
    radioStyle?: ViewStyle | ViewStyle[];
    roundStyle?: ViewStyle | ViewStyle[];
    roundinnerStyle?: ViewStyle | ViewStyle[];
    selectedRoundStyle?: ViewStyle | ViewStyle[];
    selectedRoundInnerStyle?: ViewStyle | ViewStyle[];
    selectedRadioStyle?: ViewStyle | ViewStyle[];
}


const CustomRadioGroup = ({ options, selectedValue, onChange, containerStyle, radioStyle, selectedRadioStyle, roundStyle, roundinnerStyle, selectedRoundStyle, selectedRoundInnerStyle }: Props) => {

    return (
        <View style={containerStyle}>
            {options.map((option) => (
                <Pressable
                    key={option.value}
                    style={[styles.radioOption, radioStyle, (selectedValue === option.value) && selectedRadioStyle]}
                    onPress={() => onChange(option.value)}
                >
                    <View style={[styles.round, roundStyle, selectedValue === option.value && (selectedRoundStyle ?? styles.selectedRound)]}>
                        <View style={[styles.roundInner, roundinnerStyle , selectedValue === option.value && (selectedRoundInnerStyle ?? styles.selectedRoundInner)]}></View>
                    </View>
                    {option.label}
                </Pressable>
            ))}
        </View>
    );
};

export default CustomRadioGroup;

const styles = StyleSheet.create({
    radioOption: {
        flexDirection: 'row',
        marginBottom: HeightToDp(30)
    },
    round: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: theme.colors._text.darkest,
        padding: 5,
        marginRight: WidthToDp(10)
    },
    roundInner: {
        flex: 1,
        borderRadius: 12
    },
    selectedRound: {
        borderColor: theme.colors._primary.darkest
    },
    selectedRoundInner: {
        backgroundColor: theme.colors._primary.darkest
    }
})