import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {
  CommonHeader,
  Input,
  CommonButton,
  CommonToast,
} from '../../../../../components/template';
import styles from './styles';
import {TextL} from '../../../../../components/template/CommonText';
import i18n from 'i18n-js';
import {USERNAME_REG} from '../../../../../config';
import {GStyle} from '../../../../../assets/theme';
const EditUserName = () => {
  const [name, setName] = useState('');
  const onPress = () => {
    if (USERNAME_REG.test(name)) {
    } else {
      CommonToast.fail(i18n.t('login.nameErr'));
    }
  };
  return (
    <View style={GStyle.secondContainer}>
      <CommonHeader title="编辑用户名" canBack />
      <Input
        style={styles.input}
        onChangeText={setName}
        placeholder={'User Name'}
      />
      <TextL style={styles.tips}>仅支持英文或数字</TextL>
      <CommonButton title="确定" onPress={onPress} />
    </View>
  );
};

export default memo(EditUserName);
