import React, {memo, useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {GStyle, Colors} from '../../../assets/theme';
import {CommonHeader, ListItem} from '../../../components';
import i18n from 'i18n-js';
import {pTd} from '../../../utils';
import {aelfBlue} from '../../../assets/images';
import {TextL} from '../../../components/CommonText';
import Constants from 'expo-constants';
const AboutUs = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title={i18n.t('mineModule.aboutUsT')} canBack />
        <View style={styles.logoBox}>
          <Image source={aelfBlue} style={styles.logoStyle} />
          <TextL>
            {i18n.t('mineModule.version', {
              number: Constants.nativeAppVersion,
            })}
          </TextL>
        </View>
        <ListItem title="检测更新" />
        <ListItem title="版本日志" style={styles.itemBox} />
        <View style={styles.segmentation} />
        <ListItem title="用户服务协议" />
        <ListItem title="用户隐私政策" />
      </View>
    );
  }, []);
  return Components;
};

export default memo(AboutUs);
const styles = StyleSheet.create({
  logoBox: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: pTd(50),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  logoStyle: {
    height: pTd(200),
    width: pTd(200),
    marginBottom: pTd(20),
  },
  itemBox: {
    marginBottom: pTd(20),
    borderBottomWidth: 0,
  },
});
