import { LinearGradient } from 'expo-linear-gradient';
import React, { Component, useEffect, useState } from 'react'
import {  Pressable, StatusBar,StyleSheet, Text, View } from 'react-native'
import { Storage } from '../../../helpers/storage';
import { fontSizes, fontsSize, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../../helpers/theme';
import { FavPair } from '../../../models/favpair';
import { Currencies } from '../../../models/market';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { __ } from '../../../helpers/common';

interface Props {
  dateTime:any
  onClose:any
  heading:any
  warning:any
}

interface State {
  timeCount:any
}
export class CountDownModel extends Component<Props, State> {
        private expireTime = new Date();
        private timeRemaining:any;
        private interval:any;
        constructor(props: Props) {
          super(props)

            this.state = {
                timeCount: { days: '00', hours: '00', minutes: '00', seconds: '00' }
            }
        }
        formatTime=(secconds:any) =>{
          const d = Number(secconds);
          const h = Math.floor(d / 3600);
          const m = Math.floor(d % 3600 / 60);
          const s = Math.floor(d % 3600 % 60);
      
          const hDisplay = h > 0 ? (h < 10 ? '0' + h : h) : '00';
          const days = ((Number(hDisplay) / 24).toFixed(0)).toString();
          const hours = (Number(hDisplay) - (Number((Number(hDisplay) / 24).toFixed(0)) * 24)).toString()
      
          const mDisplay = (m > 0 ? (m < 10 ? '0' + m : m) : '00').toString();
          const sDisplay = (s > 0 ? (s < 10 ? '0' + s : s) : '00').toString();
      
          const resetTime = { days: days, hours:(hours.length==1?'0'+hours:hours), minutes:(mDisplay.length==1?'0'+mDisplay:mDisplay), seconds:(sDisplay.length==1?sDisplay:sDisplay) };
          
          return resetTime;
        }
        setCounter(){
          let data=this.props.dateTime;
          this.expireTime.setHours(this.expireTime.getHours() + 1);
          this.timeRemaining = data;
          const endtime=Date.now()+(this.timeRemaining*1000);
          this.interval =setInterval(async() => {
            await this.setState({timeCount:this.formatTime((endtime-Date.now())/1000)})
            if (Number(this.state.timeCount.hours) === 0 && Number(this.state.timeCount.minutes) === 0 && Number(this.state.timeCount.seconds) === 0) {
              // modal will close
              clearInterval(this.interval);
              this.props.onClose();
            }
          }, 200);
        }
        componentDidMount () {
          this.setCounter();
        }
        componentWillUnmount(){
          clearInterval(this.interval);
        }
        render() {
          return (
      
            <View style={styles.mainContainer}>
               <StatusBar
                animated={true}
                backgroundColor={'#00000080'} />
              <Text style={styles.heading}>{this.props.heading}</Text>
              <Text style={styles.warning}>{this.props.warning}</Text>
              <View style={{display:'flex',flexDirection: 'row',alignItems: 'center',alignSelf:'center'}}>
                <LinearGradient style={styles.counterBox} colors={['rgba(255, 255, 255, 0.10)','#12142b']} start={[0.5, 0.52]} end={[0.5, 0.54]} >
                {/* <Text style={styles.counterNumber}>27</Text> */}
                <Text style={styles.counterNumber}>{this.state.timeCount?this.state.timeCount.hours:'00'}</Text>
                  <Text style={styles.counterLabel}>{__('HOURS')}</Text>
                </LinearGradient>
                <LinearGradient style={styles.counterBox} colors={['rgba(255, 255, 255, 0.10)','#12142b']} start={[0.5, 0.52]} end={[0.5, 0.54]} >
                  {/* <Text style={styles.counterNumber}>35</Text> */}
                  <Text style={styles.counterNumber}>{this.state.timeCount?this.state.timeCount.minutes:'00'}</Text>
                  <Text style={styles.counterLabel}>{__('mins')}</Text>
                </LinearGradient>
                <LinearGradient style={styles.counterBox} colors={['rgba(255, 255, 255, 0.10)','#12142b']} start={[0.5, 0.52]} end={[0.5, 0.54]} >
                  {/* <Text style={styles.counterNumber}>27</Text> */}
                  <Text style={styles.counterNumber}>{this.state.timeCount?this.state.timeCount.seconds:'00'}</Text>
                  <Text style={styles.counterLabel}>{__('secs')}</Text>
                </LinearGradient>
              </View>
              <View style={styles.btnContainer}>
                <Pressable onPress={this.props.onClose}><Text style={styles.btnCancel}>{__('ok')}</Text></Pressable>
              </View>
            </View>
          );
        }
}
const styles = StyleSheetManager.Create({
  mainContainer: {
    width: wp('85%'),
    backgroundColor: 'white',
    borderRadius: WidthToDp(13)
  },
  heading:{
    borderTopColor: theme.colors.borderColor,
    borderTopWidth: .4,
    fontSize: fontsSize.f16,
    fontFamily: theme.fonts.robotoMedium,
    color: '#0b0c19',
    textAlign:'center',
    paddingTop:wp('6%'),
    paddingBottom:wp('2.2%'),
  },
  warning:{
    fontSize: fontsSize.f14,
    fontFamily: theme.fonts.robotoRegular,
    color: '#0b0c19',
    opacity:0.9,
    textAlign:'center',
    paddingHorizontal:wp('7%'),
    paddingBottom: WidthToDp(20)

  },
  btnContainer: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: theme.colors.borderColor,
    borderTopWidth: 1.5
  },

  btnCancel: {
    fontSize: fontsSize.f16,
    fontFamily: theme.fonts.robotoRegular,
    color: '#2ebd85',
    width: wp('35%'),
    textAlign:'center',
    paddingVertical: WidthToDp(12)
  },
  counterNumber:{
    marginTop:HeightToDp(12),
    marginBottom:HeightToDp(1),
    fontSize:fontsSize.f42,
    letterSpacing:0.79,
    fontFamily:theme.fonts.robotoRegular,
    textAlign:'center',
    color:theme.colors.white,
    opacity:0.9
  },
  counterLabel:{
    fontSize:fontsSize.f12,
    fontFamily:theme.fonts.robotoRegular,
    letterSpacing:0.48,
    textAlign:'center',
    color:'#cdcfeb',
    opacity:0.6
  },
  counterBox:{
    borderRadius:6,
    // width:WidthToDp(80),
    // height:HeightToDp(120),
    paddingHorizontal:WidthToDp(14),
    paddingVertical:WidthToDp(13),
    marginTop: WidthToDp(5),
    marginBottom:WidthToDp(20),
    marginRight:WidthToDp(5),
    marginLeft:WidthToDp(5),
    backgroundColor:'#12142b'
  }
});

