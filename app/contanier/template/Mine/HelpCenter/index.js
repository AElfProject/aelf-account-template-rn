import React, {memo, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../assets/theme';
import {CommonHeader, ListItem} from '../../../../components/template';
import i18n from 'i18n-js';
import {pTd} from '../../../../utils/common';
import {TextL} from '../../../../components/template/CommonText';
const HelpCenter = () => {
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader title={i18n.t('mineModule.helpCenterT')} canBack>
          <TextL style={styles.textMargin}>
            {i18n.t('mineModule.helpCenter.commonProblem')}
          </TextL>
          <View style={styles.box}>
            <View style={styles.subtitleBox}>
              <TextL style={styles.subtitleStyle}>
                {i18n.t('mineModule.helpCenter.accountSecurity')}
              </TextL>
            </View>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.qRCode')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.qRCodeTip')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.authentication')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.authorized')}
            </TextL>
          </View>
          <View style={styles.bottomBox}>
            <View style={styles.subtitleBox}>
              <TextL style={styles.subtitleStyle}>
                {i18n.t('mineModule.helpCenter.tradingRules')}
              </TextL>
            </View>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.receive')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.transfer')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.fiatCurrency')}
            </TextL>
            <TextL style={styles.textStyle}>
              {i18n.t('mineModule.helpCenter.crossChain')}
            </TextL>
          </View>
          <TextL style={styles.textMargin}>
            {i18n.t('mineModule.helpCenter.feedback')}
          </TextL>
          <ListItem title={i18n.t('mineModule.helpCenter.submitFeedback')} />
        </CommonHeader>
      </View>
    );
  }, []);
  return Components;
};

export default memo(HelpCenter);
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
