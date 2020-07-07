import React, {memo, useCallback, useMemo} from 'react';
import {View, StyleSheet, Keyboard, Text} from 'react-native';
import {GStyle, Colors} from '../../../assets/theme';
import {
  CommonHeader,
  Password,
  CommonToast,
  Touchable,
  Input,
  CommonButton,
} from '../../../components';
import {TextM} from '../../../components/CommonText';
import {pTd} from '../../../utils';
import navigationService from '../../../utils/navigationService';
import {useSetState} from '../../util/hooks';
import settingsActions, {settingsSelectors} from '../../../redux/settingsRedux';
import i18n from 'i18n-js';
import {useDispatch, useSelector} from 'react-redux';
import {passwordReg} from '../../../config';
const SecondChangePaymentPsw = props => {
  const {remember} = props.route.params || {};
  const dispatch = useDispatch();
  const [state, setState] = useSetState({
    tip: '输入当前身份密码，以验证身份',
    type: 'verificationPsw',
    transactionPsw: '',
    transactionPswConfirm: '',
    psw: '',
    pswRule: null,
  });
  const changePayPsw = useCallback(
    payPsw => dispatch(settingsActions.changePayPsw(payPsw)),
    [dispatch],
  );
  const payPsw = useSelector(settingsSelectors.getPayPsw);

  const {tip, type, transactionPsw, psw, pswRule} = state;
  const onChange = useCallback(
    (types, text) => {
      setState({[types]: text});
      if (text.length === 6) {
        switch (types) {
          case 'verificationPsw':
            if (payPsw === text) {
              setState({
                type: 'transactionPsw',
                tip: i18n.t('setPsw.setPsw1'),
              });
            } else {
              CommonToast.fail('密码错误');
            }
            break;
          case 'transactionPsw':
            setState({
              type: 'transactionPswConfirm',
              tip: i18n.t('setPsw.setPsw2'),
            });
            break;
          case 'transactionPswConfirm':
            if (text === transactionPsw) {
              CommonToast.success(i18n.t('setSuc'));
              changePayPsw(text);
              navigationService.pop(2);
            } else {
              CommonToast.fail(i18n.t('setPsw.pswInconsistent'));
            }
            break;
        }
      }
    },
    [changePayPsw, setState, transactionPsw, payPsw],
  );
  const pswBlur = useCallback(() => {
    const re = passwordReg;
    if (!re.test(psw)) {
      setState({pswRule: true});
    } else {
      setState({pswRule: false});
    }
  }, [setState, psw]);
  const next = useCallback(() => {
    if (passwordReg.test(psw)) {
      setState({
        type: 'transactionPsw',
        tip: i18n.t('setPsw.setPsw1'),
      });
    } else {
      CommonToast.fail(i18n.t('login.pswFormatErr'));
    }
  }, [setState, psw]);
  const Components = useMemo(() => {
    if (type !== 'verificationPsw' || remember) {
      return (
        <View style={styles.box}>
          <TextM style={{color: Colors.primaryColor}}>{tip}</TextM>
          <Password
            maxLength={6}
            key={type}
            style={GStyle.marginArg(pTd(50), 0, pTd(30), 0)}
            onChange={value => onChange(type, value)}
          />
        </View>
      );
    } else {
      return (
        <Touchable
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
          style={styles.container}>
          <Text style={styles.nickNameStyles}>请输入账户的密码</Text>
          <Input
            secureTextEntry={true}
            leftTitleBox={styles.leftTitleBox}
            leftTextStyle={styles.leftTextStyle}
            leftTitle={i18n.t('login.psw')}
            onBlur={pswBlur}
            onChangeText={value => setState({psw: value})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pswRule && (
            <TextM style={GStyle.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
          )}
          <CommonButton
            onPress={next}
            style={styles.buttonStyles}
            title={'下一步'}
          />
          <TextM style={styles.bottomTip}>
            * 以上内容仅用于验证身份，APP不存储密码
          </TextM>
        </Touchable>
      );
    }
  }, [next, onChange, pswBlur, pswRule, remember, setState, tip, type]);
  return (
    <View style={GStyle.container}>
      <CommonHeader title="修改支付密码" canBack />
      {Components}
    </View>
  );
};

export default memo(SecondChangePaymentPsw);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: pTd(50),
    flexDirection: 'column',
    paddingHorizontal: pTd(50),
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: pTd(100),
  },
  nickNameStyles: {
    color: Colors.fontColor,
  },
  leftTitleBox: {
    paddingTop: 15,
    height: 65,
  },
  leftTextStyle: {
    width: 80,
  },
  buttonStyles: {
    marginTop: pTd(50),
    width: '100%',
  },
  bottomTip: {
    marginTop: pTd(20),
    color: '#999',
  },
});
