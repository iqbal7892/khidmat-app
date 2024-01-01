import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { WidthToDp, fontSizes, StyleSheetManager  } from '../helpers/theme';
import { TRADE } from '../navigation/routeNames';

export default function HeaderIconItem(props: any) {

    const navigation: any = useNavigation();

    const onPress = () => {
        navigation.navigate(props.navigate ? props.navigate : TRADE)
    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.iconContainer}>
                <View style={[styles.imageContainer]}>
                    <Image style={[styles.itemimage,props.imagestyle]} source={props.img} />
                </View>
            </View>
        </Pressable>

    );
}

const styles = StyleSheetManager.Create({
    iconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
   
    imageContainer:{
        
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius:50
    },
    itemimage: {
        height: WidthToDp(48),
        width: WidthToDp(48),
        resizeMode: 'contain',
    },
});