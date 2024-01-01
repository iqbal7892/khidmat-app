import React from 'react'
import { Pressable, Image, Linking, ViewStyle, ImageStyle } from "react-native";
import { StyleSheetManager, theme } from "../helpers/theme";

type Props = {
    btnStyle?: ViewStyle | ViewStyle[];
    iconStyle?: ImageStyle
}

const TradingViewIcon = ({btnStyle, iconStyle} : Props) => {

    const handleTradingViewPress = () => {
        const tradingViewURL = 'https://www.tradingview.com/?utm_source=https://cdn-demo.zechinc.com&utm_medium=library&utm_campaign=library';
        Linking.openURL(tradingViewURL);
    };

    return (
        <Pressable style={[styles.tvBtn, btnStyle]} onPress={handleTradingViewPress}>
            <Image style={[styles.tvIcon, iconStyle]} source={require('../assets/images/icons/tradingview.png')} />
        </Pressable>
    )
}

export default TradingViewIcon

const styles = StyleSheetManager.Create({
    tvBtn: {
        width: 32,
        height: 32,
        backgroundColor: theme.colors._neutral.lightest,
        borderColor: theme.colors._border.light,
        borderWidth: 1.5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 8
    },
    tvIcon: {
        width: 20,
        height: 15,
        resizeMode: 'contain'
    }
})