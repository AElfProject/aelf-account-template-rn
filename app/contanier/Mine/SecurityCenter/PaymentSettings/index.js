import React, {memo, useMemo, useCallback} from 'react';
import {View} from 'react-native';
import {GStyle} from '../../../../assets/theme';
import {
  CommonHeader,
  ListItem,
  ActionSheet,
  CommonToast,
  VerifyPassword,
} from '../../../../components';
import navigationService from '../../../../utils/navigationService';
import settingsActions, {
  settingsSelectors,
} from '../../../../redux/settingsRedux';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import {touchAuth} from '../../../util';
import i18n from 'i18n-js';
const PaymentSettings = () => {
  const dispatch = useDispatch();
  const changeBiometrics = useCallback(
    biometrics => dispatch(settingsActions.changeBiometrics(biometrics)),
    [dispatch],
  );
  const biometrics = useSelector(settingsSelectors.getBiometrics, shallowEqual);
  const onValueChange = useCallback(
    async value => {
      if (value) {
        const results = await LocalAuthentication.hasHardwareAsync();
        if (!results) {
          return CommonToast.text('该设备暂不支持生物识别');
        }
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
          return CommonToast.text('设备未保存指纹或面部数据以用于身份验证');
        }
        VerifyPassword.payShow(success => {
          success &&
            touchAuth()
              .then(() => {
                changeBiometrics(value);
                CommonToast.success(i18n.t('setSuc'));
              })
              .catch(() => {
                changeBiometrics(!value);
                CommonToast.fail(i18n.t('setFail'));
              });
        });
      } else {
        ActionSheet.alert(
          '你确定要关闭生物识别?',
          '关闭后每次支付都无法使用刷脸/指纹支付',
          [
            {title: '确定', onPress: () => changeBiometrics(value)},
            {title: '取消', type: 'cancel'},
          ],
        );
      }
      console.log(value, '====value');
    },
    [changeBiometrics],
  );
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title="支付设置" canBack />
        <ListItem
          title="修改支付密码"
          onPress={() => navigationService.navigate('ChangePaymentPsw')}
        />
        <ListItem
          disabled
          title="生物识别"
          switching
          onValueChange={onValueChange}
          value={biometrics}
        />
      </View>
    );
  }, [biometrics, onValueChange]);
  return Components;
};

export default memo(PaymentSettings);
