'use strict';
import React, {useCallback, useRef, useState} from 'react';
import OverlayModal from '../OverlayModal';
import {View, Text, StyleSheet} from 'react-native';
import Touchable from '../Touchable';
import {Colors, GStyle} from '../../assets/theme';
import Password from '../Password';
import {pTd} from '../../utils';
import KeyboardSpace from '../KeyboardSpace';
import {ScrollView} from 'react-native-gesture-handler';
import {TextL, TextM} from '../CommonText';
import {settingsSelectors} from '../../redux/settingsRedux';
import {useSelector} from 'react-redux';
import i18n from 'i18n-js';
import {isIos} from '../../utils/device';
const Components = props => {
  const [pswTip, setPswTip] = useState(false);
  const payPsw = useSelector(settingsSelectors.getPayPsw);
  const {callBack} = props;
  const intervalRef = useRef();
  const onChange = useCallback(value => {
    intervalRef.current = value;
  }, []);

  const determine = useCallback(() => {
    if (payPsw === intervalRef.current) {
      callBack && callBack(true);
      OverlayModal.hide();
    } else {
      setPswTip(true);
    }
  }, [intervalRef, payPsw, callBack]);

  const cancel = useCallback(() => {
    callBack && callBack(false);
    OverlayModal.hide();
  }, [callBack]);
  return (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <TextL>{i18n.t('pleasePayPsw')}</TextL>
        <Password
          maxLength={6}
          style={GStyle.marginArg(pTd(50), 0, pTd(30), 0)}
          onChange={value => onChange(value)}
        />
        {pswTip && <TextM style={GStyle.pswTip}>{i18n.t('pswErr')}</TextM>}
        <View style={styles.buttonsBox}>
          <Touchable onPress={cancel} style={styles.buttonItem}>
            <Text style={styles.cancelText}>{i18n.t('cancel')}</Text>
          </Touchable>
          <Touchable onPress={determine} style={styles.buttonItem}>
            <Text style={styles.buttonText}>{i18n.t('determine')}</Text>
          </Touchable>
        </View>
        {isIos ? <KeyboardSpace /> : null}
      </View>
    </ScrollView>
  );
};
const show = callBack => {
  OverlayModal.show(<Components callBack={callBack} />, {
    style: styles.style,
    modal: true,
    containerStyle: styles.containerStyle,
  });
};
export default {
  show,
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
    borderRightColor: '#e5e5e5',
    overflow: 'hidden',
  },
  buttonsBox: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  buttonText: {
    color: Colors.primaryColor,
    fontSize: 16,
  },
  cancelText: {
    color: '#a5a5a5',
    fontSize: 16,
  },
});
