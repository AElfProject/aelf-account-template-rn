import React, {memo, useCallback} from 'react';
import {View, Keyboard} from 'react-native';
import GStyle from '../../../assets/theme/gStyle';
import {
  CommonHeader,
  CommonButton,
  Input,
  Touchable,
} from '../../../components';
import i18n from 'i18n-js';
import {TextL, TextM} from '../../../components/CommonText';
import styles from './styles';
import {useSetState} from '../../util/hooks';
import {PASSWORD_REG} from '../../../config';
import navigationService from '../../../utils/navigationService';
const EnterPassword = props => {
  const [state, setState] = useSetState({psw: '', pswRule: false});
  const {params} = props.route;
  const pswBlur = useCallback(() => {
    const {psw} = state;
    if (!PASSWORD_REG.test(psw)) {
      setState({pswRule: true});
    } else {
      setState({pswRule: false});
    }
  }, [setState, state]);
  const login = useCallback(() => {
    navigationService.navigate('SetTransactionPsw');
  }, []);
  const {pswRule} = state;
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
          leftTitle={i18n.t('login.psw')}
          onBlur={pswBlur}
          onChangeText={psw => setState({psw})}
          placeholder={i18n.t('login.pleaseEnt')}
        />
        {pswRule && (
          <TextM style={GStyle.pswTip}>{i18n.t('login.pswFormatErr')}</TextM>
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
