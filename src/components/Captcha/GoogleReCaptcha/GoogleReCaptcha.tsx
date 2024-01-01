import React from 'react';
import { Dimensions } from 'react-native';
import WebView from 'react-native-webview';

declare var window: any

const patchPostMessageJsCode = `(${String(function () {
	var originalPostMessage = window.ReactNativeWebView.postMessage;
	var patchedPostMessage = function (message: any, targetOrigin: any, transfer: any) {
		originalPostMessage(message, targetOrigin, transfer);
	};
	patchedPostMessage.toString = function () {
		return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
	};
	window.ReactNativeWebView.postMessage = patchedPostMessage
})})();`;

const { width, height } = Dimensions.get('window');

/**
 * 
 * @param {*} onMessage: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 * @param {*} languageCode: can be found at https://developers.google.com/recaptcha/docs/language
 * @param {*} cancelButtonText: title of cancel button
 */
const GoogleReCaptcha = ({ onMessage, siteKey, style, url, languageCode, cancelButtonText = 'Cancel' } : any) => {
	const generateTheWebViewContent = (siteKey:string) => {
		const originalForm =
			`<!DOCTYPE html>
			<html>
			<head> 
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
				<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=0.99">
				<script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl=${languageCode || 'en'}"></script> 
				<script type="text/javascript"> 
				var onloadCallback = function() { };  
				var onDataCallback = function(response) { 
					window.ReactNativeWebView.postMessage(response);  
					setTimeout(function () {
						document.getElementById('captcha').style.display = 'none';
					}, 1500);
				};  
				var onCancel = function() {  
					window.ReactNativeWebView.postMessage("cancel"); 
					document.getElementById('captcha').style.display = 'none';
				}
				var onDataExpiredCallback = function(error) {  window.ReactNativeWebView.postMessage("expired"); };  
				var onDataErrorCallback = function(error) {  window.ReactNativeWebView.postMessage("error"); } 
				</script> 
				<style>
					#captcha {
						display: flex;
						align-items: center;
						justify-content: center;
						height: ${height}px;
					}
					.btn {
						background-color: #f6465d; 
						font-size:16px;
						color: #ffffff; padding: 12px 32px; margin-top: 8px; 
						border: none; border-radius: 12px; font-weight: bold;
					}
					.btn:active {
						outline: none;
					}
					.btn:focus {
						outline: none;
					}
				</style>
			</head>
			<body> 
				<div id="captcha">
					<div style="text-align: center;">
					<div class="g-recaptcha" style="display: inline-block; transform: scale(1.1); height: auto;" 
						data-sitekey="${siteKey}" data-callback="onDataCallback"  
						data-expired-callback="onDataExpiredCallback"  
						data-error-callback="onDataErrorCallback">
					</div>
					<div>
						<button 
							onclick="onCancel()"
							class="btn" type="button">
							${cancelButtonText}
						</button> 
					</div>
					</div>
				</div>
			</body>
			</html>`;
		return originalForm;
	};
	return (
		<WebView
			originWhitelist={['*']}
			mixedContentMode={'always'}
			onMessage={onMessage}
			javaScriptEnabled
			useWebKit={true}
			injectedJavaScript={patchPostMessageJsCode}
			automaticallyAdjustContentInsets
			style={[{ backgroundColor: 'transparent', width: '100%' }, style]}
			source={{
				html: generateTheWebViewContent(siteKey),
				baseUrl: `${url}`,
			}}
		/>
	);
}

export default GoogleReCaptcha;
