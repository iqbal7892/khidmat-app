import React from 'react'

import { LOGIN, MYACCOUNT, WATCHLIST } from '../../navigation/routeNames'
import { connect } from 'react-redux'
import { IWalletInfo } from '../../services/userwallets'
//   Image,
import { View, Image, StyleSheet, Pressable } from 'react-native'
import { WidthToDp, StyleSheetManager } from '../../helpers/theme'
import { useNavigation } from '@react-navigation/native'
// import WatchListItem from './watchlistItem'

interface Props {
    profileImage?: { profile: string };
    isLoggedIn: boolean,
    isHome: boolean,
    userAvatar?:any
}

const ProfileImage = (props: Props) => {
    const navigation: any = useNavigation();
    const avatar =  props.isHome  ? require("../../assets/images/icons/user_new.png") : require("../../assets/images/icons/user_new_grey.png");
    // console.log(props?.profileImage);
    return (
        <View >
            <Pressable onPress={() => navigation.navigate(props.isLoggedIn ? MYACCOUNT : LOGIN)}>

                <Image style={[styles.userAvatar,props.userAvatar]}
                    source={props?.profileImage?.profile.length > 4 && props.isLoggedIn ? { uri: props?.profileImage.profile } :
                    avatar} />
            </Pressable>

        </View>

    )
}
const mapStateToProps = (state: any) => {
    return {
        profileImage: state.userDataReducer.profileImage,
        isLoggedIn: state.authReducer.isLoggedIn,

    }
}
export default connect(mapStateToProps, null)(ProfileImage)
const styles = StyleSheetManager.Create({
    userAvatarWrap: {
        marginRight: WidthToDp(10),
    },
    userAvatar: {
        width: WidthToDp(40),
        height: WidthToDp(40),
        resizeMode: 'contain',
        borderRadius: 100
    },
})
// export default WatchList
