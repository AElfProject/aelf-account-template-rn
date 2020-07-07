import Spinner from 'react-native-spinkit';
import {ImageBackground} from 'react-native';
import * as Localization from 'expo-localization';
import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {pTd} from '../../utils';
import {languageList} from '../../i18n/config';
import {launchScreen} from '../../assets/images/indes';
import settingsActions, {settingsSelectors} from '../../redux/settingsRedux';
import navigationService from '../../utils/navigationService';
const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column-reverse',
  paddingTop: pTd(500),
};
const time = 2000;
const Referreal = () => {
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  const language = useSelector(settingsSelectors.getLanguage);
  useEffect(() => {
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
      localLanguages = localLanguages.slice(0, 2);
      if (localLanguages === 'zh') {
        localLanguages = 'zh-cn';
      }
      if (languageList.includes(localLanguages)) {
        changeLanguage(localLanguages);
      }
    }
    setTimeout(() => {
      navigationService.reset('Entrance');
    }, time);
  }, [changeLanguage, language]);
  return (
    <ImageBackground style={style} source={launchScreen}>
      <Spinner type={'Circle'} color={'#733cb5'} size={60} />
    </ImageBackground>
  );
};
export default Referreal;
