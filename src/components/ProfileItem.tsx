import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { SvgUri } from 'react-native-svg';
import { getDate, getTime, shortText, __ } from '../helpers/common';
import { theme, HeightToDp, WidthToDp, fontsSize, StyleSheetManager  } from '../helpers/theme';
import { Notification, NotificationPosition, NotificationType } from '../helpers/notification';


const ProfileItem = (props: any) => {
    const navigation:any= useNavigation();
    const onItemselected = (data: any) => {
        // if(props.navigates)
        // return ;
            // navigation.navigate('RecordedDetail',{data:data})
            navigation.navigate(props.navigates, { data: data })
        // },3000)
       
    }
    // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return (
        <Pressable style={[styles.itemContaienr,props.itemContaienr]} onPress={() => onItemselected(props)}>
            <View style={[styles.displayFlex,{paddingVertical:WidthToDp(5.5),marginLeft:theme.globalvalues.screenHorizontalSpace}]}>
                <View style={styles.imageArea}>
                    <Image style={[styles.taskimage,props.taskimage]} source={props.image} />
                    {props.badgeImage && <SvgUri style={styles.badgeimageStyle} uri={props.badgeImage} />}
                </View>
                
                    <View style={styles.dtrow}>
                        <View>
                            <View style={styles.displayFlex}>
                                <Text numberOfLines={1} style={styles.heading}>{props.title}</Text>
                                {props.heart && <FontAwesome style={[styles.heartStyle,props.iconSize]} name="heart" size={props.iconSize!==undefined?props.iconSize:14}  />}
                            </View>
                            <Text numberOfLines={1} style={styles.desc}>{shortText(props.subject,25)}</Text>
                        </View>
                        {props.date !==undefined && <View>
                            <Text style={[styles.desc,styles.sessionDT]}>{ props.date !==undefined && getDate(props.date)}</Text>
                            <Text style={[styles.desc,styles.sessionDT]}>{props.date !==undefined && getTime(props.date)}</Text>
                        </View>}
                    </View>
                
            <MaterialIcons style={{alignSelf:'center'}} name="navigate-next" size={fontsSize.f26} color={theme.colors.textmutedDark} />
            </View>
        </Pressable>
    )
}

export default ProfileItem

const styles = StyleSheetManager.Create({
    itemContaienr: {
        marginBottom: HeightToDp(10),
        paddingVertical: theme.globalvalues.headingverticalSpace,
        borderTopWidth:WidthToDp(1),
        borderBottomWidth:WidthToDp(1),
        borderTopColor:'hsla(0,0%,100%,.12)',
        borderBottomColor:'hsla(0,0%,100%,.12)',
        display: 'flex',
        flexDirection: 'row',
        
        alignItems:'center'
    },
    displayFlex:{
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor:'teal',
        flex:1
    },
    dtrow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1,
        alignItems: 'flex-end'
    },
    innercontainer:{
        paddingVertical: theme.globalvalues.headingverticalSpace,
    },
    heartStyle:{
        color:"#f6465d",
        marginLeft:WidthToDp(8),
        marginTop:WidthToDp(8)
    },
    sessionDT:{
        textAlign:'right',
    },
    imageArea:{
        position:'relative',
        alignSelf:'center'
    },
    taskimage: {
        height: WidthToDp(40),
        width: WidthToDp(40),
        resizeMode: 'cover',
        alignSelf:'center',
        marginRight:theme.globalvalues.headinghorizontalSpace
    },
    badgeimageStyle:{
        position:'absolute',
        height: WidthToDp(15),
        width: WidthToDp(15),
        bottom:0,
        right:0,

        borderRadius:WidthToDp(5),
        resizeMode: 'cover',
        marginRight:theme.globalvalues.headinghorizontalSpace
    },
    heading: {
        fontSize: fontsSize.f16,
        fontFamily: theme.fonts.robotoMedium,
        color: theme.colors.text,
    },
    desc: {
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.textmutedDark,
        paddingTop: HeightToDp(3),
        // textAlign:'right'

    }


});