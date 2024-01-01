import React from 'react';
import { Image, Pressable } from 'react-native';
import { StyleSheetManager, WidthToDp } from '../helpers/theme';

const RoundedIconButton = ({ onPress, buttonIcon }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image style={styles.icon} source={buttonIcon} />
    </Pressable>
  );
};

const styles = StyleSheetManager.Create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FAFF',
    borderRadius: 44,
    width: WidthToDp(44),
    height: WidthToDp(44),
  },
  icon: {
    width: WidthToDp(24),
    height: WidthToDp(24),
    resizeMode: 'contain'
  }
});

export default RoundedIconButton;