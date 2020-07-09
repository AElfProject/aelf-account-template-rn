import React, {memo, useMemo, useCallback} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {GStyle, Colors} from '../../../assets/theme';
import {CommonHeader, Input, Touchable} from '../../../components';
import i18n from 'i18n-js';
import {TextL} from '../../../components/CommonText';
import {pTd} from '../../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../../../utils/navigationService';
import {useSetState} from '../../util/hooks';
import {useFocusEffect} from '@react-navigation/native';
const Transfer = props => {
  const {params} = props.route || {};
  const [state, setState] = useSetState({
    address: '',
  });
  useFocusEffect(
    useCallback(() => {
      const {address} = params || {};
      if (address) {
        setState({address});
      }
    }, [params, setState]),
  );
  const {address} = state;
  const scanResult = useCallback(
    result => {
      setState({address: result});
    },
    [setState],
  );
  const rightElement = useMemo(() => {
    return (
      <AntDesign
        onPress={() =>
          navigationService.navigate('QRCodeScan', {scanResult: scanResult})
        }
        name="scan1"
        size={25}
        color={Colors.fontColor}
      />
    );
  }, [scanResult]);
  return (
    <Touchable
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('mineModule.transfer')} canBack />
      <View style={styles.box}>
        <TextL>收款地址</TextL>
        <Input
          value={address}
          onChangeText={value => setState({address: value})}
          rightElement={rightElement}
          placeholder={i18n.t('login.pleaseEnt')}
        />
      </View>
      <View style={styles.amountBox}>
        <TextL>转账金额</TextL>
        <Input
          style={styles.inputStyle}
          onChangeText={value => setState({address: value})}
          placeholder={i18n.t('login.pleaseEnt')}
        />
        <Input
          leftTitle="备注"
          style={styles.inputStyle}
          onChangeText={value => setState({address: value})}
          placeholder={'（选填）'}
        />
      </View>
      <View style={styles.amountBox}>
        <TextL>矿工费</TextL>
      </View>
    </Touchable>
  );
};

export default memo(Transfer);
const styles = StyleSheet.create({
  box: {
    padding: pTd(40),
    backgroundColor: 'white',
  },
  amountBox: {
    padding: pTd(40),
    backgroundColor: 'white',
    marginTop: pTd(20),
  },
  inputStyle: {
    paddingHorizontal: 0,
  },
});
