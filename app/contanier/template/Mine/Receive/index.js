import React, {memo, useRef} from 'react';
import {GStyle} from '../../../../assets/theme';
import {
  CommonHeader,
  MyQRCode,
  CommonButton,
} from '../../../../components/template';
import styles from './styles';
import {View} from 'react-native';
import {TextL} from '../../../../components/template/CommonText';
import i18n from 'i18n-js';
import {screenshots} from '../../../../utils/pages';
const Receive = () => {
  const viewShot = useRef();
  return (
    <View style={GStyle.container}>
      <CommonHeader title={i18n.t('mineModule.collect')} canBack>
        <View style={styles.box}>
          <View style={styles.topBox}>
            <View ref={viewShot} style={styles.shotView}>
              <TextL style={styles.userNameStyle}>扫二维码，转入Token</TextL>
              <MyQRCode />
            </View>
            <CommonButton
              style={styles.buttonStyle}
              title={i18n.t('login.backupQRCode.saveQRCode')}
              onPress={() => screenshots(viewShot)}
            />
          </View>
          <View style={styles.addressBox}>
            <TextL style={styles.addressStyles}>Address: </TextL>
          </View>
        </View>
      </CommonHeader>
    </View>
  );
};

export default memo(Receive);
