import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import GoogleReCaptcha from './GoogleReCaptcha';
import PropTypes from 'prop-types';
import { StyleSheetManager } from '../../../helpers/theme';

const { width, height } = Dimensions.get('window');

class ConfirmGoogleCaptcha extends Component {
    state = {
        show: false
    }
    show = () => {
        this.setState({ show: true });
    }
    hide = () => {
        this.setState({ show: false });
    }
    static propTypes: { siteKey: PropTypes.Validator<string>; baseUrl: PropTypes.Requireable<string>; onMessage: PropTypes.Requireable<(...args: any[]) => any>; languageCode: PropTypes.Requireable<string>; cancelButtonText: PropTypes.Requireable<string>; };
    render() {
        let { show } = this.state;
        let { siteKey, baseUrl, languageCode, onMessage, cancelButtonText }:any = this.props;
        return (
            <Modal
                useNativeDriver
                hideModalContentWhileAnimating
                deviceHeight={height}
                deviceWidth={width}
                style={styles.modal}
                animationIn="fadeIn"
                animationOut='fadeOut'
                isVisible={show}>
                <View style={styles.wrapper}>
                    <GoogleReCaptcha
                        url={baseUrl}
                        siteKey={siteKey}
                        onMessage={onMessage}
                        languageCode={languageCode}
                        cancelButtonText={cancelButtonText}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheetManager.Create({
    text: { fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 10 },
    modal: { margin: 0 },
    wrapper: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', overflow: 'hidden' }
});
ConfirmGoogleCaptcha.propTypes = {
    siteKey: PropTypes.string.isRequired,
    baseUrl: PropTypes.string,
    onMessage: PropTypes.func,
    languageCode: PropTypes.string,
    cancelButtonText: PropTypes.string
}
export default ConfirmGoogleCaptcha;
