import React from 'react'
import { View, Image, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager  } from '../helpers/theme';
import HistoryItem from './history-item';
import CustomButton from './Button';
import Alltransactionfilter from './AllTransactionFilter';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Container from './Container';
import { Background } from './Background';
import { __ } from '../helpers/common';
import RecordNotFound from './RecordNotFound';

interface funding {
    coin?: string,
    type?: string,
    date?: string,
}
const TransactionHistoryList = (props: any) => {
    const [refreshing, setrefreshing] = React.useState(false);
    const [expandAll, setExpandAll] = React.useState('');
    const [expandAllAsset, setExpandAllAsset] = React.useState('');
    
    // const [tabOb, setTabs] = React.useState({coin: 'All Asset'} as funding);
    
    const wait = (timeout: any) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    var AllAssetData = [
        {"data" : "all_assets"},
        {"data" : "USDC"},
        {"data" : "SWEAT"},
        {"data" : "TRX"},
        {"data" : "SOL"},
        {"data" : "WLKN"},
        {"data" : "ADA"},
        {"data" : "LTC"},
        {"data" : "MANA"},
        {"data" : "USDT"},
        {"data" : "XRP"}
    ];
    var AllData = [
        {"data" : "all"},
        {"data" : "deposit"},
        {"data" : "withdraw"},
        {"data" : "trans_in"},
        {"data" : "trans_out"},
        {"data" : "loans"},
        {"data" : "fiat"},
        {"data" : "airdrop"},
        {"data" : "met_card"},
        {"data" : "comm_affiliate"},
        {"data" : "comm_broker"},
        {"data" : "comm_referral"},
        {"data" : "earn"},
        {"data" : "bot"},
        {"data" : "copy_trd"},
        {"data" : "launchpad"},
        {"data" : "otc_trd"},
        {"data" : "convert"}
    ];
    const filters = () =>{
        return (
            <View>
                <View style={[styles.transflex]}>
                    <Alltransactionfilter setExpand={setExpandAllAsset} expand={expandAllAsset}  title="all_assets"  AllData={AllAssetData} />
                    <Alltransactionfilter setExpand={setExpandAll} expand={expandAll} title="all" AllData={AllData} />
                    {/* <Alltransactionfilter title='all' /> */}
                </View>
                {/* <View style={styles.norecord}> */}

                    {/* <Image style={styles.norecordImage} source={require('../assets/images/icons/norecords.png')} /> */}
                    {/* <Text style={styles.norecordText}>No record found</Text> */}
                {/* </View> */}
            </View>
        )
    }
    const onRefresh = () => {
        setrefreshing(true)
        props.onRefresh()
        wait(1000).then(() => setrefreshing(false));
    };
    // const filtersTransaction = () => {
    //     return (
    //         // <View style={{ paddingHorizontal: WidthToDp(6) }}>
    //         //     <Alltransactionfilter title={'all'} />
    //         // </View>
    //     )
    // };
    // console.log(props.currentPageIndex, props.PageCount,'=====')

    // if (props.data && props.data.length > 0) {
        if(props.data.length===0 && !props.isLoading){
            return <View style={{ flex: 1 }}>
                <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={theme.colors.white} colors={[theme.colors.white]} progressBackgroundColor={theme.colors.primary}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        data={[0]}
                        renderItem={({ item }) =>
                            // <HistoryItem type={props.type} data={item}></HistoryItem>
                            // <HistoryItem type={item.Type===1?'withdraw':'deposit'} data={item}></HistoryItem>
                            <RecordNotFound recordStyle={{ marginLeft: 0, backgroundColor: theme.colors.white }} text="record_not_found" />
                        }
                    />

            </View>
        }
        if (props.filteredlist) {
            return (
                <View>
                    <View style={{paddingHorizontal:WidthToDp(24)}}>
                    {filters()}
                    </View>

                    {props.data.slice(0, 5).map((item: any, index: any) => {
                        return (
                            <View key={index} style= {{zIndex: -1}}>
                                {/* <HistoryItem type={props.type} data={item}></HistoryItem> */}
                                {/* <HistoryItem type={item.Type===1?'withdraw':'deposit'} data={item}></HistoryItem> */}
                                <HistoryItem type={item.Type===1?'deposit':'withdraw'} data={item}></HistoryItem>
                            </View>
                        )
                    })}
                    <View style={styles.btnContainer}>
                        <CustomButton titleStyle={styles.btntitle} style={styles.expandbtn} title={__('expand')} onPress={props.onexpand} color="bglight"></CustomButton>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={theme.colors.white} colors={[theme.colors.white]} progressBackgroundColor={theme.colors.primary}
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        data={props.data}
                        renderItem={({ item }) =>
                            // <HistoryItem type={props.type} data={item}></HistoryItem>
                            // <HistoryItem type={item.Type===1?'withdraw':'deposit'} data={item}></HistoryItem>
                            <HistoryItem type={item.Type===1?'deposit':'withdraw'} data={item}></HistoryItem>
                        }
                    />
                    {props.currentPageIndex !== props.PageCount && <View style={styles.btnContainer}>
                        <CustomButton titleStyle={styles.btntitle} style={styles.expandbtn} title="expand" onPress={() => { props.expand() }} color="bglight"></CustomButton>
                    </View>}
                </View>
            )
        }
    // }
    // else {
    //     return (
    //         <View>
    //             <View style={styles.transflex}>
    //                 <Alltransactionfilter setExpand={setExpandAllAsset} expand={expandAllAsset}  title='All Assets'  AllData={AllAssetData} />
    //                 <Alltransactionfilter setExpand={setExpandAll} expand={expandAll} title='All' AllData={AllData} />
    //                 {/* <Alltransactionfilter title='all' /> */}
    //             </View>
    //             {/* <View style={styles.norecord}> */}

    //                 {/* <Image style={styles.norecordImage} source={require('../assets/images/icons/norecords.png')} /> */}
    //                 {/* <Text style={styles.norecordText}>No record found</Text> */}
    //             {/* </View> */}
    //         </View>
    //     )

    // }
}

export default TransactionHistoryList

const styles = StyleSheetManager.Create({
    norecord: {
        backgroundColor: theme.colors.white,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: WidthToDp(18),
        marginHorizontal: WidthToDp(18),
        paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        paddingVertical: theme.globalvalues.headingverticalSpace,
    },
    btnContainer: {
        marginVertical: theme.globalvalues.containerVerticalSpace,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: -1,
    },
    expandbtn: {
        width: WidthToDp(117),
        height: HeightToDp(44),
        borderRadius: 8,
    },
    btntitle: {
        fontSize: fontsSize.f14,
        fontFamily: theme.fonts.robotoMedium,
    },
    norecordImage: {
        height: WidthToDp(24),
        width: WidthToDp(24),
        resizeMode: 'contain',
    },
    norecordText: {
        fontSize: fontsSize.f12,
        color: theme.colors.text,
        fontFamily: theme.fonts.sfProTextMedium,
        // paddingLeft: theme.globalvalues.screenHorizontalSpace
    },
    transflex: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
        // paddingHorizontal : WidthToDp(12)
    }

});

// const { width } = Dimensions.get('window');

// const ViewTypes = {
//     FULL: 0,
//     HALF_LEFT: 1,
//     HALF_RIGHT: 2
// };

// interface Props {
//     data?: any
//     historyType?:any
//     navigation?:any
// }

// interface State {
//     dataProvider?: any
// }

// class TransactionHistoryList extends Component<Props, State> {
//     private _layoutProvider;
//     private itemHeight: number = HeightToDp(62);
//     private navigation;

//     constructor(props: Props) {
//         super(props);
//         const { navigation } = props;
//         this.navigation = navigation;
//         let dataProvider = new DataProvider((r1, r2) => {
//             return r1 !== r2;
//         });

//         this._layoutProvider = new LayoutProvider(
//             index => {
//                 return ViewTypes.FULL;
//             },
//             (type, dim) => {
//                 dim.width = width;
//                 dim.height = this.itemHeight;

//             }
//         );
//         this.state = {
//             dataProvider: dataProvider.cloneWithRows(this._generateArray(this.props.data.length))
//         };
//     }

//     _generateArray(n: number) {
//         let arr = new Array(n);
//         this.props.data.forEach((item: any, index: number) => {
//             arr[index] = item;
//         });
//         return arr;
//     }

//     selectedItemRoute=(items:any)=>{
//     }
//     _rowRenderer(type: any, item: any, index: number) {
//         return (
//             <HistoryItem data={item}></HistoryItem>
//         );
//     }
//     render() {
//         if (this.props.data.length > 0) {
//             return (
//                 <View style={{ flex: 1 }}>
//                     <RecyclerListView
//                         layoutProvider={this._layoutProvider}
//                         dataProvider={this.state.dataProvider}
//                         rowRenderer={this._rowRenderer}
//                         scrollViewProps={{ decelerationRate: 0.95 }}
//                     />
//                 </View>
//             )
//         } else {
//             return (
//                 <View style={styles.norecord}>
//                     <Image style={styles.norecordImage} source={require('../assets/images/icons/norecords.png')} />
//                     <Text style={styles.norecordText}>No record found</Text>
//                 </View>
//             )
//         }
//     }
// }


// export default TransactionHistoryList

// const styles = StyleSheetManager.Create({
//     norecord: {
//         backgroundColor: theme.colors.backgroundColorDark,
//         display: "flex",
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginVertical: WidthToDp(16),
//         marginHorizontal: WidthToDp(16),
//         paddingHorizontal: theme.globalvalues.screenHorizontalSpace,
//         paddingVertical: theme.globalvalues.headingverticalSpace,
//     },
//     norecordImage: {
//         height: WidthToDp(24),
//         width: WidthToDp(24),
//         resizeMode: 'contain',
//     },
//     norecordText: {
//         fontSize: fontsSize.f14,
//         color: theme.colors.textmutedDark,
//         fontFamily: theme.fonts.robotoRegular,
//         paddingLeft: theme.globalvalues.screenHorizontalSpace
//     },

// });


