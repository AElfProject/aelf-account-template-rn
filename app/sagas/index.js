import {fork, all} from 'redux-saga/effects';
import userSaga from './userSaga';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([userSaga].map(fork));
}
