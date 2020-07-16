import React, {memo, useRef, useCallback, useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import GStyle from '../../../../assets/theme/gStyle';
import {
  CommonHeader,
  CommonButton,
  MyQRCode,
  CommonToast,
} from '../../../../components/template';
import styles from './styles';
import {screenshots} from '../../../../utils/pages';
import navigationService from '../../../../utils/common/navigationService';
import i18n from 'i18n-js';
import userActions, {userSelectors} from '../../../../redux/userRedux';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {TextTitle, TextM} from '../../../../components/template/CommonText';
import {settingsSelectors} from '../../../../redux/settingsRedux';
const GenerateQRCode = props => {
  const dispatch = useDispatch();
  const setSaveQRCode = useCallback(
    value => dispatch(userActions.setSaveQRCode(value)),
    [dispatch],
  );
  const {userName, keystore} = useSelector(
    userSelectors.getUserInfo,
    shallowEqual,
  );
  const payPw = useSelector(settingsSelectors.getPayPw, shallowEqual);
  const viewShot = useRef();
  const next = useCallback(async () => {
    const result = await screenshots(viewShot);
    if (result) {
      CommonToast.success('保存成功');
      setSaveQRCode(true);
      if (payPw && payPw.length === 6) {
        navigationService.reset('Tab');
      } else {
        navigationService.navigate('SetTransactionPwd');
      }
    }
  }, [payPw, setSaveQRCode]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  const rightOnPress = useCallback(() => {
    if (payPw && payPw.length === 6) {
      navigationService.reset('Tab');
    } else {
      navigationService.navigate('SetTransactionPwd');
    }
  }, [payPw]);
  const QRCodeValue = keystore ? JSON.stringify(keystore) : null;
  return (
    <View style={GStyle.container}>
      <CommonHeader
        style={styles.headerStyle}
        title={i18n.t('login.backupQRCode.title')}
        rightTitle={i18n.t('login.backupQRCode.later')}
        rightOnPress={rightOnPress}>
        <View style={styles.nameBox}>
          <TextTitle style={styles.account}>Account:{userName} </TextTitle>
          {/* <TextL style={styles.address}>Address:{userInfo.address} </TextL> */}
        </View>
        <View ref={viewShot} style={styles.shotView}>
          <MyQRCode value={QRCodeValue} />
        </View>
        <CommonButton
          disabled={!QRCodeValue}
          style={styles.buttonBox}
          title={i18n.t('login.backupQRCode.saveQRCode')}
          onPress={next}
        />
        <TextM style={styles.tips}>
          此二维码是您的账号，丢失二维码等同于丢失账号，您的资产将无法找回，请务必妥善保管您的二维码账号
        </TextM>
      </CommonHeader>
    </View>
  );
};
export default memo(GenerateQRCode);
