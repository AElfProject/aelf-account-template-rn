'use strict';
import React, {useCallback, useRef, useState, useMemo} from 'react';
import OverlayModal from '../OverlayModal';
import {View, Text, StyleSheet} from 'react-native';
import Touchable from '../Touchable';
import {Colors, GStyle} from '../../../assets/theme';
import Password from '../Password';
import {pTd} from '../../../utils/common';
import KeyboardSpace from '../KeyboardSpace';
import {ScrollView} from 'react-native-gesture-handler';
import {TextL, TextM} from '../CommonText';
import {settingsSelectors} from '../../../redux/settingsRedux';
import {useSelector, shallowEqual} from 'react-redux';
import i18n from 'i18n-js';
import {isIos} from '../../../utils/common/device';
import Input from '../Input';
const BottomView = props => {
  const {cancel, determine} = props;
  const Components = useMemo(
    () => (
      <View style={styles.buttonsBox}>
        <Touchable onPress={cancel} style={styles.buttonItem}>
          <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
        </Touchable>
        <Touchable onPress={determine} style={styles.buttonItem}>
          <Text style={styles.buttonText}>{i18n.t('determine')}</Text>
        </Touchable>
      </View>
    ),
    [cancel, determine],
  );
  return Components;
};
const PayComponents = props => {
  const [pwTip, setPwTip] = useState(false);
  const payPw = useSelector(settingsSelectors.getPayPw, shallowEqual);
  const {callBack} = props;
  const intervalRef = useRef();
  const onChange = useCallback(value => {
    intervalRef.current = value;
  }, []);

  const determine = useCallback(() => {
    if (payPw === intervalRef.current) {
      callBack && callBack(true);
      OverlayModal.hide();
    } else {
      setPwTip(true);
    }
  }, [intervalRef, payPw, callBack]);

  const cancel = useCallback(() => {
    callBack && callBack(false);
    OverlayModal.hide();
  }, [callBack]);
  return (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <TextL>{i18n.t('pleasePayPw')}</TextL>
        <Password
          maxLength={6}
          style={GStyle.marginArg(pTd(50), 0, pTd(30), 0)}
          onChange={value => onChange(value)}
        />
        {pwTip && (
          <TextM style={[GStyle.pwTip, styles.tips]}>{i18n.t('pwErr')}</TextM>
        )}
        <BottomView cancel={cancel} determine={determine} />
        {isIos ? <KeyboardSpace /> : null}
      </View>
    </ScrollView>
  );
};
const PasswordComponents = props => {
  const [pwTip, setPwTip] = useState(false);
  const {callBack} = props;
  const intervalRef = useRef();
  const onChange = useCallback(value => {
    intervalRef.current = value;
  }, []);

  const determine = useCallback(() => {
    setPwTip(true);
  }, []);

  const cancel = useCallback(() => {
    callBack && callBack(false);
    OverlayModal.hide();
  }, [callBack]);
  return (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <TextL>{i18n.t('pleasePw', {account: ''})}</TextL>
        <Input
          autoFocus
          secureTextEntry={true}
          leftTitleBox={styles.leftTitleBox}
          leftTextStyle={styles.leftTextStyle}
          leftTitle={i18n.t('login.pw')}
          onChangeText={onChange}
          placeholder={i18n.t('login.pleaseEnt')}
        />
        {pwTip && (
          <TextM style={[GStyle.pwTip, styles.tips]}>
            {i18n.t('accountPwErr')}
          </TextM>
        )}
        <BottomView cancel={cancel} determine={determine} />
        {isIos ? <KeyboardSpace /> : null}
      </View>
    </ScrollView>
  );
};
const payShow = callBack => {
  OverlayModal.show(<PayComponents callBack={callBack} />, {
    style: styles.style,
    modal: true,
    containerStyle: styles.containerStyle,
  });
};
const passwordShow = callBack => {
  OverlayModal.show(<PasswordComponents callBack={callBack} />, {
    style: styles.style,
    modal: true,
    containerStyle: styles.containerStyle,
  });
};
export default {
  payShow,
  passwordShow,
};
const styles = StyleSheet.create({
  container: {
    paddingTop: pTd(50),
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  style: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  containerStyle: {},
  buttonItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.borderColor,
    overflow: 'hidden',
  },
  buttonsBox: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor,
  },
  buttonText: {
    color: Colors.primaryColor,
    fontSize: 16,
  },
  cancelText: {
    color: Colors.fontGray,
    fontSize: 16,
  },
  leftTextStyle: {
    width: 80,
  },
  leftTitleBox: {
    width: '80%',
    marginVertical: pTd(40),
    marginBottom: pTd(30),
  },
  tips: {
    flex: 1,
    marginBottom: pTd(20),
  },
});
