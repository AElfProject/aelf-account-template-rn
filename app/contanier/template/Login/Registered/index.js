import React, {memo, useCallback} from 'react';
import {
  CommonHeader,
  Touchable,
  Input,
  CommonButton,
} from '../../../../components/template';
import i18n from 'i18n-js';
import {useSetState} from '../../../../utils/pages/hooks';
import {View, Keyboard} from 'react-native';
import GStyle from '../../../../assets/theme/gStyle';
import styles from './styles';
import {TextM} from '../../../../components/template/CommonText';
import {PASSWORD_REG, USERNAME_REG} from '../../../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../../../../utils/common/navigationService';
import NamePasswordTips from '../NamePasswordTips';
const Registered = () => {
  const [state, setState] = useSetState({
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

  const registered = useCallback(() => {
    Keyboard.dismiss();
    navigationService.navigate('GenerateQRCode');
  }, []);
  const {userNameRule, pwRule, pwConfirmRule, pwDifferent} = state;
  return (
    <View style={GStyle.container}>
      <CommonHeader title={i18n.t('login.register')} canBack />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={0}
        extraHeight={50}>
        <Touchable
          style={styles.container}
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}>
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
            onPress={registered}
            title={i18n.t('login.register')}
            style={styles.buttonStyles}
          />
        </Touchable>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(Registered);
