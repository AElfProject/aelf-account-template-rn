import i18n from 'i18n-js';
import React, {memo} from 'react';
import {CommonHeader} from '../../../../components/template';
import {ScrollView, View, StyleSheet} from 'react-native';
import {TextL, TextTitle} from '../../../../components/template/CommonText';
import termsService from '../config/termsService';
import {GStyle} from '../../../../assets/theme';
import {pTd} from '../../../../utils/common';
import {settingsSelectors} from '../../../../redux/settingsRedux';
import {shallowEqual, useSelector} from 'react-redux';
import {bottomBarHeigth} from '../../../../utils/common/device';
const TermsService = () => {
  const language = useSelector(settingsSelectors.getLanguage, shallowEqual);

  const terms = termsService[language || 'en'];
  return (
    <View style={GStyle.container}>
      <CommonHeader
        canBack
        title={i18n.t('mineModule.aboutUs.serviceAgreement')}
      />
      <ScrollView>
        <View style={styles.container}>
          <TextTitle style={styles.title}>{terms.title}</TextTitle>
          <TextL>{terms.details}</TextL>
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(TermsService);
const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
  container: {
    paddingHorizontal: pTd(15),
    paddingBottom: pTd(30) + bottomBarHeigth,
  },
});
