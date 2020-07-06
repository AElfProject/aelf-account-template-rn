import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {createSelector} from 'reselect';
import i18n from 'i18n-js';
/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  changeLanguage: ['language'],
  changeBarStyle: ['barStyle'],
});

export const settingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  language: null,
  barStyle: null,
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
};

/* ------------- Reducers ------------- */
export const changeLanguage = (state, {language}) => {
  i18n.switchLanguage(language);
  return state.merge({language});
};
export const changeBarStyle = (state, {barStyle}) => {
  return state.merge({barStyle});
};
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_LANGUAGE]: changeLanguage,
  [Types.CHANGE_BAR_STYLE]: changeBarStyle,
});
