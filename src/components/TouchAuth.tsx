import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { StyleSheet, View, Image, Modal, TouchableOpacity, Pressable } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { TNotification, NotificationType } from '../helpers/notification';
import { HeightToDp, theme, fontsSize, StyleSheetManager  } from '../helpers/theme';
import { User } from '../models/user';
import { LOGIN } from '../navigation/routeNames';
import { useNavigation } from '@react-navigation/native';


const TouchAuth = (props: any) => {
    const [visible, setvisible] = React.useState(true)
    const navigation: any = useNavigation();

    const touchAuth = async () => {
        const user = User.getInstance();
        if (user.localAuth.isActive()) {
            if (await user.localAuth.authenticate()) {
                await user.init();
                if (user.isLoggedIn())
                    props.loginSuccess();
                else
                    TNotification.show("s_login_session_expired", NotificationType.Danger)
                setvisible(false)
                navigation.navigate(LOGIN);
            }
        } else {
            TNotification.show("touch_id_disabled", NotificationType.Danger);
        }
    };
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.mainBox]}>
                        <Pressable style={styles.closeIcon} onPress={() => setvisible(false)}>
                            <Ionicons name="close-sharp" size={fontsSize.f30} color={theme.colors.textmutedDark} />
                        </Pressable>
                        <TouchableOpacity onPress={touchAuth}>
                            <Image style={styles.touchIdImg} source={require('../assets/images/icons/touch_id.png')} />
                        </TouchableOpacity>
                    </View>
                </View >
            </Modal>
        </View>

    )
}
export default TouchAuth


const styles = StyleSheetManager.Create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    mainBox: {
        position: 'absolute',
        bottom: 0,
        paddingBottom: theme.globalvalues.screenVerticalSpace,
        backgroundColor: theme.colors.backgroundColor,
        width: widthPercentageToDP('100%'),
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
    },
    title: {
        fontSize: fontsSize.f16,
        color: theme.colors.blueCdark,
        fontFamily: theme.fonts.robotoMedium,
        textAlign: 'center'
    },
    touchIdImg: {
        alignSelf: 'center',
        height: HeightToDp(52),
        width: HeightToDp(52)
    },
    closeIcon: {
        alignItems: 'flex-end',
        paddingTop: theme.globalvalues.headingverticalSpace,
        paddingRight: theme.globalvalues.screenHorizontalSpace,
    },

})
