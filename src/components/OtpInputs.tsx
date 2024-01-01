import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View,Text, ViewStyle } from 'react-native';
import { HeightToDp, fontSizes, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

interface Props {
    cellCount?: number,
    onCodeFilled: any,
    newstyle?: any
  }


 const OtpInputs = (props: Props) => {
    const cellCount = props.cellCount || 6;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: cellCount});
    const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
      let isMounted = true; 
      if(isMounted){
        props.onCodeFilled(value)
      }

      return () => {
        isMounted = false
      }
     }, [value]);
    // console.log('=====');
    const textStyle = props.newstyle ? styles.cell1 : styles.cell
    return (
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={styles.rootStyle}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[textStyle, (props.newstyle && isFocused) && styles.borderColor]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    )
}
export default OtpInputs;
const styles = StyleSheetManager.Create({
    // rootStyle: {
    //   marginHorizontal: WidthToDp(-5)
    // },
    // cell: {
    //     backgroundColor: theme.colors.backgroundColor,
    //     borderRadius: WidthToDp(8),
    //     fontSize: fontSizes(16),
    //     alignItems: 'center',
    //     textAlign: 'center',
    //     color: theme.colors.text,
    //     flex:1,
    //     fontFamily: theme.fonts.sfProTextMedium,
    //     borderColor: theme.colors.primaryLight,
    //     borderWidth:2,
    //     marginHorizontal: WidthToDp(5),
    //     height:HeightToDp(48),
        
    // },
    // focusCell: {
    //     backgroundColor: 'rgba(45,46,70,0.5)'
    // },
    rootStyle: {
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 8,
        fontSize: fontSizes(36.5),
        textAlignVertical: 'center',
        textAlign: 'center',
        color: theme.colors._text.dark,
        flex:1,
        fontFamily: theme.fonts.sfProTextMedium,
        height:HeightToDp(72),
        lineHeight: HeightToDp(70)
    },
    cell1: {
      backgroundColor: '#fafaffcc',
      borderRadius: 4,
      fontSize: fontSizes(20),
      textAlignVertical: 'center',
      textAlign: 'center',
      color: theme.colors.primary,
      flex:1,
      fontFamily: theme.fonts.geomanistRegular,
      height:HeightToDp(70),
      width: WidthToDp(44),
      lineHeight: HeightToDp(67),
      borderWidth: 1.5,
      borderColor: theme.colors._border.lightest
  },
  borderColor:{
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors._bg.default
  }
  
});