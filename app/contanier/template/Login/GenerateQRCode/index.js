import React, {memo, useRef, useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import GStyle from '../../../../assets/theme/gStyle';
import {
  CommonHeader,
  CommonButton,
  MyQRCode,
} from '../../../../components/template';
import styles from './styles';
import {screenshots} from '../../../../utils/pages';
import navigationService from '../../../../utils/common/navigationService';
import i18n from 'i18n-js';
import {isIos} from '../../../../utils/common/device';
import config from '../../../../config';
import AElf from 'aelf-sdk';
import userActions, {userSelectors} from '../../../../redux/userRedux';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {appInit} from '../../../../utils/common/aelfProvider';
import {
  TextTitle,
  TextL,
  TextM,
} from '../../../../components/template/CommonText';
const GenerateQRCode = props => {
  const dispatch = useDispatch();
  const onLoginSuccess = useCallback(
    data => dispatch(userActions.onLoginSuccess(data)),
    [dispatch],
  );
  const userInfo = useSelector(userSelectors.getUserInfo, shallowEqual);
  const {params} = props.route || {};
  const viewShot = useRef();
  const [QRCodeValue, setQRCodeValue] = useState(false);
  const generateKeystore = useCallback(async () => {
    try {
      var newWallet = params.wallet;
      const keystoreCustomOptions = isIos
        ? config.keystoreOptions.ios
        : config.keystoreOptions.android;
      const keyStore = JSON.stringify(
        AElf.wallet.keyStore.getKeystore(
          {
            mnemonic: newWallet.mnemonic,
            privateKey: newWallet.privateKey,
            address: newWallet.address,
            nickName: params.userName,
          },
          params.pwd,
          keystoreCustomOptions,
        ),
      );
      setQRCodeValue(keyStore);
      return {privateKey: newWallet.privateKey, address: newWallet.address};
    } catch (error) {
      console.log(error, '======error');
      return false;
    }
  }, [params.pwd, params.userName, params.wallet]);
  useEffect(() => {
    Promise.resolve()
      .then(res => {
        return generateKeystore();
      })
      .then(async data => {
        if (data) {
          const contracts = await appInit(data.privateKey);
          return onLoginSuccess({
            contracts: contracts,
            address: data.address,
            keystore: data,
            userName: params.userName,
            balance: 0,
            privateKey: data.privateKey,
          });
        }
      })
      .then(res => {
        return 0;
      });
  }, [generateKeystore, onLoginSuccess, params.userName]);
  const next = useCallback(async () => {
    const result = await screenshots(viewShot);
    if (result) {
      setTimeout(() => {
        navigationService.navigate('SetTransactionPwd');
      }, 100);
    }
  }, []);
  return (
    <View style={GStyle.container}>
      <CommonHeader
        style={styles.headerStyle}
        title={i18n.t('login.backupQRCode.title')}
        canBack
        rightTitle={i18n.t('login.backupQRCode.later')}
        rightOnPress={() => navigationService.navigate('SetTransactionPwd')}>
        <View style={styles.nameBox}>
          <TextTitle style={styles.account}>
            Account:{params.userName}{' '}
          </TextTitle>
          <TextL style={styles.address}>Address:{userInfo.address} </TextL>
        </View>
        <View ref={viewShot} style={styles.shotView}>
          <MyQRCode value={QRCodeValue} />
        </View>
        <CommonButton
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
