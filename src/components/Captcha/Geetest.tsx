import React, { useEffect, useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import WebView from 'react-native-webview';
import { AppSettings } from '../../config/config';

declare var window: any
/**
 * 
 * @param {*} onMessage: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 * @param {*} languageCode: can be found at https://developers.google.com/recaptcha/docs/language
 * @param {*} cancelButtonText: title of cancel button
 */
const GeetestCaptcha = ({ onMessage, baseUrl, visible, style } : any) => {
	const generateTheWebViewContent = async () => {
        const data = await (await fetch(`${AppSettings.apiEndpoint}home/initialize-captcha?t=` + (new Date()).getTime())).text();
		const originalForm =
			`<!DOCTYPE html>
                <html>
                    <head>
                        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
                        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
                        <style>
                            .geetest_holder.geetest_wind .geetest_btn{
                                display: none !important;
                            }
                        </style>
                    </head>
                    <body>
                        <div id="geetest"></div>
                    </body>
                    <script src="https://static.geetest.com/static/tools/gt.js"></script>
                    <script>
                        var postMessage = {};
                        function get(url) {
                            return new Promise((resolve,reject) => {
                                var xhttp = new XMLHttpRequest();
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        resolve(this.responseText);
                                    }
                                };
                                xhttp.open("GET", url, true);
                                xhttp.send();
                            })
                        }
                        //${AppSettings.apiEndpoint}
                            resp = ${data};
                            initGeetest({
                                gt: resp.gt,
                                challenge: resp.challenge,
                                offline: !resp.success,
                                new_captcha: resp.new_captcha,
                                product: 'popup',
                                lang: 'en',
                                width: '100%',
                                timeout: 3000000,
                                https: false,
                                outside: false
                                }, captchaObj => {
                                captchaObj.onReady(() => {
                                    setTimeout(() => {
                                        document.getElementsByClassName('geetest_btn')[0].click()
                                    }, 300);

                                    postMessage['ready'] = true;
                                    window.ReactNativeWebView.postMessage(JSON.stringify(postMessage))
                                });
                                captchaObj.onClose(() => {
                                    postMessage['close'] = true
                                    window.ReactNativeWebView.postMessage(JSON.stringify(postMessage))
                                });
                                captchaObj.onSuccess(() => {
                                    const inputs = document.getElementsByTagName('input');
                                    const obj = { status: true };
                                    for (let i = 0; i < inputs.length; i++) {
                                        obj[inputs[i].name] = inputs[i].value;
                                    }
                                    
                                    postMessage['success'] = encodeURI(JSON.stringify(obj))
                                    window.ReactNativeWebView.postMessage(JSON.stringify(postMessage))
                                    // updateState(obj)
                                });
                                captchaObj.appendTo('#geetest');
                            });

                        // });
                        function updateState(obj) {
                            window.location.hash = "#" + encodeURI(JSON.stringify(obj));
                        }
                    </script>
            </html>`;
		    return originalForm;
	};
    const [value, setValue] = useState('');
    useEffect(() => {
        (async() => {
            setValue(await generateTheWebViewContent());
        })();
    },[]);
	return (
        <Modal visible={visible} transparent={true}>
            <WebView
                originWhitelist={['*']}
                onMessage={onMessage}
                javaScriptEnabled
                useWebKit={true}
                style={[{ backgroundColor: 'rgba(0,0,0, 0.4)', width: '100%' }, style]}
                source={{
                    html: value,
                    baseUrl: `${baseUrl}}`,
                }}
            />
        </Modal>
	);
}

export default GeetestCaptcha;
