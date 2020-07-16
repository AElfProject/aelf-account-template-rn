import React, {memo, useMemo, useCallback, useRef} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {GStyle, Colors} from '../../../../assets/theme';
import {
  CommonHeader,
  Input,
  Touchable,
  CommonButton,
  CommonToast,
  Loading,
} from '../../../../components/template';
import i18n from 'i18n-js';
import {TextL, TextM} from '../../../../components/template/CommonText';
import {pTd} from '../../../../utils/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import navigationService from '../../../../utils/common/navigationService';
import {useSetState} from '../../../../utils/pages/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {userSelectors} from '../../../../redux/userRedux';
import config from '../../../../config';
import userActions from '../../../../redux/userRedux';
import TransactionVerification from '../../../../utils/pages/TransactionVerification';
import unitConverter from '../../../../utils/pages/unitConverter';
import aelfUtils from '../../../../utils/pages/aelfUtils';
const {tokenSymbol} = config;
const Transfer = props => {
  const input = useRef();
  const {params} = props.route || {};
  const [state, setState] = useSetState({
    address: '',
    amount: '',
  });
  const dispatch = useDispatch();
  const userInfo = useSelector(userSelectors.getUserInfo, shallowEqual);
  const transfer = useCallback(value => dispatch(userActions.transfer(value)), [
    dispatch,
  ]);
  const {balance} = userInfo;
  useFocusEffect(
    useCallback(() => {
      const {address} = params || {};
      if (address) {
        setState({address: aelfUtils.formatAddress(address)});
      }
    }, [params, setState]),
  );
  const {address, amount} = state;
  const rightElement = useMemo(() => {
    return (
      <AntDesign
        onPress={() =>
          navigationService.navigate('QRCodeScan', {scanResult: true})
        }
        name="scan1"
        size={25}
        color={Colors.fontColor}
      />
    );
  }, []);
  const onTransfer = useCallback(() => {
    if (amount && address) {
      TransactionVerification.show(value => {
        if (value) {
          Loading.show();
          transfer({
            symbol: tokenSymbol,
            to: address,
            amount: unitConverter.toHigher(amount),
            memo: input.current,
          });
        }
      });
    } else {
      CommonToast.text('请输入金额/地址');
    }
  }, [address, amount, transfer]);
  const onChangeAmount = useCallback(
    value => {
      value = value.match(/\d/g, '') ? value.match(/\d/g, '').join('') : '';
      if (value > balance) {
        CommonToast.text(`当前可用余额为${balance} ${tokenSymbol}`);
        setState({amount: String(balance)});
      } else {
        setState({amount: value});
      }
    },
    [balance, setState],
  );
  return (
    <Touchable
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
      style={GStyle.secondContainer}>
      <CommonHeader title={i18n.t('mineModule.transfer')} canBack>
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
          <View style={styles.rowBox}>
            <TextL>转账金额</TextL>
            <TextM style={styles.colorStyle}>
              余额:{balance} {tokenSymbol}
            </TextM>
          </View>
          <Input
            value={amount}
            style={styles.inputStyle}
            onChangeText={onChangeAmount}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          <Input
            leftTitle="备注"
            onChangeText={value => (input.current = value)}
            placeholder={'(选填)'}
          />
        </View>
        <View style={[styles.amountBox, styles.rowBox]}>
          <TextL>矿工费</TextL>
          <TextM style={styles.colorStyle}>≈ 0.027 {tokenSymbol}</TextM>
        </View>
        <CommonButton
          onPress={onTransfer}
          style={styles.buttonBox}
          title={i18n.t('mineModule.transfer')}
        />
      </CommonHeader>
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
  rowBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorStyle: {
    color: Colors.fontColor,
  },
  buttonBox: {
    marginTop: pTd(200),
  },
});
