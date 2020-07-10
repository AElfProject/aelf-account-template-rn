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
import {PASSWORD_REG} from '../../../../config';
import navigationService from '../../../../utils/common/navigationService';
const EnterPassword = props => {
  const [state, setState] = useSetState({pwd: '', pwdRule: false});
  const {params} = props.route;
  const pwdBlur = useCallback(() => {
    const {pwd} = state;
    if (!PASSWORD_REG.test(pwd)) {
      setState({pwdRule: true});
    } else {
      setState({pwdRule: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.navigate('SetTransactionPwd');
  }, []);
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
          onChangeText={pwd => setState({pwd})}
          placeholder={i18n.t('login.pleaseEnt')}
        />
        {pwdRule && (
          <TextM style={GStyle.pwdTip}>{i18n.t('login.pwdFormatErr')}</TextM>
        )}
        <CommonButton
          onPress={login}
          style={styles.buttonStyles}
          title={i18n.t('login.login')}
        />
      </Touchable>
    </View>
  );
};
export default memo(EnterPassword);
