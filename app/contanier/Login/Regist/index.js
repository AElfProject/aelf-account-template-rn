import React, {memo, useCallback} from 'react';
import {
  CommonHeader,
  Touchable,
  Input,
  CommonButton,
} from '../../../components';
import i18n from 'i18n-js';
import {useSetState} from '../../util/hooks';
import {View, Keyboard} from 'react-native';
import GStyle from '../../../assets/theme/gstyle';
import styles from './styles';
import {TextM} from '../../../components/CommonText';
import {passwordReg} from '../../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationService from '../../../utils/navigationService';
import NamePasswordTips from '../NamePasswordTips';
const Regist = () => {
  const [state, setState] = useSetState({
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
    const re = /^[a-zA-Z0-9]+$/;
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

  const registered = useCallback(() => {
    Keyboard.dismiss();
    navigationService.navigate('GenerateQRCode');
  }, []);
  const {userNameRule, pswRule, pswConfirmRule, pswDifferent} = state;
  return (
    <View style={GStyle.container}>
      <CommonHeader title={i18n.t('login.regist')} canBack />
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
            placeholderTextColor="#999"
          />
          {userNameRule && (
            <TextM style={styles.pswTip}>{i18n.t('login.nameErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.newPsw')}
            onBlur={pswBlur}
            onChangeText={psw => setState({psw})}
            placeholder={i18n.t('login.pleaseEnt')}
            placeholderTextColor="#999"
          />
          {pswRule && (
            <TextM style={styles.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          <Input
            secureTextEntry={true}
            leftTitleBox={[styles.leftTitleBox, {marginBottom: 10}]}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.confirmPsw')}
            onBlur={pswComfirmBlur}
            onChangeText={pswConfirm => setState({pswConfirm})}
            placeholder={i18n.t('login.pleaseEnt')}
            placeholderTextColor="#999"
          />
          {pswConfirmRule && (
            <TextM style={styles.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          {pswDifferent && (
            <TextM style={styles.pswTip}>{i18n.t('login.inconsistent')}</TextM>
          )}
          <NamePasswordTips />
          <CommonButton
            // disabled
            onPress={registered}
            title={i18n.t('login.regist')}
            style={styles.buttonStyles}
          />
        </Touchable>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(Regist);
