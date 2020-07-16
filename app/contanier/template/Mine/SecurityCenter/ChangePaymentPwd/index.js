import React, {memo, useMemo, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {GStyle, Colors} from '../../../../../assets/theme';
import {
  CommonHeader,
  ActionSheet,
  CommonButton,
} from '../../../../../components/template';
import {TextL} from '../../../../../components/template/CommonText';
import Spinner from 'react-native-spinkit';
import {pTd} from '../../../../../utils/common';
import navigationService from '../../../../../utils/common/navigationService';
import {isIos} from '../../../../../utils/common/device';
import {useSelector, shallowEqual} from 'react-redux';
import {userSelectors} from '../../../../../redux/userRedux';

const ChangePaymentPwd = () => {
  const [safety, setSafety] = useState(null);
  const userName = useSelector(userSelectors.getUserName, shallowEqual);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (true) {
        setSafety(true);
      } else {
        setSafety(false);
        ActionSheet.alert('不符合要求，无法修改密码', null, [
          {title: '退出', onPress: () => navigationService.goBack()},
          {title: '重新检测', onPress: () => {}},
        ]);
      }
    }, 1000);
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);
  const Components = useMemo(() => {
    if (safety === null) {
      return (
        <View style={styles.checkingBox}>
          <TextL>正在进行安全检测</TextL>
          <Spinner
            type={'ThreeBounce'}
            color={'#000000'}
            size={pTd(40)}
            style={styles.spinnerStyle}
          />
        </View>
      );
    }
    if (safety === false) {
      return null;
    }
    if (safety === true) {
      return (
        <View style={GStyle.container}>
          <TextL style={styles.tips}>
            您是否记得账号{userName}当前使用的支付密码
          </TextL>
          <View style={styles.buttonBox}>
            <CommonButton
              title="不记得"
              style={styles.notButtonStyle}
              onPress={() => {
                navigationService.navigate('SecondChangePaymentPwd', {
                  remember: false,
                });
              }}
            />
            <CommonButton
              title="记得"
              style={styles.buttonStyle}
              onPress={() => {
                navigationService.navigate('SecondChangePaymentPwd', {
                  remember: true,
                });
              }}
            />
          </View>
        </View>
      );
    }
  }, [safety, userName]);
  return (
    <View style={GStyle.container}>
      <CommonHeader title="修改支付密码" canBack />
      <View style={styles.container}>{Components}</View>
    </View>
  );
};

export default memo(ChangePaymentPwd);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinnerStyle: {
    marginLeft: 3,
    marginBottom: isIos ? pTd(10) : 0,
    alignSelf: 'center',
  },
  tips: {
    textAlign: 'center',
    margin: pTd(80),
    marginHorizontal: pTd(100),
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: '40%',
  },
  notButtonStyle: {
    width: '40%',
    backgroundColor: Colors.disabledColor,
  },
});
