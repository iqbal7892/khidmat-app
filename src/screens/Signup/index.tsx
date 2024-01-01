import React, { Component, createRef } from 'react'
import { View, Text, Linking, Image, Modal, ScrollView, RefreshControl } from 'react-native'
import styles from "./styles"
import { BackgroundFixed } from '../../components/Background';
import Container from '../../components/Container';
import Input from '../../components/TextInput';
import CustomButton from '../../components/Button';
import { Feather } from '@expo/vector-icons';
import { fontsSize, fontSizes, HeightToDp, theme, WidthToDp, StyleSheetManager } from '../../helpers/theme';
import CustomeCheckbox from '../../components/Checkbox';
import ValidationComponent from 'react-native-form-validator';
import ConfirmGoogleCaptcha from '../../components/Captcha/GoogleReCaptcha';
import { AppSettings } from '../../config/config';
import { ApiCall } from '../../helpers/apicall';
import { Captcha } from '../../helpers/captcha';
import { TNotification, NotificationPosition, NotificationType } from '../../helpers/notification';
import { CustomActivityIndicator } from '../../components/CustomActivityIndicator';
import EmailVerification from '../../components/EmailVerification';
import { CustomCaptcha } from '../../components/Captcha';
import { Rules } from '../../helpers/rules';
import { FORGET, HOME, LOGIN, PRIVACYPOLICY, REGISTER, SUPPORT, TERMSCONDITION } from '../../navigation/routeNames';
import { Storage } from '../../helpers/storage';
// import { ApiResponse } from '../../models/dtrade';
import { BackButton, NextButton } from '../../components/BackButton';
import { HeaderTopWrap, HeaderLeft, HeaderRight, Header } from '../../components/Header';
import Heading from '../../components/Heading';
import HyperLink from '../../components/HyperLink';
import CustomPrivacy from '../../components/Modals/PrivacyPolicy';
import TermsCondition from '../../components/Modals/Services';
import { ApiResponse } from '../../helpers/interfaces';
import CustomInput from '../../components/CustomInput';
import GradientText from '../../components/LinerGradient';
import DistrictPicker from '../../components/DistrictPicker';
import ProvincePicker from '../../components/ProvincePicker';



interface Props {
    navigation?: any,
}

interface State {
    navigation?: any,
    model: {
        email: string,
        password: string,
        confirmPassword: string,
        termCondition: boolean
    } | any,
    isSelected: boolean,
    activebtn: boolean,
    showPassword: boolean,
    loader: boolean,
    user: {},
    verifyAccount: boolean,
    showPasswordIcon: any,
    showConfirmPassword: boolean,
    showConfirmPasswordIcon: any,
    modalVisible: boolean,
    emailph: any,
    passwordph: any,
    cnfrmpasswordph: any,
    formErrors: {
        email: string,
        password: string,
        confirmPassword: string,
        termCondition: string
    },
    passwordValidation?: {
        characterLimit: boolean,
        characterContainNumber: boolean,
        characterLowerUpper: boolean,
    }
    countryBlocked: boolean;
    termModal: boolean;
    privacyModal: boolean;
}


class Signup extends Component<Props, State> {
    private navigation;
    private apiCaller = ApiCall.getInstance();
    private passwordRef = React.createRef()
    private districtRef = null;
    private captchaRef: any = createRef();
    private validEmailRegex = RegExp(Rules.Email);
    private validPasswordRegex = RegExp(Rules.Password);


    constructor(props: Props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation;
        this.state = {
            model: {
                email: '',
                password: '',
                confirmPassword: '',
                termCondition: false
            },
            formErrors: {
                email: '',
                password: '',
                confirmPassword: '',
                termCondition: ''
            },
            passwordValidation: {
                characterLimit: false,
                characterContainNumber: false,
                characterLowerUpper: false,
            },
            isSelected: false,
            activebtn: false,
            showPassword: true,
            loader: false,
            user: {},
            verifyAccount: false,
            showPasswordIcon: <Feather name="eye-off" size={fontsSize.f17} color={theme.colors.textmutedDark} />,
            showConfirmPassword: true,
            showConfirmPasswordIcon: <Feather name="eye-off" size={fontsSize.f17} color={theme.colors.textmutedDark} />,
            modalVisible: false,
            emailph: 'Email...',
            passwordph: 'Password...',
            cnfrmpasswordph: 'Confirm Password',
            countryBlocked: false,
            termModal: false,
            privacyModal: false

        }


    }
    componentDidMount() {
        this.checkCountryBlocked();
    }
    togglePassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
        if (this.state.showPassword) {
            this.setState({ showPasswordIcon: <Feather name="eye" size={fontsSize.f17} color={theme.colors.text} /> });
        }
        else {
            this.setState({ showPasswordIcon: <Feather name="eye-off" size={fontsSize.f17} color={theme.colors.textmutedDark} /> });
        }
    }
    checkStrongPassword = async(val:string) => {
        const regexleast8 = /^.{8,}$/;
        const regexnumberorspecial = /^(?=.*[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\/\\])/;
        const regexlowerupper = /^(?=.*[a-z])(?=.*[A-Z])/;
        var least8=false
        var numberorspecial=false
        var lowerupper=false
        if(regexleast8.test(val))
            least8=true
        if(regexnumberorspecial.test(val))
            numberorspecial=true
        if(regexlowerupper.test(val))
            lowerupper=true
        
        await this.setState({
            passwordValidation: {
                characterLimit: least8,
                characterContainNumber: numberorspecial,
                characterLowerUpper: lowerupper,
            }
        });
    }
    toggleConfirmPassword = () => {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
        if (this.state.showConfirmPassword) {
            this.setState({ showConfirmPasswordIcon: <Feather name="eye" size={fontsSize.f17} color={theme.colors.text} /> });
        }
        else {
            this.setState({ showConfirmPasswordIcon: <Feather name="eye-off" size={fontsSize.f17} color={theme.colors.textmutedDark} /> });
        }
    }

    isStrongPassword = () => {
       return this.state.passwordValidation.characterLimit && this.state.passwordValidation.characterContainNumber && this.state.passwordValidation.characterLowerUpper
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
                formErrors.password = value.length === 0 ? "password_is_required" : (this.validPasswordRegex.test(value) ? "" : 'Password length is Eight');
                this.checkStrongPassword(value);
                formErrors.confirmPassword = this.state.model.confirmPassword.length > 0 ? ((this.state.model.password !== this.state.model.confirmPassword) ? 'Password not matched' : "") : "";
                break;
            case "confirmPassword":
                formErrors.confirmPassword = value.length === 0 ? "confirm_password_required" : ((this.state.model.password !== this.state.model.confirmPassword) ? 'Password not matched' : "");
                break;
            default:
                break;
        }

        await this.setState({ ...formErrors, [field]: value });

    };

    isNotEmpty = async () => {
        const { email, password, confirmPassword, termCondition } = this.state.model;
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
        if (!confirmPassword) {
            await this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    confirmPassword: "confirm_password_required"
                }
            });
            isNoError = false;
        }

        if (!termCondition) {
            await this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    termCondition: "s_tick_above"
                }
            });
            isNoError = false;
        }

        return isNoError;
    };

    handleTerms = (check: any) => {
        if (check) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    termCondition: ''
                }
            });
        }
        this.setState({
            model: { ...this.state.model, termCondition: check }
        })
    }

    onInputBlur = (field: string, msg: string) => {
        if (!this.state.model[field]) {
            if (field === 'email') {
                this.setState({ emailph: 'Email...' })
            }
            else if (field === 'password') {
                this.checkStrongPassword('');
                this.setState({ passwordph: 'Password...' })
            }
            else {
                this.setState({ cnfrmpasswordph: 'Confirm Password' })
            }
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    [field]: msg
                }
            });
        }

    }

    onSubmit = async () => {
        if (await this.isNotEmpty()) {
            if (this.validateForm(this.state.formErrors)) {
                this.captchaRef.showCaptcha();
                this.setState({ activebtn: true })
            }
        } else {
            this.validateForm(this.state.formErrors);
        }
    }

    sendForm = async (recaptchaResponse: any = null, geetestResponse: any = null) => {

        let req: any = { Email: this.state.model.email, Password: this.state.model.password, ConfirmPassword: this.state.model.confirmPassword };

        // if (recaptchaResponse != null) {
        //     req['x-ra'] = 1;
        //     req.RecaptchaResponse = recaptchaResponse;
        // } else if (geetestResponse != null) {
        //     req['x-ra'] = 0;
        //     req = Object.assign({}, req, geetestResponse);
        // }
        // const storage = Storage.getInstance();
        // const refExist = await storage.tryGet('ref');
        // if (refExist.hasValue) {
        //     const ref: any = refExist.value
        //     req['_ref'] = Number(JSON.parse(ref));
        // } else {
        //     req['_ref'] = 0;
        // }
        // const gcompaign = await storage.tryGet('gcampaign');
        // if (gcompaign.hasValue) {
        //     req['_gcampaign'] = gcompaign.value;
        // }
        // const trackExist = await storage.tryGet('_track');
        // if (trackExist.hasValue) {
        //     req['_track'] = trackExist.value;
        // }
        // const afftrackExist = await storage.tryGet('aff_track');
        // if (afftrackExist.hasValue) {
        //     const track = afftrackExist.value;
        //     if (afftrackExist.hasValue) {
        //         const aff_track = JSON.parse(track);
        //         req['_transaction_id'] = aff_track.transaction_id;
        //         req['_offer_id'] = aff_track.offer_id;
        //         req['_aff_id'] = aff_track.aff_id;
        //     }
        // }
        await this.setState({ loader: true })

        this.apiCaller.post('account/register', req, true).then(async (resp) => {
            this.setState({ loader: false })
            if (resp?.Status) {
                this.setState({
                    verifyAccount: true,
                    user: resp.Result,
                    emailph: 'Email...',
                    passwordph: 'Password...',
                    cnfrmpasswordph: 'Confirm Password',
                    model: {
                        email: '',
                        password: '',
                        confirmPassword: '',
                        termCondition: false
                    },
                    formErrors: {
                        email: '',
                        password: '',
                        confirmPassword: '',
                        termCondition: ''
                    }
                })
            } else {
                TNotification.show(resp.Message, NotificationType.Danger, NotificationPosition.Top)
            }
        });

    }

    onMessageGoogle = async (event: any) => {
        this.sendForm(event, null);
    }

    onMessageGeetest = (resp: any) => {
        this.sendForm(null, resp);
    }

    onSubmitEditing = (ref: any) => {
        ref?.focus()
    }

    onClose = () => {
        this.setState({
            verifyAccount: false
        });
    }
    onSupport = () => {
        this.setState({
            verifyAccount: false
        });
        this.navigation.navigate(SUPPORT)
    }
    checkCountryBlocked = async () => {
        const api: ApiResponse = await this.apiCaller.get('account/get-blocked-country', {});
        // api.Status = true;
        if (api.Status) {
            this.setState({ countryBlocked: api.Status })
        }

    }

    openPrivacy = () => {
        this.navigation.navigate(PRIVACYPOLICY)
        // this.setState({ privacyModal: true })
    }

    closePrivacy = () => {
        this.setState({ privacyModal: false })
    }

    openTerm = () => {
        // this.setState({ termModal: true })
        this.navigation.navigate(TERMSCONDITION)
    }

    closeTerm = () => {
        this.setState({ termModal: false })
    }

    onProvinceChange = (id: any) => {
        this.districtRef.getDistricts(id)
    }

    onDistrictChange = (id: any) => {
        console.log('item', id)
    }

    render() {
        return (
            <View style={styles.mainwrapper}>
                <Header style={{ backgroundColor: theme.colors.white, paddingBottom: HeightToDp(10) }}>
                    <HeaderTopWrap>
                        <HeaderLeft>
                            <BackButton />
                        </HeaderLeft>
                        <HeaderRight>
                            <NextButton title='Login' goNext={() => this.props.navigation.navigate(LOGIN)} />
                        </HeaderRight>
                    </HeaderTopWrap>
                </Header>
                {this.state.loader && <CustomActivityIndicator />}
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{paddingBottom: HeightToDp(50)}}>
                    <Container style={styles.content}>
                        <View style={styles.pb42}>
                            <Text style={styles.txthead}>Create </Text>
                            <GradientText style={styles.txthead}>Account!</GradientText>
                        </View>
                        <Text style={styles.txtlabel}>Name</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Name'
                            onBlur={() => {
                                this.onInputBlur('email', 'Name is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Email Address</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Email Address'
                            onBlur={() => {
                                this.onInputBlur('email', 'Email is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Whatsapp</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Whatsapp'
                            onBlur={() => {
                                this.onInputBlur('email', 'Whatsapp is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Province</Text>
                        <ProvincePicker onItemChange={this.onProvinceChange} />
                        <Text style={styles.txtlabel}>District</Text>
                        <DistrictPicker ref={ref => this.districtRef = ref} onItemChange={this.onDistrictChange} />
                        <Text style={styles.txtlabel}>Profile</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Profile'
                            onBlur={() => {
                                this.onInputBlur('email', 'Profile is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Office Address</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Office Address'
                            onBlur={() => {
                                this.onInputBlur('email', 'Office Address is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Bar License</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Bar License'
                            onBlur={() => {
                                this.onInputBlur('email', 'Bar License is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        <Text style={styles.txtlabel}>Experience (Years)</Text>
                        <CustomInput
                            returnKeyType="next"
                            placeholder='Experience (Years)'
                            onBlur={() => {
                                this.onInputBlur('email', 'Experience is Required')
                            }}
                            blurOnSubmit={false}
                            onSubmitEditing={() => this.onSubmitEditing(this.passwordRef)}
                            onChangeText={(text: string) => this.onChangeText('email', text)}
                            showError={this.state.formErrors.email.length > 0}
                            inputError={this.state.formErrors.email}
                            onFocus={() => this.setState({ emailph: '' })}
                        />
                        
                        <CustomButton style={{ marginTop: HeightToDp(40), borderRadius: 4 }} title='Signup' onPress={this.onSubmit} />
                    </Container>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.verifyAccount}
                    onRequestClose={this.onClose}
                >
                    <EmailVerification onClose={this.onClose} onSupport={this.onSupport} user={this.state.user} />
                </Modal>
            </View>

        )
    }
}
export default Signup
