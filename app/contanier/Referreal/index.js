import Spinner from 'react-native-spinkit';
import { ImageBackground } from 'react-native';
import * as Localization from 'expo-localization';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pTd } from '../../utils';
import { languageList } from '../../I18n/config';
import { launchScreen } from '../../assets/images/indes';
import { SettingsType } from '../../redux/settingsRedux';
import navigationService from '../../utils/navigationService';
const time = 2000;
const Referreal = () => {
    const dispatch = useDispatch();
    const language = useSelector(SettingsType.getLanguage);
    const changeLanguage = useCallback((language) => dispatch({ type: 'CHANGE_LANGUAGE', language }), [dispatch]);

    useEffect(() => {
        if (language) {
            if (languageList.includes(language)) changeLanguage(language);
        } else {
            const languages = Localization.locale;
            let localLanguages = languages;
            if (Array.isArray(languages)) localLanguages = languages[0];
            localLanguages = localLanguages.slice(0, 2);
            if (localLanguages == 'zh') localLanguages = 'zh-cn';
        }
        setTimeout(() => {
            navigationService.reset('Tab')
        }, time);
    }, [])
    return (
        <ImageBackground style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column-reverse',
            paddingTop: pTd(500)
        }} source={launchScreen}>
            <Spinner
                type={'Circle'}
                color={'#733cb5'}
                size={60} />
        </ImageBackground>
    )
}
export default Referreal