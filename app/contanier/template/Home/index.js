import i18n from 'i18n-js';
import React, {memo} from 'react';
import {CommonHeader, CommonButton} from '../../../components/template';
import {ScrollView} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {settingsSelectors} from '../../../redux/settingsRedux';
const Home = () => {
  useSelector(settingsSelectors.getLanguage, shallowEqual); //Language status is controlled with redux
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
