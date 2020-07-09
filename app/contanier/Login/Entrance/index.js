import React, {memo, useCallback, useEffect} from 'react';
import {launchScreen} from '../../../assets/images/indes';
import {View, ImageBackground} from 'react-native';
import {CommonButton, ActionSheet, CommonHeader} from '../../../components';
import navigationService from '../../../utils/navigationService';
import {TextL, TextM} from '../../../components/CommonText';
import styles from './styles';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/AntDesign';
import {localLanguage} from '../../../i18n/config';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import {advanced} from '../../../config';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {GStyle} from '../../../assets/theme';
import {permissionDenied} from '../../util';
const Entrance = props => {
  const {addAccount} = props.route.params || {};
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  useSelector(settingsSelectors.getLanguage, shallowEqual); //Language status is controlled with redux
  const onPress = useCallback(
    value => {
      changeLanguage(value.language);
    },
    [changeLanguage],
  );
  const items = localLanguage.map(item => ({
    ...item,
    onPress: onPress,
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
  const login = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    if (status !== 'granted') {
      permissionDenied(
        i18n.t('permission.camera'),
        i18n.t('login.scanCodeLogin'),
      );
    } else {
      navigationService.navigate('QRCodeLogin');
    }
  };
  return (
    <View style={GStyle.container}>
      <ImageBackground
        resizeMode="contain"
        style={styles.bgStyle}
        source={launchScreen}>
        {addAccount ? (
          <CommonHeader
            title="添加账号"
            headerStyle={styles.headerStyle}
            canBack
          />
        ) : (
          <View style={styles.topTool}>
            <TextL
              onPress={() => navigationService.reset('Tab')}
              style={styles.jLooking}>
              {i18n.t('login.jLook')}
            </TextL>
          </View>
        )}
        <View style={styles.container}>
          <View style={styles.BottomBox}>
            <CommonButton
              title={i18n.t('login.login')}
              style={styles.loginButton}
              onPress={login}
            />
            <CommonButton
              title={i18n.t('login.regist')}
              onPress={() => {
                navigationService.navigate('Regist');
              }}
            />
            <TextL
              onPress={() => navigationService.navigate('AdvancedLogin')}
              style={styles.premium}>
              {i18n.t('login.premiumTips')}
            </TextL>
            <TextM
              style={[styles.language, addAccount && styles.hideLanguage]}
              onPress={
                addAccount
                  ? null
                  : () => ActionSheet.show(items, {title: i18n.t('cancel')})
              }>
              {i18n.t('switchLanguage')}
              <Icon name="caretright" />
            </TextM>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default memo(Entrance);
