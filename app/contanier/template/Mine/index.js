import React, {useEffect, memo, useMemo, useCallback} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {GStyle, Colors} from '../../../assets/theme';
import styles from './styles';
import {connect, useSelector, shallowEqual} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import {pTd} from '../../../utils/common';
import {TextL} from '../../../components/template/CommonText';
import {Touchable, ListItem} from '../../../components/template';
import navigationService from '../../../utils/common/navigationService';
import i18n from 'i18n-js';
import userActions, {userSelectors} from '../../../redux/userRedux';
import config from '../../../config';
import {useFocusEffect} from '@react-navigation/native';
const {tokenSymbol} = config;
const Tool = () => {
  const language = useSelector(settingsSelectors.getLanguage, shallowEqual);
  const Element = useMemo(() => {
    const List = [
      {
        title: i18n.t('mineModule.transactionManagementT'),
        onPress: () => navigationService.navigate('TransactionManagement'),
      },
      {
        title: i18n.t('mineModule.authorizeManagementT'),
        onPress: () => navigationService.navigate('AuthorizeManagement'),
      },
      {
        title: i18n.t('mineModule.securityCenterT'),
        onPress: () => navigationService.navigate('SecurityCenter'),
      },
      {
        title: i18n.t('mineModule.generalSettingT'),
        onPress: () => navigationService.navigate('GeneralSettings'),
        style: {marginTop: 10},
      },
      {
        title: i18n.t('mineModule.helpCenterT'),
        onPress: () => navigationService.navigate('HelpCenter'),
      },
      {
        title: i18n.t('mineModule.aboutUsT'),
        onPress: () => navigationService.navigate('AboutUs'),
        subtitle: i18n.t('mineModule.version', {
          number: Constants.nativeAppVersion,
        }),
      },
      {
        title: i18n.t('mineModule.accountManagementT'),
        onPress: () => navigationService.navigate('AccountManagement'),
        style: {marginTop: 10},
      },
    ];
    return (
      <ScrollView>
        <View style={GStyle.secondContainer}>
          <View style={styles.toolBox}>
            <Touchable
              onPress={() => navigationService.navigate('Receive')}
              style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-down"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.collect')}</TextL>
            </Touchable>
            <Touchable
              onPress={() => navigationService.navigate('Transfer')}
              style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-up"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.transfer')}</TextL>
            </Touchable>
            {/* <Touchable style={styles.toolItem}>
              <FontAwesome5
                name="plus-circle"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>{i18n.t('mineModule.exchange')}</TextL>
            </Touchable> */}
          </View>
          {List.map((item, index) => (
            <ListItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    );
    //We need to know when we switch languages
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  return Element;
};
const Mine = props => {
  const {
    navigation,
    changeBarStyle,
    userInfo,
    getUserBalance,
    onAppInit,
  } = props;
  const {userName, balance, address} = userInfo;
  console.log(userInfo, '=====userInfo');
  console.log(JSON.stringify(userInfo.keystore));
  useFocusEffect(
    useCallback(() => {
      if (!address) {
        navigationService.reset('Entrance');
      }
    }, [address]),
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      changeBarStyle('light-content');
      StatusBar.setBarStyle('light-content');
    });
    const blurUnsubscribe = navigation.addListener('blur', () => {
      changeBarStyle('dark-content');
      StatusBar.setBarStyle('dark-content');
    });
    onAppInit();
    getUserBalance();
    const timer = setInterval(() => {
      getUserBalance();
      onAppInit();
    }, 10000);
    return () => {
      timer && clearTimeout(timer);
      unsubscribe();
      blurUnsubscribe();
    };
  }, [navigation, changeBarStyle, getUserBalance, onAppInit]);
  return (
    <View style={GStyle.container}>
      <Touchable
        activeOpacity={1}
        onPress={() => navigationService.navigate('PersonalCenter')}
        style={styles.topBGStyles}>
        <TextL style={styles.textTitle}>
          {i18n.t('mineModule.username')}: {userName}
        </TextL>
        <Icon name="qrcode" size={pTd(180)} color="#fff" />
      </Touchable>
      <View style={styles.balanceBox}>
        <TextL style={styles.textTitle}>
          {i18n.t('mineModule.balance')}:{balance} {tokenSymbol}
        </TextL>
      </View>
      <Tool />
    </View>
  );
};
const mapStateToProps = state => {
  return {
    language: settingsSelectors.getLanguage(state),
    barStyle: settingsSelectors.getBarStyle(state),
    userInfo: userSelectors.getUserInfo(state),
  };
};
const mapDispatchToProps = {
  changeBarStyle: settingsActions.changeBarStyle,
  getUserBalance: userActions.getUserBalance,
  onAppInit: userActions.onAppInit,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Mine));
