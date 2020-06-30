import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setTest: ['test']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    test: 'default'
})

/* ------------- Selectors ------------- */

const _baseSelector = state => state.user

export const CommunicationType = {
    getTest: createSelector(
        _baseSelector,
        base => base.test
    ),
}

/* ------------- Reducers ------------- */
// set test
export const setTest = (state, { test }) => {
    return state.merge({ test })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_TEST]: setTest,
})