
import React, { Component } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview';
import { AppSettings } from '../../config/config';
import { sleep } from '../../helpers/common';
import { CustomActivityIndicator } from '../CustomActivityIndicator';
import GeetestCaptcha from './Geetest';
import ConfirmGoogleCaptcha from './GoogleReCaptcha';
import { StyleSheetManager } from '../../helpers/theme';


interface Props {
    onMessageGoogle: any,
    onMessageGeetest: any
}

interface State {
    googleAccessible: boolean,
    getestVisible: boolean,
    getestLoader: boolean
}


export class CustomCaptcha extends Component<Props, State> {
    private captcha: any;

    constructor(props: Props) {
        super(props)

        this.state = {
            googleAccessible: false,
            getestVisible: false,
            getestLoader: false
        }
    }

    updateGoogleAccessible = () => {
        fetch('https://www.google.com').then(t => {
            this.setState({
                googleAccessible: t.ok
            })
        });    
    }
    
    componentDidMount () {
        this.updateGoogleAccessible();
    }
    hide = () => {
        this.captcha?.hide();
        this.setState({
            getestVisible: false,
            getestLoader: false
        })
    }
    showCaptcha = (google=true) => {
        if(google && this.state.googleAccessible){
            this.captcha.show()
        } else {
            this.setState({
                getestVisible: true,
                getestLoader: true
            })
        }       
    }

    closeGetest = () => {
        this.setState({
            getestVisible: false,
        })
    }

    onMessageGeetest = async (event:any) => { 
        const resp = JSON.parse(event.nativeEvent.data);
        if(resp.close){
            setTimeout(() => {
                this.setState({
                    getestVisible: false,
                })
            }, 1000)   
        }
        
        if(resp.ready){
            this.setState({
                getestLoader: false
            })
        }  

        if(resp.success){
            const resp1 = JSON.parse((decodeURI(resp.success)));
            // await sleep(2000)
            this.props.onMessageGeetest(resp1)
        }
    }

    // onNavigationChange = (navState: any) => {
    //     const indx = navState.url.indexOf('#');
    //     if (indx > 0) {
    //         const resp = JSON.parse((decodeURI(navState.url.substr(indx + 1))));
    //         this.props.onMessageGeetest(resp)
    //     }
    // }

    onMessageGoogle = async (event: any) => {
        if (event && event.nativeEvent.data) {
          if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
              this.captcha.hide();
          } else {
              const data = event.nativeEvent.data;
              this.captcha.hide();
            //   await sleep(2000)
              this.props.onMessageGoogle(data)
          }
        }
    } 
    
    render() {
        return (
            <React.Fragment>
                <ConfirmGoogleCaptcha
                    ref={(ref: any) => this.captcha = ref}
                    siteKey={AppSettings.recaptchaApiKey}
                    baseUrl={AppSettings.baseUrl}
                    languageCode='en'
                    onMessage={this.onMessageGoogle}
                />
                <GeetestCaptcha 
                    onMessage={this.onMessageGeetest}
                    visible={this.state.getestVisible}
                    baseUrl={AppSettings.baseUrl}
                />      
                {this.state.getestLoader && (
                    <CustomActivityIndicator style={{backgroundColor: 'transparent'}}/>
                )}          
            </React.Fragment>
        )
    }
}
const styles = StyleSheetManager.Create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        width:'100%',
        height: '100%'
     }
})