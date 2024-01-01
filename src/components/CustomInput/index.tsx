import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import { theme } from '../../helpers/theme'
import styles from './styles'


const CustomInput = ({ errorText, formGroupStyle, formControlMainStyle, formControlWrapStyle, style, inputLabel, showError, inputError, labelStyle, iconLeft, iconRight, onPressIconLeft, onPressIconRight,prependStyle, 
  appendStyle, inputRef, labelBotmStyle, labelBotmLeft, labelBotmLeftStyle, 
  labelBotmRight, labelBotmRightStyle, ...props }: any) => {
    
  return (
    <View style={[styles.formGroup, formGroupStyle]}>
      {inputLabel && <Text style={[styles.label, labelStyle]} numberOfLines={1}>{inputLabel}</Text> }
      <View style={[styles.formControlMainWrap, formControlMainStyle]}>
        <View style={[styles.formControlWrap, formControlWrapStyle]}>
          {iconLeft && <TouchableOpacity style={[styles.formControlPrepend,prependStyle]} onPress={onPressIconLeft}>{iconLeft}</TouchableOpacity>}
          <TextInput
            style={[styles.formControl, style]}
            selectionColor={theme.colors.text50}
            underlineColor="transparent"
            autoCapitalize="none"
            keyboardAppearance='dark'
            underlineColorAndroid="transparent"
            placeholderTextColor={theme.colors._text.default}
            ref={inputRef}
            {...props}
          />
          {iconRight && <TouchableOpacity style={[styles.formControlAppend,appendStyle]} onPress={onPressIconRight}>{iconRight}</TouchableOpacity>}
        </View>
        {showError && <Text style={styles.errorTxt}>{inputError}</Text>}
      </View>
      {(labelBotmLeft || labelBotmRight) && <View style={[styles.labelBotm, labelBotmStyle]}>
          {labelBotmLeft && <View style={[styles.labelBotmLeft, labelBotmLeftStyle]}>{labelBotmLeft}</View>}
          {labelBotmRight && <View style={[styles.labelBotmRight, labelBotmRightStyle]}>{labelBotmRight}</View>}
        </View>}
    </View>
  )
}

export default CustomInput