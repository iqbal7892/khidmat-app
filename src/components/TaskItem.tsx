import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { theme, HeightToDp, WidthToDp, fontsSize, StyleSheetManager  } from '../helpers/theme';

const TaskItem = (props: any) => {
    const navigation: any= useNavigation();
    const onItemselected = (data: any) => {
        // setTimeout(()=>{
            
            const n=data.navigates;
            navigation.navigate(n,{data})
        // },3000)
       
    }

    return (
        <Pressable style={styles.itemContaienr} onPress={() => onItemselected(props)}>
            <View style={styles.displayFlex}>
                {props.image && <Image style={[styles.taskimage,props.taskimage]} source={props.image} />}
                {props.badgeImage && <Image style={styles.badgeimage} source={props.badgeImage} />}
                <View>
                    <Text numberOfLines={1} style={styles.heading}>{props.title}</Text>
                    <Text numberOfLines={1} style={styles.desc}>{props.heading}</Text>
                </View>
            </View>
            <MaterialIcons name="navigate-next" size={fontsSize.f26} color={theme.colors.textmutedDark} />
        </Pressable>
    )
}

export default TaskItem

const styles = StyleSheetManager.Create({
    itemContaienr: {
        marginBottom: HeightToDp(10),
        borderRadius: 12,
        paddingVertical: theme.globalvalues.headingverticalSpace,
        paddingHorizontal: theme.globalvalues.headinghorizontalSpace,
        backgroundColor: theme.colors.backgroundColorMuted,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    displayFlex:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    
    taskimage: {
        height: WidthToDp(40),
        width: WidthToDp(40),
        resizeMode: 'cover',
        marginRight:theme.globalvalues.headinghorizontalSpace
    },
    badgeimage:{
        position:'absolute',
        height: WidthToDp(15),
        width: WidthToDp(15),
        bottom:-1,
        left:WidthToDp(30),
        borderRadius:WidthToDp(10),
        resizeMode: 'cover',
        marginRight:theme.globalvalues.headinghorizontalSpace
    },
    heading: {
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.robotoMedium,
        color: theme.colors.text,
    },
    desc: {
        fontSize: fontsSize.f12,
        fontFamily: theme.fonts.robotoRegular,
        color: theme.colors.textmutedDark,
        paddingTop: HeightToDp(3)

    }


});