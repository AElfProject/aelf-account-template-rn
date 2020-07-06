import React, {memo, useRef} from 'react';
import {View, Text} from 'react-native';
import GStyle from '../../../assets/theme/gstyle';
import {CommonHeader, CommonButton} from '../../../components';
import QRCode from 'react-native-qrcode-svg';
import {aelfBlue} from '../../../assets/images/indes';
const QRCodeValue = '1';
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
        <QRCode
          value={QRCodeValue}
          // getRef={(c) => (this.svg = c)}
          logo={aelfBlue}
          logoSize={38}
          logoMargin={4}
          logoBackgroundColor={'#fff'}
          size={200}
        />
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
