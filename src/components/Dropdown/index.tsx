import React, { useEffect, useState } from "react";
import { Modal, Text, View, Image, TouchableHighlight, FlatList, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { fontsSize, theme, StyleSheetManager } from "../../helpers/theme";



const Dropdown = (props: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    const itemPressed = (item: any) => {
        setSelected(item)
        setModalVisible(false)
        props.selected(item)
    }

    useEffect(() => {
        
    }, [props.data])

    return (

        <View >
            <Pressable onPress={() => setModalVisible(true)} style={styles.mainwrpper}>
                <View>
                    {selected ? <Text style={styles.selectedLabel}>{selected}</Text> : <Text style={styles.defaultlabel}>{props.label}</Text>}
                </View>
                <View>
                    <AntDesign name="caretdown" size={fontsSize.f10} color={theme.colors.text} />
                </View>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal}>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <AntDesign style={{ textAlign: 'right', paddingRight: theme.globalvalues.screenHorizontalSpace }} name="close" size={24} color={theme.colors.text} />
                    </Pressable>
                    <FlatList
                        data={props.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Pressable onPress={() => itemPressed(item.title)} style={styles.drodpwonitem}>
                                <Text style={[styles.defaultlabel]} >{item.title}</Text>
                            </Pressable>
                        }
                    />
                </View>
            </Modal>
        </View>

    )
}

export default Dropdown









