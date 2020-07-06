import React, {useEffect, memo, useCallback, useRef} from 'react';
import {
  Text,
  View,
  default as Easing,
  ImageBackground,
  Animated,
  Vibration,
} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {GStyle} from '../../../assets/theme';
import {CommonHeader, CommonToast} from '../../../components';
import i18n from 'i18n-js';
import {iconScanRect} from '../../../assets/images/indes';
import styles from './styles';
import {useSetState} from '../../util/hooks';
import * as ImagePicker from 'expo-image-picker';
import navigationService from '../../../utils/navigationService';
const QRCodeLogin = () => {
  const intervalRef = useRef(null);
  const [state, setState] = useSetState({
    scanned: false,
    hasPermission: null,
    moveAnim: new Animated.Value(-2),
  });
  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setState({hasPermission: status === 'granted'});
    })();
    startAnimation();
    return () => {
      intervalRef.current && clearTimeout(intervalRef.current);
    };
  }, [setState, startAnimation]);
  const startAnimation = useCallback(() => {
    moveAnim.setValue(-2);
    Animated.sequence([
      Animated.timing(moveAnim, {
        toValue: 200,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: -1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => startAnimation());
  }, [moveAnim]);
  const {hasPermission, moveAnim, scanned} = state;
  /* 二维码扫描结果 */
  const onBarCodeRead = result => {
    try {
      Vibration.vibrate();
      setState({scanned: true});
      intervalRef.current = setTimeout(() => {
        setState({scanned: false});
      }, 10000);
      const {data} = result; //Determine whether to log in the QR code
      if (data && typeof data === 'string' && data.includes('aelf')) {
        CommonToast.success('成功');
        navigationService.navigate('EnterPassword', JSON.parse(data));
      } else {
        CommonToast.fail('Please use the login QR code');
      }
    } catch (error) {
      CommonToast.fail('Please use the login QR code');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  /* Identify QR code */
  const recoginze = async images => {
    try {
      const imageData = await BarCodeScanner.scanFromURLAsync(images.uri, [
        BarCodeScanner.Constants.BarCodeType.qr,
      ]);

      if (imageData.length) {
        onBarCodeRead(imageData[0]);
      } else {
        CommonToast.text('Image load failed.');
      }
    } catch {
      CommonToast.text('Image load failed.');
    }
  };
  /* Call album */
  const usePhotoAlbum = async () => {
    try {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const cameraRoll = await ImagePicker.requestCameraRollPermissionsAsync();
      if (camera.status !== 'granted' && cameraRoll.status !== 'granted') {
        CommonToast.text(
          'Sorry, we need camera roll permissions to make this work!',
        );
      } else {
        const images = await ImagePicker.launchImageLibraryAsync({
          allowMultipleSelection: false,
        });
        if (images.uri) {
          recoginze(images);
        } else {
          CommonToast.text('Image load failed.');
        }
      }
    } catch (err) {
      CommonToast.text('Image load failed.');
    }
  };

  return (
    <View style={GStyle.container}>
      <CommonHeader
        title={i18n.t('login.login')}
        canBack
        rightTitle={'相册'}
        rightOnPress={usePhotoAlbum}
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : onBarCodeRead}
        style={styles.QRCodeBox}>
        <View style={styles.scanBox}>
          <ImageBackground source={iconScanRect} style={styles.scanBG}>
            <Animated.View
              style={[
                styles.border,
                {transform: [{translateY: state.moveAnim}]},
              ]}
            />
          </ImageBackground>
          <Text style={styles.rectangleText}>Scan the QR code</Text>
        </View>
      </BarCodeScanner>
    </View>
  );
};

export default memo(QRCodeLogin);
