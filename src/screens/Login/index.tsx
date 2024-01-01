import React, { Component } from 'react'
import { View, Text, Image, Modal } from 'react-native'
import Container from '../../components/Container';
import styles from "./styles"
import { FORGET, HOME, REGISTER } from '../../navigation/routeNames';
import CustomButton from '../../components/Button';
import HyperLink from '../../components/HyperLink';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp } from '../../helpers/theme';
import { connect } from 'react-redux';
import { loginSuccess, loginUser } from '../../redux/actions/auth';
import { Feather } from '@expo/vector-icons';
import { ApiCall } from '../../helpers/apicall';
import DeviceVerification from '../../components/DeviceVerification';
import { CustomActivityIndicator } from '../../components/CustomActivityIndicator';
import { TNotification, NotificationPosition, NotificationType } from '../../helpers/notification';
import { User } from '../../models/user';
import { CustomCaptcha } from '../../components/Captcha';
import TwoFALogin from '../../components/TwoFALogin';
import { Rules } from '../../helpers/rules';
import { Storage } from '../../helpers/storage';
import { Header, HeaderLeft, HeaderRight, HeaderTopWrap } from '../../components/Header';
import { BackButton, NextButton } from '../../components/BackButton';
import { IUser } from '../../helpers/interfaces';
import CustomInput from '../../components/CustomInput';
import GradientText from '../../components/LinerGradient';




interface Props {
    loginSuccess?: any,
    navigation?: any
}

interface State {
    deviceAuthorized: boolean,
    showPassword: boolean,
    showPasswordIcon: any,
    user: {},
    loader: boolean,
    forgetPasswordVisible: boolean,
    deviceVerification: boolean,
    modalVisible: boolean,
    tfa: string,
    emailph: any,
    sessionValid?: any
    passwordph: any
    model: {
        email: string,
        password: string
    } | any
    formErrors: {
        email: string,
        password: string
    },
    isTfaNavigate: boolean
}

class Login extends Component<Props, State>{
    private apiCaller = ApiCall.getInstance();
    private storage = Storage.getInstance();
    private captchaRef: any;
    private passwordRef: any;
    private validEmailRegex = RegExp(Rules.Email);

    constructor(props: Props) {
        super(props)

        this.state = {
            model: {
                email: '',
                password: ''
            },
            deviceAuthorized: false,
            showPassword: true,
            showPasswordIcon: <Feather name="eye" size={fontsSize.f17} color={theme.colors.textmutedDark} />,
            user: {},
            loader: false,
            forgetPasswordVisible: false,
            deviceVerification: false,
            modalVisible: false,
            sessionValid: false,
            tfa: '',
            formErrors: {
                email: '',
                password: ''
            },
            emailph: 'Email...',
            passwordph: 'Password...',
            isTfaNavigate: false
        }
    }
    touchAuth = async () => {
        const user = User.getInstance();
        if (user.localAuth.isActive()) {
            if (await user.localAuth.authenticate()) {
                await user.init();
                if (user.isLoggedIn())
                    this.props.loginSuccess();
                else
                    TNotification.show("s_session_expired", NotificationType.Danger)
            }
        } else {
            TNotification.show("touch_id_disabled", NotificationType.Danger);
        }
    };
    private focusListener: any;
    private mount: boolean = false;
    componentDidMount() {
        this.mount = true;
        this.focusListener = this.props.navigation.addListener('focus', async () => {
            if (!this.mount) return;
            this.captchaRef.hide();
            this.sessionStateDecide();
            
            this.setState({
                deviceVerification: false,
                forgetPasswordVisible: false,
                modalVisible: this.state.isTfaNavigate
            });
        });
    }
    sessionStateDecide = async () => {
        if (User.getInstance().localAuth.isActive()) {
            let sessionInfo = await User.getInstance().pendingSessionInfo()
            if (sessionInfo.isSessionExpired) {
                this.setState({ sessionValid: false })
            } else {
                this.setState({ sessionValid: true })
            }
        }
    }
    componentWillUnmount() {
        this.mount = false;
        if (this.focusListener)
            this.focusListener();
    }
    modalUI = () => {
        return (
            <TwoFALogin sendSms={this.sendSms} onNavigate={this.onTfaNavigate} onClose={this.onTFAClose} type={this.state.tfa}></TwoFALogin>
        )
    }
    togglePassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    onInputBlur = (field: string, msg: string) => {
        if (!this.state.model[field]) {
            field === 'email' ? this.setState({ emailph: 'Email...' }) : this.setState({ passwordph: 'Password...' })
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    [field]: msg
                }
            });

        }
    }

    onSubmit = async () => {
        this.loginNow();
        // if (await this.isNotEmpty()) {
        //     if (this.validateForm(this.state.formErrors)) {
        //         this.captchaRef.showCaptcha()
        //     }
        // } else {
        //     this.validateForm(this.state.formErrors);
        // }
    }

    onTfaNavigate = () => {
        this.setState({
            isTfaNavigate: true
        })
    }

    setTFA = async (type: string) => {

        await this.setState({
            tfa: type
        })
    }

    loginNow = async (recaptchaResponse: any = null, geetestResponse: any = null) => {
        let req = { Email: this.state.model.email, Password: this.state.model.password }; //1week expiry
        req['TkExpiry'] = 86400 * 7;
        // if (recaptchaResponse != null) {
        //     req['x-ra'] = 1;
        //     req.RecaptchaResponse = recaptchaResponse;
        // } else if (geetestResponse != null) {
        //     req['x-ra'] = 0;
        //     req = Object.assign({}, req, geetestResponse);
        // }
        // const exist = await this.storage.exists('gcampaign')
        // if (exist) {
        //     req['_gcampaign'] = await this.storage.get('gcampaign');
        // }


        // req['DeviceToken'] = await this.storage.get('deviceToken');
        const user = User.getInstance();

        await user.logout(false);

        this.setState({
            loader: true
        })
        let resp = await this.apiCaller.post('account/login', req, true);
        if (!resp) {
            TNotification.show('some_thing_wrong', NotificationType.Danger, NotificationPosition.Top)
             
            // resp = await this.apiCaller.post('account/login', req, true);
        }
        let result: IUser = resp.Result;

        if (resp.Status) {
            if (!result.DeviceAuthorized) {
                this.setState({
                    user: {
                        ...this.state.user,
                        Id: result.UserId,
                        DeviceId: result.DeviceId,
                        DeviceStatus: result.DeviceAuthorized
                    },
                    deviceVerification: true,
                    loader: false
                })
                return;
            }
            result.TI = result.TokenId;
            // const user = User.getInstance();
            user.save1(result);
            if (result.TwoFa) {
                // await User.getInstance().save(result);
                const user = User.getInstance();
                user.setTwoFaType(result.TwoFactor);

                if (result.TwoFactor === 1) {
                    await this.setTFA('google')
                }
                else if (result.TwoFactor === 2) {
                    // this.sendSms();
                    await this.setTFA('sms')
                }
                else if (result.TwoFactor == 3) {
                    await this.setTFA('both')
                }
                // sleep(100)
                await this.setState({
                    modalVisible: true
                })
                await this.setState({
                    loader: false
                })
                return;
            }
            result.TI = result.TokenId;
            await user.updateAuthVerify(1)

            await user.save(result);

            
            
            // const respTp = await this.apiCaller.postAuth('proscheduler/get-is-pro-trader', {}, true);

            // await User.getInstance().updateTopTraderValue(respTp.Result[0]);
            // await this.setState({ //no need to disable, since it will auto remove on redirect
            //     loader: false
            // })
            
            this.props.loginSuccess();
            // if (await this.storage.exists('simplexInfo')) {
            //     this.props.navigation.navigate(BUY_CRYPTO);
            // } else {
            this.props.navigation.navigate(HOME);
            // }
        } else {
            await this.setState({
                loader: false
            });
            if (resp.Status) {
                TNotification.show(resp.Message, NotificationType.Success, NotificationPosition.Top)

            } else {
                TNotification.show(resp.Message, NotificationType.Danger, NotificationPosition.Top)

            }
        }
        // }
    }
    sendSms = () => {
        const body = { 'Submit': '1' };
        const endPoint = 'account/get-verification-sms';
        this.apiCaller.halfAuth(endPoint, body, true).then((json) => {
            if (json['Status']) {

                TNotification.show(json.Message, NotificationType.SuccessModal)
            } else {
                TNotification.show(json.Message, NotificationType.DangerModal)
            }
        }).catch(error => {

        });
    }

    createTwoFaRestriction = async (event: any) => {
        this.loginNow(event, null);
    }

    onMessageGoogle = async (event: any) => {
        this.loginNow(event, null);
    }

    onMessageGeetest = (resp: any) => {
        this.loginNow(null, resp);
    }

    onSubmitEditing = (ref: any) => {
        ref?.focus()
    }

    validateForm = (errors: any) => {
        let valid = true;
        Object.values(errors).forEach((val: any) => val.length > 0 && (valid = false));
        return valid;
    };

    onChangeText = async (field: string, value: string) => {
        let formErrors: any = this.state.formErrors;

        await this.setState({
            model: { ...this.state.model, [field]: value }
        })

        switch (field) {
            case "email":
                formErrors.email = value.length === 0 ? "email_is_required" : (this.validEmailRegex.test(value) ? "" : 'Email is invalid');
                break;
            case "password":
                formErrors.password = value.length === 0 ? "password_is_required" : "";
                break;
            default:
                break;
        }

        await this.setState({ ...formErrors, [field]: value });

    };

    isNotEmpty = async () => {
        const { email, password } = this.state.model;
        let isNoError = true;

        if (!email) {
            await this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    email: "email_is_required"
                }
            });
            isNoError = false;
        }
        if (!password) {
            await this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    password: "password_is_required"
                }
            });
            isNoError = false;
        }

        return isNoError;
    };

    onForgetClose = () => {
        this.setState({
            forgetPasswordVisible: false
        })
    }

    onTFAClose = () => {
        this.setState({
            modalVisible: false,
            isTfaNavigate: false
        })
    }

    onDeviceClose = () => {
        this.setState({
            deviceVerification: false
        })
    }

    render() {
        return (
            <>
                <View style={styles.mainwrapper}>
                    <Header style={{ backgroundColor: theme.colors.white }}>
                        <HeaderTopWrap>
                            <HeaderLeft>
                                <BackButton />
                            </HeaderLeft>
                            <HeaderRight>
                                <NextButton title='register' goNext={() => this.props.navigation.navigate(REGISTER)} />
                            </HeaderRight>
                        </HeaderTopWrap>
                    </Header>
                    {this.state.loader && <CustomActivityIndicator color={theme.colors.white} />}
                    <Container keyboardShouldPersistTaps='handled' style={styles.container}>
                        {/* <Heading text="welcome" subText="back_n" /> */}
                        <View>
                            {/* <Text style={styles.txthead}>{__('welcome')} <GradientText style={styles.txthead}>{__('back_n')}</GradientText></Text> */}
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.txthead}>Welcome </Text>
                                <GradientText style={styles.txthead}>Back</GradientText>
                            </View>
                        </View>
                        <CustomInput
                            returnKeyType="next"
                            // onChangeText={(value: string) => this.onInputChange({ name: 'Rate', value })}
                            placeholder='Email Address'
                            onBlur={() => {
                                this.onInputBlur('email', 'email_is_required')
                            }}
                            blurOnSubmit={false}
                            // returnKeyType="next"
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            // iconRight={<Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain' }} source={require("../../assets/images/icons/email.png")} />}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        {/* <Input
                        inputLabel={__("email_id")}
                        onBlur={() => {
                            this.onInputBlur('email', 'email_is_required')
                        }}
                        blurOnSubmit={false}
                        returnKeyType="next"
                        onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                        onChangeText={(text: string) => this.onChangeText('email', text)}
                        iconRight={<Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain' }} source={require("../../assets/images/icons/email.png")} />}
                        showError={this.state.formErrors.email.length > 0}
                        inputError={this.state.formErrors.email}
                        onFocus={() => this.setState({ emailph: '' })}
                    />  */}
                        <Text style={styles.txtlabel}>Password</Text>
                        <CustomInput
                            returnKeyType="done"
                            // onChangeText={(value: string) => this.onInputChange({ name: 'Rate', value })}
                            placeholder='Password'
                            onBlur={() => {
                                this.onInputBlur('password', 'password_is_required')
                            }}
                            inputRef={ref => this.passwordRef = ref}
                            // returnKeyType="done"
                            onChangeText={(text: string) => this.onChangeText('password', text)}
                            secureTextEntry={this.state.showPassword}
                            onFocus={() => this.setState({ passwordph: '' })}
                            iconRight={<Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain' }} source={this.state.showPassword ? require("../../assets/images/icons/eye-slash.png") : require("../../assets/images/icons/eye-on3x.png")} />}
                            onPressIconRight={this.togglePassword}
                            labelBotmRight={<HyperLink style={{ color: theme.colors._primary.darkest, fontSize: fontSizes(14), fontFamily: theme.fonts.geomanistMedium }} title='Forgot Your Password' onPress={() => this.props.navigation.navigate(FORGET)} />}
                            showError={this.state.formErrors.password.length > 0}
                            inputError={this.state.formErrors.password}
                        />
                        {/* <Input
                        inputLabel={__("password")}
                        onBlur={() => {
                            this.onInputBlur('password', 'password_is_required')
                        }}
                        inputRef={this.passwordRef}
                        returnKeyType="done"
                        onChangeText={(text: string) => this.onChangeText('password', text)}
                        secureTextEntry={this.state.showPassword}
                        onFocus={() => this.setState({ passwordph: '' })}
                        iconRight={<Image style={{ width: WidthToDp(24), height: HeightToDp(24), resizeMode: 'contain' }} source={this.state.showPassword ? require("../../assets/images/icons/eye-slash.png") : require("../../assets/images/icons/eye-on3x.png")} />}
                        onPressIconRight={this.togglePassword}
                        labelBotmRight={<HyperLink title={__("forgot_password")} onPress={() => this.props.navigation.navigate(FORGET)} />}
                        showError={this.state.formErrors.password.length > 0}
                        inputError={this.state.formErrors.password}
                    />  */}
                        <CustomButton style={{ marginTop: HeightToDp(20), borderRadius: 4, }} title="c_sign_in" onPress={this.onSubmit} />
                        <CustomCaptcha ref={(ref: any) => this.captchaRef = ref} onMessageGoogle={this.onMessageGoogle} onMessageGeetest={this.onMessageGeetest} />
                        {/* <View style={styles.touchId}>
                            <TouchableOpacity onPress={this.touchAuth}>
                                <Image style={styles.touchIdImg} source={require('../../assets/images/icons/touch_id.png')} />
                                <Paragraph style={styles.text}>Use Touch ID</Paragraph>
                            </TouchableOpacity>
                        </View> */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={this.onTFAClose}
                        >
                            <View style={{ flex: 1 }}>
                                {this.modalUI()}
                            </View>


                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.deviceVerification}
                            onRequestClose={this.onDeviceClose}
                        >
                            <DeviceVerification onClose={() => this.setState({ deviceVerification: false })} user={this.state.user} />
                        </Modal>
                        <View style={styles.pt48}>
                            <Text style={styles.txt1}>Don't have and account? <HyperLink style={{ color: theme.colors._primary.darkest, fontSize: fontSizes(14), fontFamily: theme.fonts.geomanistMedium }} title='Sign Up' onPress={() => this.props.navigation.navigate(REGISTER)} /></Text>
                        </View>
                    </Container>
                </View>

            </>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (val: any) => dispatch(loginUser(val)),
        loginSuccess: () => dispatch(loginSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login as any)



