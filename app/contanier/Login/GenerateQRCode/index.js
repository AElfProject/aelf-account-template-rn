import React, {memo, useRef} from 'react';
import {View, Text} from 'react-native';
import GStyle from '../../../assets/theme/gstyle';
import {CommonHeader, CommonButton, MyQRCode} from '../../../components';
import styles from './styles';
import {screenshots} from '../../util';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
const GenerateQRCode = () => {
  const viewShot = useRef();

  return (
    <View style={GStyle.container}>
      <CommonHeader
        title={i18n.t('login.backupQRCode.title')}
        canBack
        rightTitle={i18n.t('login.backupQRCode.later')}
        rightOnPress={() => navigationService.navigate('SetTransactionPsw')}
      />
      <View ref={viewShot} style={styles.shotView}>
        <MyQRCode />
        <Text>Account: </Text>
      </View>
      <CommonButton
        title={i18n.t('login.backupQRCode.saveQRCode')}
        onPress={() => screenshots(viewShot)}
      />
    </View>
  );
};
export default memo(GenerateQRCode);
