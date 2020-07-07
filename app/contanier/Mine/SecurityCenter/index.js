import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {GStyle} from '../../../assets/theme';
import {CommonHeader, ListItem} from '../../../components';
import navigationService from '../../../utils/navigationService';
const SecurityCenter = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title="安全中心" canBack />
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
