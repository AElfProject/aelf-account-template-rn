import i18n from 'i18n-js';
import React, {memo} from 'react';
import {CommonHeader, CommonButton} from '../../../components/template';
import {ScrollView} from 'react-native';
const Home = () => {
  return (
    <>
      <CommonHeader title={i18n.t('home')} />
      <ScrollView>
        <CommonButton title="Examples" disabled />
      </ScrollView>
    </>
  );
};
export default memo(Home);
