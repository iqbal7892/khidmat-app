import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet, Pressable, Text } from 'react-native'
import { HeightToDp, WidthToDp, fontsSize, theme, fontSizes, StyleSheetManager  } from '../helpers/theme'
import { NotificationType, TNotification } from '../helpers/notification'   
import * as Clipboard from 'expo-clipboard';
import ProfileImage from '../navigation/DrawerMenu/ProfileImage'


interface Props {
    profileImage?: {profile: string},
    account?: any,
    enableCopy?:boolean
}

const Profile = (props: Props) => {
    const [isCopied, setIsCopied] = useState(false)
        
    const copyToClipboard = async(txt:any) => {
        await Clipboard.setStringAsync(txt.toString())
        if(!isCopied){
 
            await setIsCopied(true)
            TNotification.show('copied_to_clipboard', NotificationType.Success)
            setTimeout(async() => {
                await setIsCopied(false)
             },5000)
         }
     }
     return (
        <View style={styles.userinfo}>
            {/* <Image style={styles.userImage} source={props?.profileImage?.profile.length > 4  ? {uri: props?.profileImage.profile}
            :require('../assets/images/icons/profile-image.png')} /> */}
            <ProfileImage isHome={false} userAvatar={{width: WidthToDp(56), 
                height: WidthToDp(56),marginLeft: WidthToDp(-10)}}/>
            <View style={[styles.userbase]}>
                <View style={[styles.flex]}>
                    <Text style={styles.infoemail} numberOfLines={1}>{props.account?.Em}</Text>
                    {props.account.Ul === 2 && 
                    <Image style={styles.checkIcon} 
                    source={require('../assets/images/icons/check-vector.png')} />}
                </View>
                <View style={[styles.flex,{paddingTop:WidthToDp(13)}]}>
                {props.account?.UserId && <Text style={styles.userbasic} numberOfLines={1}>ID: {props.account?.UserId}</Text>}
                    {props.account?.UserId && props.enableCopy &&  <Pressable onPress={()=>{copyToClipboard(props.account?.UserId)}}><Image style={{ width: WidthToDp(20), height: HeightToDp(20),marginLeft:WidthToDp(8), resizeMode: 'contain' }} source={isCopied?require("../assets/images/icons/copy.png"):require('../assets/images/icons/copyicon-default.png')} /></Pressable>}
                </View>
                
            </View>
        </View>

    )
}
const mapStateToProps = (state: any) => {
    return {
        profileImage: state.userDataReducer.profileImage,
    }
}
export default connect(mapStateToProps, null)(Profile)
const styles = StyleSheetManager.Create({
    userinfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignItems: 'baseline',
        paddingHorizontal:WidthToDp(10),
        paddingVertical:HeightToDp(10),
        paddingBottom:WidthToDp(14),
        // backgroundColor:'teal'
      },
      userbase:{
        paddingLeft:WidthToDp(16),
      },

      checkIcon: {
        width: WidthToDp(20), 
        height: HeightToDp(20),
        marginLeft:WidthToDp(8), 
        resizeMode: 'contain'
      },
      flex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      infoemail: {
        fontSize: fontsSize.f20,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors.textDark,
        lineHeight:fontSizes(24),
        minWidth:WidthToDp(40,true),
      },
      userbasic:{
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.sfProTextRegular,
        color: theme.colors._text.color3,
        lineHeight:WidthToDp(17)
      },
  })
