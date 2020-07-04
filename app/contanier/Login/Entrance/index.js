import React, {memo, useCallback, useEffect} from 'react';
import {launchScreen} from '../../../assets/images/indes';
import {View, Image} from 'react-native';
import {CommonButton, ActionSheet} from '../../../components';
import navigationService from '../../../utils/navigationService';
import {TextL, TextM} from '../../../components/CommonText';
import styles from './styles';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/AntDesign';
import {localLanguage} from '../../../i18n/config';
import {useDispatch, useSelector} from 'react-redux';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import {advanced} from '../../../config';
const Entrance = () => {
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  useSelector(settingsSelectors.getLanguage); //Language status is controlled with redux
  const items = localLanguage.map(item => ({
    ...item,
    onPress: value => {
      changeLanguage(value.language);
    },
  }));
  useEffect(() => {
    if (advanced) {
      // ActionSheet.alert(
      //     i18n.t('safetyReminder'),
      //     i18n.t('alert.locationTips'),
      //     [{ title: i18n.t('determine') }]
      // )
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topTool}>
        <TextL
          onPress={() => navigationService.navigate('Tab')}
          style={styles.jLooking}>
          {i18n.t('login.jLook')}
        </TextL>
      </View>
      <Image style={styles.bgStyle} source={launchScreen} />
      <View style={styles.BottomBox}>
        <CommonButton
          title={i18n.t('login.login')}
          style={styles.loginButton}
          onPress={() => {
            navigationService.navigate('Tab');
          }}
        />
        <CommonButton
          title={i18n.t('login.regist')}
          onPress={() => {
            navigationService.navigate('Regist');
          }}
        />
        <TextL style={styles.premium}>{i18n.t('login.premiumTips')}</TextL>
        <TextM
          style={styles.language}
          onPress={() => ActionSheet.show(items, {title: i18n.t('cancel')})}>
          {i18n.t('switchLanguage')}
          <Icon name="caretright" />
        </TextM>
      </View>
    </View>
  );
};
export default memo(Entrance);
