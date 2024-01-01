import React from 'react'
import {View, StyleSheet, ViewStyle } from 'react-native'
import { theme, StyleSheetManager  } from '../helpers/theme'

interface Props{
    style?: ViewStyle | ViewStyle[],
    children?: any
}

const MainLayout = ({style, children}: Props) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

export default MainLayout

const styles = StyleSheetManager.Create({
    container: {
        flex: 1,
        backgroundColor:theme.colors._bg.darkest
    }
})


