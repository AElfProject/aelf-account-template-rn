import Spinner from 'react-native-spinkit';
import {ImageBackground} from 'react-native';
import * as Localization from 'expo-localization';
import React, {useEffect, useCallback, memo} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {pTd} from '../../../utils/common';
import {languageList} from '../../../i18n/config';
import {launchScreen} from '../../../assets/images';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import navigationService from '../../../utils/common/navigationService';
import {Colors} from '../../../assets/theme';
import {userSelectors} from '../../../redux/userRedux';

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column-reverse',
  paddingTop: pTd(500),
};
const time = 2000;
const Referral = () => {
  const userInfo = useSelector(userSelectors.getUserInfo, shallowEqual);
  const securityLock = useSelector(
    settingsSelectors.getSecurityLock,
    shallowEqual,
  );
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  const language = useSelector(settingsSelectors.getLanguage, shallowEqual);
  useEffect(() => {
    const {address} = userInfo;
    SplashScreen.hide();
    if (language) {
      if (languageList.includes(language)) {
        changeLanguage(language);
      }
    } else {
      const languages = Localization.locale;
      let localLanguages = languages;
      if (Array.isArray(languages)) {
        localLanguages = languages[0];
      }
      //The local language may be en-xxx or zh-xxx, we intercept the first two to match
      localLanguages = localLanguages.slice(0, 2);
      if (localLanguages === 'zh') {
        localLanguages = 'zh-cn';
      }
      if (languageList.includes(localLanguages)) {
        changeLanguage(localLanguages);
      }
    }
    setTimeout(() => {
      if (address) {
        navigationService.reset(
          securityLock ? [{name: 'Tab'}, {name: 'SecurityLock'}] : 'Tab',
        );
      } else {
        navigationService.reset('Entrance');
      }
    }, time);
  }, [changeLanguage, language, securityLock, userInfo]);
  return (
    <ImageBackground style={style} source={launchScreen}>
      <Spinner type={'Circle'} color={Colors.primaryColor} size={60} />
    </ImageBackground>
  );
};
export default memo(Referral);
