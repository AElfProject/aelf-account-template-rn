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
import {PASSWORD_REG} from '../../../../../config/constant';
import aelfUtils from '../../../../../utils/pages/aelfUtils';
import {userSelectors} from '../../../../../redux/userRedux';
const SecondChangePaymentPwd = props => {
  const {remember} = props.route.params || {};
  const dispatch = useDispatch();
  const [state, setState] = useSetState({
    tip: '输入当前身份密码，以验证身份',
    type: 'verificationPwd',
    transactionPwd: '',
    transactionPwdConfirm: '',
    pwd: '',
    pwdRule: null,
  });
  const changePayPw = useCallback(
    payPw => dispatch(settingsActions.changePayPw(payPw)),
    [dispatch],
  );
  const payPw = useSelector(settingsSelectors.getPayPw, shallowEqual);
  const keystore = useSelector(userSelectors.getKeystore, shallowEqual);
  const {tip, type, transactionPwd, pwd, pwdRule} = state;
  const onChange = useCallback(
    (types, text) => {
      setState({[types]: text});
      if (text.length === 6) {
        switch (types) {
          case 'verificationPwd':
            if (payPw === text) {
              setState({
                type: 'transactionPwd',
                tip: i18n.t('setPwd.setPwd1'),
              });
            } else {
              CommonToast.fail('密码错误');
            }
            break;
          case 'transactionPwd':
            setState({
              type: 'transactionPwdConfirm',
              tip: i18n.t('setPwd.setPwd2'),
            });
            break;
          case 'transactionPwdConfirm':
            if (text === transactionPwd) {
              CommonToast.success(i18n.t('setSuc'));
              changePayPw(text);
              navigationService.pop(2);
            } else {
              CommonToast.fail(i18n.t('setPwd.pwdInconsistent'));
            }
            break;
        }
      }
    },
    [changePayPw, setState, transactionPwd, payPw],
  );
  const pwdBlur = useCallback(() => {
    if (!PASSWORD_REG.test(pwd)) {
      setState({pwdRule: true});
    } else {
      setState({pwdRule: false});
    }
  }, [setState, pwd]);
  const next = useCallback(() => {
    if (PASSWORD_REG.test(pwd)) {
      const checkResult = aelfUtils.checkPassword(keystore, pwd);
      if (checkResult) {
        setState({
          type: 'transactionPwd',
          tip: i18n.t('setPwd.setPwd1'),
        });
      } else {
        CommonToast.fail(i18n.t('accountPwdErr'));
      }
    } else {
      CommonToast.fail(i18n.t('login.pwdFormatErr'));
    }
  }, [pwd, keystore, setState]);
  const Components = useMemo(() => {
    if (type !== 'verificationPwd' || remember) {
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
            leftTitle={i18n.t('login.pwd')}
            onBlur={pwdBlur}
            onChangeText={value => setState({pwd: value})}
            placeholder={i18n.t('login.pleaseEnt')}
          />
          {pwdRule && (
            <TextM style={GStyle.pwTip}>{i18n.t('login.pwdFormatErr')}</TextM>
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
  }, [type, remember, tip, onChange, pwdBlur, pwdRule, next, setState]);
  return (
    <View style={GStyle.container}>
      <CommonHeader title="修改支付密码" canBack />
      {Components}
    </View>
  );
};

export default memo(SecondChangePaymentPwd);
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
