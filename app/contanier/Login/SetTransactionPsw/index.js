import React, {memo, useCallback} from 'react';
import {
  CommonHeader,
  Password,
  CommonToast,
  ActionSheet,
} from '../../../components';
import {View, Keyboard, StyleSheet} from 'react-native';
import {useSetState} from '../../util/hooks';
import {TextM} from '../../../components/CommonText';
import {Colors, GStyle} from '../../../assets/theme';
import {pTd} from '../../../utils';
import * as LocalAuthentication from 'expo-local-authentication';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
import {touchAuth} from '../../util';
import {useDispatch} from 'react-redux';
import settingsActions from '../../../redux/settingsRedux';
const SetTransactionPsw = () => {
  const dispatch = useDispatch();
  const changePayPsw = useCallback(
    payPsw => dispatch(settingsActions.changePayPsw(payPsw)),
    [dispatch],
  );
  const changeBiometrics = useCallback(
    biometrics => dispatch(settingsActions.changeBiometrics(biometrics)),
    [dispatch],
  );
  const [state, setState] = useSetState({
    tip: i18n.t('setPsw.setPsw1'),
    type: 'transactionPsw',
    transactionPsw: '',
    transactionPswConfirm: '',
  });
  const {type, transactionPsw, tip} = state;
  const onChange = useCallback(
    (types, text) => {
      setState({[types]: text});
      switch (types) {
        case 'transactionPsw':
          if (text.length === 6) {
            setState({
              type: 'transactionPswConfirm',
              tip: i18n.t('setPsw.setPsw2'),
            });
          }
          break;
        case 'transactionPswConfirm':
          if (text.length === 6 && text === transactionPsw) {
            CommonToast.success(i18n.t('setSuc'));
            changePayPsw(text);
            setToken();
          } else if (text.length === 6 && text !== transactionPsw) {
            CommonToast.fail(i18n.t('setPsw.pswInconsistent'));
          }
          break;
      }
    },
    [setState, transactionPsw, changePayPsw, setToken],
  );
  const navigate = useCallback(
    value => {
      changeBiometrics(value);
      navigationService.reset('Tab');
    },
    [changeBiometrics],
  );
  const setToken = useCallback(async () => {
    try {
      const results = await LocalAuthentication.hasHardwareAsync();
      if (results) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (enrolled) {
          Keyboard.dismiss();
          ActionSheet.alert(i18n.t('setBiometrics'), null, [
            {
              title: i18n.t('determine'),
              onPress: () => {
                touchAuth()
                  .then(() => {
                    navigate(true);
                    CommonToast.success(i18n.t('setSuc'));
                  })
                  .catch(() => {
                    navigate(false);
                    CommonToast.fail(i18n.t('setFail'));
                  });
              },
            },
            {
              title: i18n.t('later'),
              type: 'cancel',
              onPress: () => {
                navigate(false);
              },
            },
          ]);
        } else {
          navigate(false);
        }
      } else {
        navigate(false);
      }
    } catch (error) {
      navigate(false);
    }
  }, [navigate]);
  return (
    <View style={GStyle.container}>
      <CommonHeader title={i18n.t('setPsw.title')} canBack />
      <View style={styles.box}>
        <TextM style={{color: Colors.primaryColor}}>{tip}</TextM>
        <Password
          maxLength={6}
          key={type}
          style={GStyle.marginArg(pTd(50), 0, pTd(30), 0)}
          onChange={value => onChange(type, value)}
        />
      </View>
    </View>
  );
};
export default memo(SetTransactionPsw);
const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pTd(100),
  },
});
