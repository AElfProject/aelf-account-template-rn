import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../assets/theme';
import {CommonHeader, ListItem} from '../../../../components/template';
import i18n from 'i18n-js';
import {pTd} from '../../../../utils/common';
import {TextL} from '../../../../components/template/CommonText';
const AboutUs = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title={i18n.t('mineModule.helpCenterT')} canBack>
          <TextL style={styles.textMargin}>常见问题</TextL>
          <View style={styles.box}>
            <View style={styles.subtitleBox}>
              <TextL style={styles.subtitleStyle}>账户安全</TextL>
            </View>
            <TextL style={styles.textStyle}>什么是二维码账号？</TextL>
            <TextL style={styles.textStyle}>
              为什么无法修改二维码账号密码？
            </TextL>
            <TextL style={styles.textStyle}>为什么要进行身份认证？</TextL>
            <TextL style={styles.textStyle}>发起交易为什么要授权？</TextL>
          </View>
          <View style={styles.bottomBox}>
            <View style={styles.subtitleBox}>
              <TextL style={styles.subtitleStyle}>交易规则</TextL>
            </View>
            <TextL style={styles.textStyle}>如何收款？</TextL>
            <TextL style={styles.textStyle}>如何转账？</TextL>
            <TextL style={styles.textStyle}>如何进行法币交易？</TextL>
            <TextL style={styles.textStyle}>如何进行跨链转账？</TextL>
          </View>
          <TextL style={styles.textMargin}>问题反馈</TextL>
          <ListItem title="提交反馈" />
        </CommonHeader>
      </View>
    );
  }, []);
  return Components;
};

export default memo(AboutUs);
const styles = StyleSheet.create({
  box: {
    padding: pTd(20),
    backgroundColor: 'white',
  },
  bottomBox: {
    padding: pTd(20),
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
    backgroundColor: 'white',
  },
  itemBox: {
    marginBottom: pTd(20),
    borderBottomWidth: 0,
  },
  textMargin: {
    marginLeft: pTd(20),
    marginTop: pTd(40),
    marginBottom: pTd(20),
    fontWeight: 'bold',
  },
  subtitleBox: {
    height: pTd(60),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    overflow: 'hidden',
  },
  subtitleStyle: {
    color: Colors.fontGray,
  },
  textStyle: {
    marginTop: pTd(20),
    color: Colors.fontGray,
  },
});
