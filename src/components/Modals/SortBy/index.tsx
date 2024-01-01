import React, { Component, useRef } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from 'react-native'
import { HeightToDp, theme, WidthToDp, fontSizes } from '../../../helpers/theme';
import { __, sleep } from '../../../helpers/common';
import CustomSwitch from '../../Switch';
import { User } from '../../../models/user';

interface Props {
    chainInfo?: any,
    selectedChain?: any
    onSelect?: any
    closeMod: any;
    sortWlt: any;
}
interface State {
    sortByBalance: boolean,
    sortByAlphabatically: boolean,
    hideOtherBalance: boolean,
    showHideOther: boolean,
}

class SortBy extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortByBalance: true,
            sortByAlphabatically: false,
            hideOtherBalance: false,
            showHideOther: false,
        }
    }

    onItemChange = (item: any) => {
        this.props.onSelect(item)
    }
    switchValue = async (value: any) => {
        console.log('switchValue', value);
        if (value) {
            await this.setState({
                hideOtherBalance: false
            });
        } else {
            await this.setState({
                hideOtherBalance: true
            });
        }

        this.props.sortWlt(this.state);
        this.saveToStorage();
        // this.props.closeMod()

    }
    componentDidMount(): void {
        this.getPortFolio();
    }
    updateBalance = async () => {
        await this.setState({ sortByAlphabatically: false, sortByBalance: true });
        this.props.sortWlt(this.state);
        this.saveToStorage();

        // this.props.closeMod()


    }
    updateAlphabet = async () => {
        await this.setState({ sortByAlphabatically: true, sortByBalance: false });
        this.props.sortWlt(this.state);
        this.saveToStorage();
        // this.props.closeMod()
    }
    saveToStorage = async () => {
        const user = User.getInstance();
        const userId = user.getUserId();
        const newData = {...this.state, userId: userId}

        const existingData = JSON.parse(await user.getPortFolioSetting() ?? '[]');
        const existingIndex = existingData.findIndex(item => item.userId === userId);

        if (existingIndex !== -1) {
            existingData[existingIndex] = newData;
        } else {
            existingData.push(newData);
        }

        await user.setPortFolioSetting(existingData);
    }
    getPortFolio = async () => {
        const user = User.getInstance();
        let portfolio = await user.getPortFolioSetting();
        if (portfolio) {
            let parse = JSON.parse(portfolio);

            if(Array.isArray(parse)){
                const uport = parse.find(item => item.userId === user.getUserId());

                Object.keys(uport).forEach(key => {
                    const sts = {};
                    sts[key] = uport[key];
                    this.setState(sts);
                });
            
                await sleep(100);
                this.props.sortWlt(this.state);
                this.setState({showHideOther: true}); 
            } else {
                await user.removePortFolioSetting()
            }
        }
    }
    render(): React.ReactNode {
        // console.log(this.props.chainInfo,this.props.selectedChain);
        return (
            <>
                <View style={styles.noticepadd}>
                    <View style={styles.noticemain}>
                        <View style={styles.dflex}>
                            <Image source={require('../../../assets/images/icons/border.png')} />
                        </View>
                        <Text style={styles.txt1}>{__('sort_by')}</Text>
                        <View style={styles.pdglobal}>
                            <Pressable onPress={this.updateBalance}>
                                <View style={styles.dflex1}>
                                    <Text style={styles.txt2} >{__('bal')}</Text>
                                    {this.state.sortByBalance && <Image style={styles.imgstyle1} source={require('../../../assets/images/icons/radiochecked.png')} />}
                                    {!this.state.sortByBalance && <View style={[styles.imgstyle1,{backgroundColor:theme.colors._neutral.extralight,borderRadius:WidthToDp(50)}]}></View>}
                                </View>
                            </Pressable>

                            <Pressable onPress={this.updateAlphabet}>

                                <View style={styles.dflex1}>
                                    <Text style={styles.txt3} >{__('aplphabetically')}</Text>
                                    {this.state.sortByAlphabatically && <Image style={styles.imgstyle1} source={require('../../../assets/images/icons/radiochecked.png')} />}
                                    {!this.state.sortByAlphabatically && <View style={[styles.imgstyle1,{backgroundColor:theme.colors._neutral.extralight,borderRadius:WidthToDp(50)}]}></View>}
                                </View>
                            </Pressable>

                        </View>
                        <View style={styles.dflex2}>
                            <Text style={styles.txt4} >{__('s_hide_coins')}</Text>
                             <CustomSwitch key={this.state.hideOtherBalance} defaultvalue={this.state.hideOtherBalance} 
                            valueChange={(blnc: any) => this.switchValue(blnc)}
                                primaryColor={theme.colors._border.lightest}
                                defaultBackground={theme.colors._border.lightest}>

                            </CustomSwitch>
                        </View>
                        <View>
                            <Pressable onPress={this.props.closeMod}>
                                <Text style={styles.txt5}>{__('close')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </>
        )
    }

}
export default SortBy;

const styles = StyleSheet.create({

    noticemain: {
        backgroundColor: 'white',
        paddingTop: 12,
        paddingBottom: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 368,
        paddingHorizontal: 24
    },
    noticepadd: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    dflex: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt1: {
        color: theme.colors._text.color3,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistMedium,
        lineHeight: 22.4,
        textAlign: 'center',
        paddingTop: 24
    },
    pdglobal: {
        // paddingHorizontal: 24,
        paddingTop: 32,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors._border.lightest
    },
    dflex1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgstyle1: {
        width: 24,
        height: 24,
        // marginTop: 5
    },
    txt2: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
    },
    txt3: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
        paddingTop: 36,
        paddingBottom: 32
    },
    txt4: {
        color: theme.colors._text.color3,
        fontFamily: theme.fonts.geomanistRegular,
        fontSize: fontSizes(16),
        // lineHeight: 16
        // paddingTop: 36,
        // paddingBottom: 32
    },
    dflex2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 36,
        // paddingBottom: 48
    },
    txt5: {
        color: theme.colors._primary.darkest,
        fontSize: fontSizes(16),
        fontFamily: theme.fonts.geomanistRegular,
        textAlign: 'center',
        paddingTop: 25

    }

})