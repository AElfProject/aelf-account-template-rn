import React, {memo, useCallback, useMemo} from 'react';
import {View, StyleSheet, Keyboard, Text} from 'react-native';
import {GStyle, Colors} from '../../../../../assets/theme';
import {
  CommonHeader,
  Password,
  CommonToast,
  Touchable,
  Input,
  CommonButton,
} from '../../../../../components/template';
import {TextM} from '../../../../../components/template/CommonText';
import {pTd} from '../../../../../utils/common';
import navigationService from '../../../../../utils/common/navigationService';
import {useSetState} from '../../../../../utils/pages/hooks';
import settingsActions, {
  settingsSelectors,
} from '../../../../../redux/settingsRedux';
import i18n from 'i18n-js';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {PASSWORD_REG} from '../../../../../config';
const SecondChangePaymentPw = props => {
  const {remember} = props.route.params || {};
  const dispatch = useDispatch();
  const [state, setState] = useSetState({
    tip: '输入当前身份密码，以验证身份',
    type: 'verificationPw',
    transactionPw: '',
    transactionPwConfirm: '',
    pw: '',
    pwRule: null,
  });
  const changePayPw = useCallback(
    payPw => dispatch(settingsActions.changePayPw(payPw)),
    [dispatch],
  );
  const payPw = useSelector(settingsSelectors.getPayPw, shallowEqual);

  const {tip, type, transactionPw, pw, pwRule} = state;
  const onChange = useCallback(
    (types, text) => {
      setState({[types]: text});
      if (text.length === 6) {
        switch (types) {
          case 'verificationPw':
            if (payPw === text) {
              setState({
                type: 'transactionPw',
                tip: i18n.t('setPw.setPw1'),
              });
            } else {
              CommonToast.fail('密码错误');
            }
            break;
          case 'transactionPw':
            setState({
              type: 'transactionPwConfirm',
              tip: i18n.t('setPw.setPw2'),
            });
            break;
          case 'transactionPwConfirm':
            if (text === transactionPw) {
              CommonToast.success(i18n.t('setSuc'));
              changePayPw(text);
              navigationService.pop(2);
            } else {
              CommonToast.fail(i18n.t('setPw.pwInconsistent'));
            }
            break;
        }
      }
    },
    [changePayPw, setState, transactionPw, payPw],
  );
  const pwBlur = useCallback(() => {
    if (!PASSWORD_REG.test(pw)) {
      setState({pwRule: true});
    } else {
      setState({pwRule: false});
    }
  }, [setState, pw]);
  const next = useCallback(() => {
    if (PASSWORD_REG.test(pw)) {
      setState({
        type: 'transactionPw',
        tip: i18n.t('setPw.setPw1'),
      });
    } else {
      CommonToast.fail(i18n.t('login.pwFormatErr'));
    }
  }, [setState, pw]);
  const Components = useMemo(() => {
    if (type !== 'verificationPw' || remember) {
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
            leftTitle={i18n.t('login.pw')}
            onBlur={pwBlur}
            onChangeText={value => setState({pw: value})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwFormatErr')}</TextM>
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
  }, [next, onChange, pwBlur, pwRule, remember, setState, tip, type]);
  return (
    <View style={GStyle.container}>
      <CommonHeader title="修改支付密码" canBack />
      {Components}
    </View>
  );
};

export default memo(SecondChangePaymentPw);
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
    color: Colors.fontGray,
  },
});
