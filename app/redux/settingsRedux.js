import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {createSelector} from 'reselect';
import i18n from 'i18n-js';
/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  changeLanguage: ['language'],
  changeBarStyle: ['barStyle'],
  changePayPsw: ['payPsw'],
  changeBiometrics: ['biometrics'],
});

export const settingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  language: null,
  barStyle: null,
  payPsw: null,
  biometrics: null,
});

/* ------------- Selectors ------------- */

const _baseSelector = state => state.settings;

export const settingsSelectors = {
  getLanguage: createSelector(
    _baseSelector,
    base => base.language,
  ),
  getBarStyle: createSelector(
    _baseSelector,
    base => base.barStyle,
  ),
  getPayPsw: createSelector(
    _baseSelector,
    base => base.payPsw,
  ),
  getBiometrics: createSelector(
    _baseSelector,
    base => base.biometrics,
  ),
};

/* ------------- Reducers ------------- */
export const changeLanguage = (state, {language}) => {
  i18n.switchLanguage(language);
  return state.merge({language});
};
export const changeBarStyle = (state, {barStyle}) => {
  return state.merge({barStyle});
};
export const changePayPsw = (state, {payPsw}) => {
  return state.merge({payPsw});
};
export const changeBiometrics = (state, {biometrics}) => {
  return state.merge({biometrics});
};
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_LANGUAGE]: changeLanguage,
  [Types.CHANGE_BAR_STYLE]: changeBarStyle,
  [Types.CHANGE_PAY_PSW]: changePayPsw,
  [Types.CHANGE_BIOMETRICS]: changeBiometrics,
});
