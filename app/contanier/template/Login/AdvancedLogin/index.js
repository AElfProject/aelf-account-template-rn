import React, {useCallback} from 'react';
import {
  CommonHeader,
  Touchable,
  Input,
  CommonButton,
} from '../../../../components/template';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Keyboard} from 'react-native';
import {GStyle} from '../../../../assets/theme';
import NamePasswordTips from '../NamePasswordTips';
import styles, {tabActiveColor} from './styles';
import i18n from 'i18n-js';
import {useSetState} from '../../../../utils/pages/hooks';
import {PASSWORD_REG, USERNAME_REG} from '../../../../config';
import {TextM} from '../../../../components/template/CommonText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../../../../utils/common/navigationService';
const Tab = createMaterialTopTabNavigator();
const PrivateKeyLogin = () => {
  const [state, setState] = useSetState({
    topInput: '',
    userName: '',
    pw: '',
    pwConfirm: '',
    pwDifferent: false,
    userNameRule: false,
    pwRule: false,
    pwConfirmRule: false,
  });
  const userNameBlur = useCallback(() => {
    const {userName} = state;
    if (!USERNAME_REG.test(userName)) {
      setState({userNameRule: true});
    } else {
      setState({userNameRule: false});
    }
  }, [setState, state]);
  const pwBlur = useCallback(() => {
    const {pw, pwConfirm} = state;
    if (!PASSWORD_REG.test(pw)) {
      setState({pwRule: true});
    } else {
      setState({pwRule: false});
    }

    if (pwConfirm && pw && pwConfirm !== pw) {
      setState({pwDifferent: true});
    } else if (pwConfirm && pw && pwConfirm === pw) {
      setState({pwDifferent: false});
    }
  }, [setState, state]);
  const pwComfirmBlur = useCallback(() => {
    const {pwConfirm, pw} = state;
    if (!PASSWORD_REG.test(pwConfirm)) {
      setState({pwConfirmRule: true});
    } else {
      setState({pwConfirmRule: false});
    }

    if (pwConfirm && pw && pw !== pwConfirm) {
      setState({pwDifferent: true});
    } else if (pwConfirm && pw && pw === pwConfirm) {
      setState({pwDifferent: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.reset('Tab');
  }, []);
  const {userNameRule, pwRule, pwConfirmRule, pwDifferent} = state;
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
            <TextM style={GStyle.pwTip}>{i18n.t('login.nameErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.newPw')}
            onBlur={pwBlur}
            onChangeText={pw => setState({pw})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwFormatErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={[styles.leftTitleBox, {marginBottom: 10}]}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.confirmPw')}
            onBlur={pwComfirmBlur}
            onChangeText={pwConfirm => setState({pwConfirm})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwConfirmRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwFormatErr')}</TextM>
          )}
          {pwDifferent && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.inconsistent')}</TextM>
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
    pw: '',
    pwRule: false,
  });
  const pwBlur = useCallback(() => {
    const {pw, pwConfirm} = state;
    if (!PASSWORD_REG.test(pw)) {
      setState({pwRule: true});
    } else {
      setState({pwRule: false});
    }

    if (pwConfirm && pw && pwConfirm !== pw) {
      setState({pwDifferent: true});
    } else if (pwConfirm && pw && pwConfirm === pw) {
      setState({pwDifferent: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.reset('Tab');
  }, []);
  const {pwRule} = state;
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
            leftTitle={i18n.t('login.pw')}
            onBlur={pwBlur}
            onChangeText={pw => setState({pw})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwFormatErr')}</TextM>
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
    options: {title: 'KeyStore'},
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
