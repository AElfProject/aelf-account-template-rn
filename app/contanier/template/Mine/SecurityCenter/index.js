import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {GStyle} from '../../../../assets/theme';
import {CommonHeader, ListItem} from '../../../../components/template';
import navigationService from '../../../../utils/common/navigationService';
import i18n from 'i18n-js';
const SecurityCenter = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title={i18n.t('mineModule.securityCenterT')} canBack />
        <ListItem
          title={i18n.t('mineModule.securityCenter.paySettings')}
          onPress={() => navigationService.navigate('PaymentSettings')}
        />
        {/* <ListItem title={i18n.t('mineModule.securityCenter.unlockSettings')} /> */}
      </View>
    );
  }, []);
  return Components;
};

export default memo(SecurityCenter);
