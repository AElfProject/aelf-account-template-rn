import React, {memo, useRef} from 'react';
import {Colors, GStyle} from '../../../../assets/theme';
import {
  CommonHeader,
  MyQRCode,
  CommonButton,
  ListItem,
} from '../../../../components/template';
import styles from './styles';
import {View, Text} from 'react-native';
import {TextL, TextM} from '../../../../components/template/CommonText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'i18n-js';
import {screenshots} from '../../../../utils/pages';
import navigationService from '../../../../utils/common/navigationService';
const PersonalCenter = () => {
  const viewShot = useRef();
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title="个人中心" canBack>
        <View style={styles.box}>
          <View style={styles.topBox}>
            <View ref={viewShot} style={styles.shotView}>
              <TextL
                onPress={() => navigationService.navigate('EditUserName')}
                style={styles.userNameStyle}>
                用户名
                <FontAwesome name="edit" color={Colors.primaryColor} />
              </TextL>
              <MyQRCode />
            </View>
            <CommonButton
              style={styles.buttonStyle}
              title={i18n.t('login.backupQRCode.saveQRCode')}
              onPress={() => screenshots(viewShot)}
            />
            <View style={styles.addressBox}>
              <TextL style={styles.addressStyles}>Address: </TextL>
              <TextM style={styles.addressTips}>
                此二维码是您的账号，丢失二维码等同于丢失账号，您的资产将无法找回，请务必妥善保管您的二维码账号
              </TextM>
            </View>
          </View>
          <ListItem style={styles.premium} title="高级账户" />
          <ListItem
            style={styles.authentication}
            title="身份认证"
            subtitle={
              <Text>
                <Entypo name="circle-with-cross" />
                未完善
              </Text>
            }
            subtitleStyle={styles.subtitleStyle}
          />
          <View style={styles.tipsBox}>
            <TextM style={styles.tips}>
              {
                '完成身份信息认证，可获得以下权限：\n* 可进行单笔高于2,000 CNY或累积金额大于10,000 CNY的法币交易'
              }
            </TextM>
          </View>
        </View>
      </CommonHeader>
    </View>
  );
};

export default memo(PersonalCenter);
