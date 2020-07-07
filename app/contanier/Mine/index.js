import React, {useEffect, memo, useMemo} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {GStyle, Colors} from '../../assets/theme';
import styles from './styles';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import settingsActions, {settingsSelectors} from '../../redux/settingsRedux';
import {pTd} from '../../utils';
import {TextL} from '../../components/CommonText';
import {Touchable, ListItem} from '../../components';
import navigationService from '../../utils/navigationService';
const Tool = () => {
  const Element = useMemo(() => {
    const List = [
      {
        title: '交易管理',
        onPress: () => {},
      },
      {
        title: '授权管理',
        onPress: () => {},
      },
      {
        title: '安全中心',
        onPress: () => {},
      },
      {
        title: '地址簿',
        onPress: () => {},
      },
      {
        title: '通用设置',
        onPress: () => {},
        container: {marginTop: 10},
      },
      {
        title: '帮助中心',
        onPress: () => {},
      },
      {
        title: '关于我们',
        onPress: () => {},
        subtitle: '版本号:1.0',
      },
      {
        title: '账号管理',
        onPress: () => {},
        container: {marginTop: 10},
      },
    ];
    return (
      <ScrollView>
        <View style={styles.toolContainer}>
          <View style={styles.toolBox}>
            <Touchable style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-down"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>收款</TextL>
            </Touchable>
            <Touchable style={styles.toolItem}>
              <FontAwesome5
                name="arrow-circle-up"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>转账</TextL>
            </Touchable>
            <Touchable style={styles.toolItem}>
              <FontAwesome5
                name="plus-circle"
                size={30}
                color={Colors.primaryColor}
              />
              <TextL>兑换</TextL>
            </Touchable>
          </View>
          {List.map((item, index) => (
            <ListItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    );
  }, []);
  return Element;
};
const Mine = props => {
  const {navigation, changeBarStyle} = props;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      changeBarStyle('light-content');
      StatusBar.setBarStyle('light-content');
    });
    const blurUnsubscribe = navigation.addListener('blur', () => {
      changeBarStyle('dark-content');
      StatusBar.setBarStyle('dark-content');
    });
    return () => {
      unsubscribe();
      blurUnsubscribe();
    };
  }, [navigation, changeBarStyle]);
  return (
    <View style={GStyle.container}>
      <Touchable
        activeOpacity={1}
        onPress={() => navigationService.navigate('PersonalCenter')}
        style={styles.topBGStyles}>
        <TextL style={styles.textTitle}>User Name</TextL>
        <Icon name="qrcode" size={pTd(180)} color="#fff" />
      </Touchable>
      <View style={styles.balanceBox}>
        <TextL style={styles.textTitle}>Balance</TextL>
      </View>
      <Tool />
    </View>
  );
};
const mapStateToProps = state => {
  return {
    barStyle: settingsSelectors.getBarStyle(state),
  };
};
const mapDispatchToProps = {
  changeBarStyle: settingsActions.changeBarStyle,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Mine));
