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

import {put, all, takeLatest, select, delay} from 'redux-saga/effects';
import userActions, {userTypes, userSelectors} from '../redux/userRedux';
import contractsActions from '../redux/contractsRedux';
import config from '../config';
import {removeDuplicates, isNumber} from '../utils/pages';
import {appInit, aelfInstance} from '../utils/common/aelfProvider';
import {format, formatRestore} from '../utils/common/address';
import navigationService from '../utils/common/navigationService';
import {Loading} from '../components/template';
import unitConverter from '../utils/pages/unitConverter';
const {tokenSymbol} = config;
function* getUserBalanceSaga() {
  try {
    const userInfo = yield select(userSelectors.getUserInfo);
    const {address, contracts, privateKey} = userInfo;
    if (address && privateKey) {
      if (
        contracts &&
        contracts.tokenContract &&
        contracts.tokenContract.GetBalance
      ) {
        const {tokenContract} = contracts;
        const balance = yield tokenContract.GetBalance.call({
          symbol: tokenSymbol,
          owner: formatRestore(address),
        });
        const confirmBlance = unitConverter.toLower(balance.balance);
        if (userInfo.balance !== confirmBlance) {
          yield put(
            userActions.setUserBalance(
              isNumber(confirmBlance) ? confirmBlance : 0,
            ),
          );
        }
      } else {
        console.log(userInfo, '=======userInfo');
        const contract = yield appInit(privateKey);
        console.log(contract, '========contract');
        yield put(contractsActions.setContracts({contracts: contract}));
        yield put(userActions.getUserBalance());
      }
    }
  } catch (error) {
    console.log(error, 'getUserBalanceSaga');
  }
}
function* onLoginSuccessSaga({data}) {
  try {
    data.address = format(data.address);
    let userList = [];
    const List = yield select(userSelectors.getUserList);
    if (Array.isArray(List)) {
      userList = [...List];
    }
    const userObj = {
      keystore: data.keystore,
      saveQRCode: data.saveQRCode,
      userName: data.userName,
      address: data.address,
      balance: data.balance,
      privateKey: data.privateKey,
    };
    userList.unshift(userObj);
    userList = removeDuplicates(userList);
    const contractsObj = {
      contracts: data.contracts,
    };
    yield put(userActions.setUserData({...userObj, userList}));
    yield put(contractsActions.setContracts(contractsObj));
  } catch (error) {
    console.log(error, 'onLoginSuccessSaga');
  }
}
function* deleteUserSaga({address}) {
  try {
    let List = [...(yield select(userSelectors.getUserList))];
    List.splice(List.findIndex(item => item.address === address), 1);
    yield put(userActions.setUserList(List));
  } catch (error) {
    console.log(error, 'deleteUserSaga');
  }
}
function* logOutSaga({address}) {
  console.log(address, '=====address');
  try {
    const userObj = {
      keystore: null,
      saveQRCode: null,
      userName: null,
      address: null,
      balance: null,
      privateKey: null,
    };
    const contractsObj = {
      contracts: {},
    };
    yield put(userActions.deleteUser(address));
    yield put(userActions.setUserData(userObj));
    yield put(contractsActions.setContracts(contractsObj));
    navigationService.reset('Entrance');
  } catch (error) {
    console.log(error, 'logOutSaga');
  }
}
function* transferSaga({param}) {
  try {
    console.log(param);
    const {contracts} = yield select(userSelectors.getUserInfo);
    const transaction = yield contracts.tokenContract.Transfer(param);
    console.log('transaction: ', transaction);
    const result = yield aelfInstance.chain.getTxResult(
      transaction.TransactionId,
    );
    console.log('transaction result:', result);
    yield delay(2000);
    Loading.hide();
    yield put(userActions.getUserBalance());
    navigationService.navigate('TransactionDetails', {
      TransactionId: transaction.TransactionId,
    });
  } catch (error) {}
}
export default function* LoginSaga() {
  yield all([
    yield takeLatest(userTypes.GET_USER_BALANCE, getUserBalanceSaga),
    yield takeLatest(userTypes.ON_LOGIN_SUCCESS, onLoginSuccessSaga),
    yield takeLatest(userTypes.DELETE_USER, deleteUserSaga),
    yield takeLatest(userTypes.LOG_OUT, logOutSaga),
    yield takeLatest(userTypes.TRANSFER, transferSaga),
  ]);
}
