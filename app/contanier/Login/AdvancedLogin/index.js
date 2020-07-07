import React, {useCallback} from 'react';
import {
  CommonHeader,
  Touchable,
  Input,
  CommonButton,
} from '../../../components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Keyboard} from 'react-native';
import {GStyle} from '../../../assets/theme';
import NamePasswordTips from '../NamePasswordTips';
import styles, {tabActiveColor} from './styles';
import i18n from 'i18n-js';
import {useSetState} from '../../util/hooks';
import {passwordReg, usernameReg} from '../../../config';
import {TextM} from '../../../components/CommonText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../../../utils/navigationService';
const Tab = createMaterialTopTabNavigator();
const PrivateKeyLogin = () => {
  const [state, setState] = useSetState({
    topInput: '',
    userName: '',
    psw: '',
    pswConfirm: '',
    pswDifferent: false,
    userNameRule: false,
    pswRule: false,
    pswConfirmRule: false,
  });
  const userNameBlur = useCallback(() => {
    const {userName} = state;
    const re = usernameReg;
    if (!re.test(userName)) {
      setState({userNameRule: true});
    } else {
      setState({userNameRule: false});
    }
  }, [setState, state]);
  const pswBlur = useCallback(() => {
    const {psw, pswConfirm} = state;
    const re = passwordReg;
    if (!re.test(psw)) {
      setState({pswRule: true});
    } else {
      setState({pswRule: false});
    }

    if (pswConfirm && psw && pswConfirm !== psw) {
      setState({pswDifferent: true});
    } else if (pswConfirm && psw && pswConfirm === psw) {
      setState({pswDifferent: false});
    }
  }, [setState, state]);
  const pswComfirmBlur = useCallback(() => {
    const {pswConfirm, psw} = state;
    const re = passwordReg;
    if (!re.test(pswConfirm)) {
      setState({pswConfirmRule: true});
    } else {
      setState({pswConfirmRule: false});
    }

    if (pswConfirm && psw && psw !== pswConfirm) {
      setState({pswDifferent: true});
    } else if (pswConfirm && psw && psw === pswConfirm) {
      setState({pswDifferent: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.reset('Tab');
  }, []);
  const {userNameRule, pswRule, pswConfirmRule, pswDifferent} = state;
  return (
    <Touchable
      style={GStyle.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        extraHeight={50}>
        <View style={styles.container}>
          <Input
            multiline={true}
            style={styles.input}
            onChangeText={topInput => setState({topInput})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          <Input
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.userName')}
            onBlur={userNameBlur}
            onChangeText={userName => setState({userName})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {userNameRule && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.nameErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.newPsw')}
            onBlur={pswBlur}
            onChangeText={psw => setState({psw})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pswRule && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={[styles.leftTitleBox, {marginBottom: 10}]}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.confirmPsw')}
            onBlur={pswComfirmBlur}
            onChangeText={pswConfirm => setState({pswConfirm})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pswConfirmRule && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          {pswDifferent && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.inconsistent')}</TextM>
          )}
          <NamePasswordTips />
          <CommonButton
            // disabled
            onPress={login}
            title={i18n.t('login.login')}
            style={styles.buttonStyles}
          />
        </View>
      </KeyboardAwareScrollView>
    </Touchable>
  );
};
const KeystoreLogin = () => {
  const [state, setState] = useSetState({
    topInput: '',
    psw: '',
    pswRule: false,
  });
  const pswBlur = useCallback(() => {
    const {psw, pswConfirm} = state;
    const re = passwordReg;
    if (!re.test(psw)) {
      setState({pswRule: true});
    } else {
      setState({pswRule: false});
    }

    if (pswConfirm && psw && pswConfirm !== psw) {
      setState({pswDifferent: true});
    } else if (pswConfirm && psw && pswConfirm === psw) {
      setState({pswDifferent: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.reset('Tab');
  }, []);
  const {pswRule} = state;
  return (
    <Touchable
      style={GStyle.container}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        extraHeight={50}>
        <View style={styles.container}>
          <Input
            multiline={true}
            style={styles.input}
            onChangeText={topInput => setState({topInput})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.psw')}
            onBlur={pswBlur}
            onChangeText={psw => setState({psw})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pswRule && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          <NamePasswordTips />
          <CommonButton
            // disabled
            onPress={login}
            title={i18n.t('login.login')}
            style={styles.buttonStyles}
          />
        </View>
      </KeyboardAwareScrollView>
    </Touchable>
  );
};
const tabNav = [
  {name: 'Lottery', component: PrivateKeyLogin, options: {title: '私钥'}},
  {
    name: 'WaitingDraw',
    component: KeystoreLogin,
    options: {title: 'Keystore'},
  },
];
const AdvancedLogin = () => {
  return (
    <View style={GStyle.container}>
      <CommonHeader title="高级账户登录" canBack />
      <Tab.Navigator
        lazy={false}
        tabBarOptions={{
          allowFontScaling: false,
          upperCaseLabel: false,
          activeTintColor: 'white',
          inactiveTintColor: tabActiveColor,
          labelStyle: styles.labelStyle,
          indicatorStyle: styles.indicatorStyle,
          style: styles.style,
        }}>
        {tabNav.map((item, index) => {
          return <Tab.Screen key={index} {...item} />;
        })}
      </Tab.Navigator>
    </View>
  );
};
export default AdvancedLogin;
