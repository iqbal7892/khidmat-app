import React, { Component, useEffect, useRef, useState } from "react";
import { Modal, Text, View, Pressable, AppState } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { theme, WidthToDp, fontSizes } from "./../../../helpers/theme";
import styles from "./styles";
import { Storage } from "../../../helpers/storage";
import * as _App from '../../../models/app';
import { TranslationInit } from "../../../helpers/languageservice";
import { __ } from "../../../helpers/common";
// import {Restart} from "fiction-expo-restart";



export const LanguageModal = ({modalVisible, setLanguage, onClose}: any) => {
    const storage = Storage.getInstance();
    const [_lang, _setLang] = useState([]);
    const [_modalVisible, setModalVisible] = useState(modalVisible);
    const selectType= (item:any) => {
        if(item.Code==TranslationInit.CLang){
            onClose()
            return;
        }
        (async () => {
            console.log(item,'olkay')
            try {    
           
                if(await TranslationInit.getTranslation(item.Code,true)){
                    onClose()
                    // setTimeout(()=>{
                    //     Restart();
                    // },100)
                }
            } catch (error) {
                    console.log(error)
            }
        })()
    }
    
    
    const allLanguages= async()=>{
        let data=JSON.parse((await storage.get('activelang'))!);
        _setLang(data);
    }
    useEffect(() => {
        allLanguages()
        
    }, []);
    return (
        
        <React.Fragment>
            <Modal
            
                animationType="slide"
                transparent={true}
                visible={true}
            >   
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            {_lang && _lang.map((item:any, index:number) => (
                                <Pressable key={item.Code} onPress={() => selectType(item)} style={styles.precisionItem}>
                                    <Text style={styles.precisionText}>{item.Name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={styles.closeBtn} onPress={onClose}>
                            <Text style={styles.closeBtnText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    )
}


export default LanguageModal


