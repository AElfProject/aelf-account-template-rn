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
  const [state, setState] = useSetState({pw: '', pwRule: false});
  const {params} = props.route;
  const pwBlur = useCallback(() => {
    const {pw} = state;
    if (!PASSWORD_REG.test(pw)) {
      setState({pwRule: true});
    } else {
      setState({pwRule: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.navigate('SetTransactionPw');
  }, []);
  const {pwRule} = state;
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
          leftTitle={i18n.t('login.pw')}
          onBlur={pwBlur}
          onChangeText={pw => setState({pw})}
          placeholder={i18n.t('login.pleaseEnt')}
        />
        {pwRule && (
          <TextM style={GStyle.pwTip}>{i18n.t('login.pwFormatErr')}</TextM>
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
