import React, {memo, useRef, useMemo} from 'react';
import {View, Text} from 'react-native';
import GStyle from '../../../assets/theme/gstyle';
import {CommonHeader, CommonButton, Touchable} from '../../../components';
import QRCode from 'react-native-qrcode-svg';
import {aelfBlue} from '../../../assets/images/indes';
const QRCodeValue = '1';
import styles from './styles';
import {screenshots} from '../../util';
import {TextM} from '../../../components/CommonText';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
const GenerateQRCode = () => {
  const viewShot = useRef();

  const rightElement = useMemo(
    () => (
      <Touchable
        style={styles.rightBox}
        onPress={() => navigationService.navigate('SetTransactionPsw')}>
        <TextM style={styles.rightStyle}>
          {i18n.t('login.backupQRCode.later')}
        </TextM>
      </Touchable>
    ),
    [],
  );

  return (
    <View style={GStyle.container}>
      <CommonHeader
        title={i18n.t('login.backupQRCode.title')}
        canBack
        rightElement={rightElement}
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
