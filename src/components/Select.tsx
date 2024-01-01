import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme'

const Search = ({ style, selected, formGroupStyle, onPress, ...props }: any) => {

  return (
    <Pressable onPress={onPress} style={[styles.formGroup, formGroupStyle]}>
        <View style={styles.formControl}>
            <Text style={styles.selected}>{selected}</Text>
        </View>
        <View style={styles.formControlAppend}>
            <AntDesign name="caretdown" size={fontsSize.f10} color={theme.colors.text} />
        </View>
    </Pressable>
  )
}

export default Search

const styles = StyleSheetManager.Create({
    formGroup: {
        marginBottom: WidthToDp(8),
        position: 'relative',
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: theme.colors.lightBlueGrey,
        borderRadius: WidthToDp(6),
        height:HeightToDp(36),
    },
    formControl: {
        justifyContent: 'center',
        paddingHorizontal: WidthToDp(11),
        flex: 1
    },
    selected: {
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.robotoBold,
        textTransform: 'uppercase',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formControlAppend: {
        paddingRight: WidthToDp(11),
        justifyContent: 'center',
    },
  })
