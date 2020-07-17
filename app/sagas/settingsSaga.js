/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite glitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import {all, takeLatest} from 'redux-saga/effects';
import {settingsTypes} from '../redux/settingsRedux';
import * as Location from 'expo-location';
import {permissionDenied} from '../utils/pages';
import i18n from 'i18n-js';
import {ISO_COUNTRY_CODE_BLACK_LIST} from '../config/constant';
import {ActionSheet} from '../components/template';
function* getLocationSaga() {
  if (!Array.isArray(ISO_COUNTRY_CODE_BLACK_LIST)) {
    return;
  }
  try {
    const {status} = yield Location.requestPermissionsAsync();
    if (status !== 'granted') {
      return permissionDenied(i18n.t('permission.getLocation'));
    }
    const location = yield Location.getCurrentPositionAsync({});
    const {coords} = location;
    const geocode = yield Location.reverseGeocodeAsync(coords);
    const {isoCountryCode} = geocode[0] || {};
    console.log(geocode, '=====geocode');
    if (ISO_COUNTRY_CODE_BLACK_LIST.includes(isoCountryCode)) {
      ActionSheet.alert(
        i18n.t('safetyReminder'),
        i18n.t('alert.locationTips'),
        [{title: i18n.t('determine')}],
      );
    }
  } catch (error) {
    console.log('getLocationSaga', error);
  }
}
export default function* SettingsSaga() {
  yield all([yield takeLatest(settingsTypes.GET_LOCATION, getLocationSaga)]);
}
