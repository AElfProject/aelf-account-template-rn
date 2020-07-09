import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {GStyle} from '../../../assets/theme';
import {CommonHeader, ListItem} from '../../../components';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
const SecurityCenter = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title={i18n.t('mineModule.securityCenterT')} canBack />
        <ListItem
          title="支付设置"
          onPress={() => navigationService.navigate('PaymentSettings')}
        />
        <ListItem title="解锁设置" />
      </View>
    );
  }, []);
  return Components;
};

export default memo(SecurityCenter);
