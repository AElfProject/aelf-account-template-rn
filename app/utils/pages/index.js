import {Platform, PermissionsAndroid, Linking} from 'react-native';
import {download, saveFilePath} from './utilFs';
import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import {CommonToast, ActionSheet} from '../../components/template';
import i18n from 'i18n-js';
import * as LocalAuthentication from 'expo-local-authentication';
import {isIos} from '../../utils/common/device';
module.exports.sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
//Is it a number
const isNumber = val => {
  try {
    var regPos = /^\d+(\.\d+)?$/; //Integer
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //Floating point
    return regPos.test(val) || regNeg.test(val);
  } catch (error) {
    return false;
  }
};
//Save pictures to album
const saveImagesToAlbum = FilePath => {
  CameraRoll.save(FilePath, {type: 'photo'})
    .then(() => {
      CommonToast.success(i18n.t('saveSuc'));
    })
    .catch(() => {
      CommonToast.fail(i18n.t('fail'));
    });
};
//Check before saving pictures to album
const checkImageToAlbum = async url => {
  if (Platform.OS === 'android') {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      const granteds = await PermissionsAndroid.requestMultiple(permissions);
      if (
        granteds['android.permission.CAMERA'] === 'granted' &&
        granteds['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        if (typeof url === 'string' && url.includes('http')) {
          const downFilePath = saveFilePath(new Date().getTime() + '.png');
          download(url, downFilePath).then(() => {
            saveImagesToAlbum('file://' + downFilePath);
          });
        } else {
          saveImagesToAlbum('file://' + url);
        }
      } else {
        CommonToast.fail(i18n.t('permissionDen'));
      }
    } catch (err) {
      CommonToast.fail(i18n.t('fail'));
    }
  } else {
    saveImagesToAlbum(url);
  }
};
const screenshots = saveView => {
  if (saveView) {
    captureRef(saveView, {format: 'jpg'})
      .then(uri => {
        if (uri) {
          checkImageToAlbum(uri);
        }
      })
      .catch(e => {
        CommonToast.fail(i18n.t('fail'));
      });
  }
};
/* Biometrics */
const touchAuth = () => {
  const options = {
    hintMessage: 'Verify your identity',
    fallbackLabel: 'Use password',
    promptMessage: 'Aelf Authenticate',
  };
  return new Promise((resolve, reject) => {
    LocalAuthentication.isEnrolledAsync()
      .then(() => {
        LocalAuthentication.authenticateAsync(options)
          .then(suc => {
            const {success} = suc;
            if (success) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(error => {
            reject();
          });
      })
      .catch(error => {
        reject();
      });
  });
};
/**
 * permissionDenied
 * @param {string} permissionType  permission type
 * @param {string} use   used for
 */
const permissionDenied = (type, use) => {
  if (isIos) {
    ActionSheet.alert(
      i18n.t('permission.denied'),
      `${i18n.t('permission.iosDeniedDetails', {type})}${use ? ',' + use : ''}`,
      [
        {
          title: i18n.t('permission.openSettings'),
          onPress: () =>
            Linking.openURL('app-settings:').catch(e => {
              ActionSheet.alert(
                i18n.t('permission.openFailed'),
                i18n.t('permission.failedDetails', {type}),
                [{title: i18n.t('determine')}],
              );
            }),
        },
      ],
    );
  } else {
    ActionSheet.alert(
      i18n.t('permission.denied'),
      `${i18n.t('permission.anDeniedDetails', {type})}${use ? ',' + use : ''}`,
      [{title: i18n.t('determine')}],
    );
  }
};
export {isNumber, screenshots, checkImageToAlbum, touchAuth, permissionDenied};
