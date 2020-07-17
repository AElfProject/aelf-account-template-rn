import React, {memo, useCallback, useEffect} from 'react';
import {launchScreen} from '../../../../assets/images';
import {View, ImageBackground} from 'react-native';
import {
  CommonButton,
  ActionSheet,
  CommonHeader,
} from '../../../../components/template';
import navigationService from '../../../../utils/common/navigationService';
import {TextL, TextM} from '../../../../components/template/CommonText';
import styles from './styles';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/AntDesign';
import {localLanguage} from '../../../../i18n/config';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import settingsActions, {
  settingsSelectors,
} from '../../../../redux/settingsRedux';
import {ADVANCED} from '../../../../config/constant';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {GStyle} from '../../../../assets/theme';
import {permissionDenied} from '../../../../utils/pages';
import {userSelectors} from '../../../../redux/userRedux';
const Entrance = props => {
  const {addAccount} = props.route.params || {};
  const dispatch = useDispatch();
  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  const userList = useSelector(userSelectors.getUserList, shallowEqual);
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
  const getLocation = useCallback(
    () => dispatch(settingsActions.getLocation()),
    [dispatch],
  );
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  const login = async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    if (status !== 'granted') {
      permissionDenied(
        i18n.t('permission.camera'),
        i18n.t('login.scanCodeLogin'),
      );
    } else {
      navigationService.navigate('QRCodeScan');
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
            title={i18n.t('login.addAccount')}
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
              title={i18n.t('login.register')}
              onPress={() => {
                navigationService.navigate('Registered');
              }}
            />
            <View style={styles.premiumBox}>
              <TextL
                onPress={() => navigationService.navigate('AdvancedLogin')}
                style={styles.premium}>
                {i18n.t('login.premiumTips')}
              </TextL>
              {userList && userList.length ? (
                <View style={styles.loginAccountBox}>
                  <TextL
                    onPress={() =>
                      navigationService.navigate('LoginAccountLogin')
                    }
                    style={styles.loginAccount}>
                    {i18n.t('login.loginAccountLoginTip')}
                  </TextL>
                </View>
              ) : null}
            </View>
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
