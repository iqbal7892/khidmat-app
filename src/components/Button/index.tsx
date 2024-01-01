import React, { ReactNode } from 'react'
import { ActivityIndicator, Text, Pressable, View, ViewStyle, TextStyle } from 'react-native'
import { theme } from '../../helpers/theme'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title?: string;
  color?: string; // will remove later
  titleSize?: string; // will remove later
  variation?: ButtonVariation;
  disabled?: boolean;
  hideLoadingText?: boolean;
  loading?: boolean;
  onPress?: () => void;
  navigate?: string;
  style?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  icon?: any; // will remove later
  iconPaddingRight?: any; // will remove later
  iconRight?: any; // will remove later
  indicator?: boolean;
  children?: ReactNode;
}

const CustomButton = ({ title, variation = ButtonVariation.primary, color, disabled, hideLoadingText, loading, onPress, navigate, style, titleStyle, icon, iconRight, iconPaddingRight, indicator=true }: Props) => {
  const navigation: any = useNavigation();
  
  return (
    <Pressable
      disabled={disabled}
      onPress={navigate ? (() => { navigation.navigate(navigate) }) : () => { if(!loading) onPress(); }} style={[styles.btn, styles[variation], style]}>
      {icon && <View style={{ paddingRight: iconPaddingRight }}>{icon}</View>}
      {loading && (
        <ActivityIndicator color={color} />
      )}
      {(title && !loading) && (
        <Text numberOfLines={1} style={[styles.btnText, styles[`txt${variation}`], titleStyle]}>{title}</Text>
      )}

      {iconRight && <View style={{ paddingLeft: iconPaddingRight }}>{iconRight}</View>}

    </Pressable>
  );
};

export default CustomButton;

export enum ButtonVariation {
  primary = "primary",
  success = "success",
  danger = "danger",
  light = "light",
  disable = "disable",
  white = "white",
  outline_primary = "outline_primary",
  outline_white = "outline_white"
}

