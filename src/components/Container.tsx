import React from 'react'
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native'
import { WidthToDp, fontSizes, StyleSheetManager  } from '../helpers/theme'

interface Props {
    style?: ViewStyle | ViewStyle[],
    children?: any
    keyboardShouldPersistTaps?: 'always' | 'handled' | 'never'
}

const Container = ({style, children, keyboardShouldPersistTaps}: Props) => {
    return (
        <ScrollView keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? "always"}>
            <View style={[styles.container, style]}>
                {children}
            </View>
        </ScrollView>
    )
}

export default Container

const styles = StyleSheetManager.Create({
    container: {
        flex: 1,
        paddingHorizontal: WidthToDp(24)
    }
})


