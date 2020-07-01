import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import i18n from 'i18n-js'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    changeLanguage: ['language']
})

export const settingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    language: null
})

/* ------------- Selectors ------------- */

const _baseSelector = state => state.settings

export const SettingsType = {
    getLanguage: createSelector(
        _baseSelector,
        base => base.language
    ),
}

/* ------------- Reducers ------------- */
export const changeLanguage = (state, { language }) => {
    i18n.switchLanguage(language)
    return state.merge({ language })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: changeLanguage,
})