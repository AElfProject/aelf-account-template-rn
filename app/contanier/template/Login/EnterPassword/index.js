import React, {memo, useCallback} from 'react';
import {View, Keyboard} from 'react-native';
import GStyle from '../../../../assets/theme/gStyle';
import {
  CommonHeader,
  CommonButton,
  Input,
  Touchable,
} from '../../../../components/template';
import i18n from 'i18n-js';
import {TextL, TextM} from '../../../../components/template/CommonText';
import styles from './styles';
import {useSetState} from '../../../../utils/pages/hooks';
import {PASSWORD_REG} from '../../../../config/constant';
import navigationService from '../../../../utils/common/navigationService';
import AElf from 'aelf-sdk';
import {appInit} from '../../../../utils/common/aelfProvider';
import userActions from '../../../../redux/userRedux';
import {useDispatch} from 'react-redux';
const EnterPassword = props => {
  const dispatch = useDispatch();
  const [state, setState] = useSetState({
    pwd: '',
    pwdRule: false,
    loading,
    pwdErr: false,
  });
  const {pwd, loading, pwdErr} = state;
  const {params} = props.route;
  const onLoginSuccess = useCallback(
    data => dispatch(userActions.onLoginSuccess(data)),
    [dispatch],
  );
  const pwdBlur = useCallback(() => {
    if (!PASSWORD_REG.test(pwd)) {
      setState({pwdRule: true});
    } else {
      setState({pwdRule: false});
    }
  }, [setState, pwd]);
  const login = useCallback(async () => {
    setState({pwdErr: false, loading: true});
    try {
      const {privateKey} = AElf.wallet.keyStore.unlockKeystore(params, pwd);
      if (privateKey) {
        const contracts = await appInit(privateKey);
        onLoginSuccess({
          contracts: contracts,
          address: params.address,
          keystore: params,
          userName: params.nickName,
          balance: 0,
          saveQRCode: true,
          privateKey,
        });
        navigationService.navigate('SetTransactionPwd');
        setState({loading: false});
      }
    } catch (error) {
      console.log(error, '======error');
      setState({pwdErr: true, loading: false});
    }
  }, [onLoginSuccess, params, pwd, setState]);
  const {pwdRule} = state;
  if (!params) {
    return null;
  }
  return (
    <View style={GStyle.container}>
      <CommonHeader title={'输入密码'} canBack />
      <Touchable
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
        style={styles.container}>
        <TextL style={styles.nickNameStyles}>
          请输入账户{params.nickName}的密码
        </TextL>
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
        {pwdErr && <TextM style={GStyle.pwTip}>密码错误</TextM>}
        <CommonButton
          loading={loading}
          onPress={login}
          style={styles.buttonStyles}
          title={i18n.t('login.login')}
        />
      </Touchable>
    </View>
  );
};
export default memo(EnterPassword);
