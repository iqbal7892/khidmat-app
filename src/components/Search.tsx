import React from 'react'
import { View, TextInput, TouchableOpacity, Image, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'

interface Props {
  formGroupStyle?: ViewStyle | ViewStyle[] | TextStyle;
  formControlWrap?: ViewStyle | ViewStyle [] | TextStyle;
  style?: ViewStyle | ViewStyle[] | TextStyle;
  inputRef?: any;
  isActive?: boolean;
  [x: string | number | symbol]: unknown;
  newIcon?: boolean,
}

const Search = ({ formGroupStyle, style, inputRef, newIcon, ...props }: Props) => {

  return (
    <View style={formGroupStyle}>
      <View style={[styles.formControlWrap, newIcon && styles.newFormControlWrap, props.formControlWrap,{borderWidth:props.isActive?0:1}]}>
        <View style={styles.formControlPrepend}>
          <Image  style={styles.image} source={newIcon?require('../assets/images/icons/search-normal-new.png' ):require('../assets/images/icons/search-normal.png')} />
        </View>
        <TextInput
          placeholderTextColor={theme.colors.h999FBB}
          style={[styles.formControl, newIcon && styles.newFormControl, style]}
          selectionColor="rgba(202, 206, 255, 0.6)"
          autoCapitalize="none"
          keyboardAppearance='dark'
          underlineColorAndroid="transparent"
          ref={inputRef}
          {...props}
        />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheetManager.Create({
    formControlWrap: {
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: theme.colors.white,
        height:HeightToDp(48),
        borderRadius:50,
        borderColor:theme.colors.h999FBB,
        borderWidth:1,
    },
    newFormControlWrap: {
      borderColor: theme.colors._border.light,
      borderWidth: 1.5,
    },
    formControl: {
        flex: 1,
        fontSize: fontSizes(16),
        lineHeight: fontsSize.f20,
        paddingLeft:theme.globalvalues.headinghorizontalSpace,
        letterSpacing: -0.02,
        fontFamily: theme.fonts.euclidCircularARegular,
        color: theme.colors.text,
    },
    newFormControl: {
      flex: 1,
      fontSize: fontSizes(14),
      paddingLeft: theme.globalvalues.headinghorizontalSpace,
      fontFamily: theme.fonts.geomanistRegular,
      color: theme.colors._text.default,
    },
    formControlPrepend: {
        paddingLeft: WidthToDp(15),
        justifyContent: 'center',
    },
      image: {
      width:WidthToDp(21),
      height:WidthToDp(21),
    }
  })
