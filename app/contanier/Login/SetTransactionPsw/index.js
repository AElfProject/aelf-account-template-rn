import React, { memo, useCallback } from 'react';
import { CommonHeader, Password, CommonToast, ActionSheet } from '../../../components';
import { View, Keyboard, StyleSheet } from 'react-native';
import { useSetState } from '../../util/hooks';
import { TextM } from '../../../components/CommonText';
import { Colors } from '../../../assets/theme';
import { pTd } from '../../../utils';
import * as LocalAuthentication from 'expo-local-authentication';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
import { touchAuth } from '../../util';
const SetTransactionPsw = () => {
  const [state, setState] = useSetState({
    tip: i18n.t('setPsw.setPsw1'),
    type: "transactionPsw",
    transactionPsw: "",
    transactionPswConfirm: "",
  });
  const { type, transactionPsw, transactionPswConfirm, tip } = state
  const onChange = useCallback((type, text) => {
    setState({ [type]: text })
    switch (type) {
      case "transactionPsw":
        if (text.length == 6) {
          setState({
            type: "transactionPswConfirm",
            tip: i18n.t('setPsw.setPsw2')
          })
        }
        break;
      case "transactionPswConfirm":
        if ((text.length == 6) && (text == transactionPsw)) {
          CommonToast.success(i18n.t('setSuc'))
          setToken()
        } else if ((text.length == 6) && (text != transactionPsw)) {
          CommonToast.fail(i18n.t('setPsw.pswInconsistent'))
        }
        break;
    }
  }, [type, transactionPsw, transactionPswConfirm])
  const setToken = useCallback(
    async () => {
      try {
        const results = await LocalAuthentication.hasHardwareAsync();
        if (results) {
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          if (enrolled) {
            Keyboard.dismiss()
            ActionSheet.alert(i18n.t('setBiometrics'), null, [
              {
                title: i18n.t('determine'), onPress: () => {
                  touchAuth().then(() => {
                    navigationService.reset('Tab')
                    CommonToast.success(i18n.t('setSuc'))
                  }).catch((err) => {
                    navigationService.reset('Tab')
                    CommonToast.fail(i18n.t('setFail'))
                  })
                }
              },
              {
                title: i18n.t('later'), onPress: () => {
                  navigationService.reset('Tab')
                }
              },
            ])
          } else {
            navigationService.reset('Tab')
          }
        } else {
          navigationService.reset('Tab')
        }
      } catch (error) {
        navigationService.reset('Tab')
      }
    }, []);
  return (
    <View style={Gstyle.container}>
      <CommonHeader title={i18n.t('setPsw.title')} canBack />
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: pTd(100),
      }}>
        <TextM style={{ color: Colors.primaryColor }}>{tip}</TextM>
        <Password
          maxLength={6}
          key={type}
          style={Gstyle.marginArg(pTd(50), 0, pTd(30), 0)}
          onChange={(value) => onChange(type, value)} />
      </View>
    </View>
  );
}
export default memo(SetTransactionPsw);
const styles = StyleSheet.create({
  rightStyle: {
    color: Colors.fontColor,
    marginRight: 15
  }
});