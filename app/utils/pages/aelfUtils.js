import AElf from 'aelf-sdk';
import config from '../../config';
import unitConverter from './unitConverter';
const {explorerURL, address} = config;
const {prefix, suffix} = address;

const unlockKeystore = (params, pwd) => {
  return AElf.wallet.keyStore.unlockKeystore(params, pwd);
};
const checkPassword = (keyStore, pwd) => {
  return AElf.wallet.keyStore.checkPassword(keyStore, pwd);
};
const getTransactionFee = Logs => {
  const free = AElf.pbUtils.getTransactionFee(Logs || []);
  let cost = 0;
  let symbol = '';
  Array.isArray(free) &&
    free.filter(item => {
      cost = cost + item.amount;
      symbol = item.symbol;
    });
  cost = unitConverter.toLower(cost);
  return {cost, symbol};
};
const getKeystore = (params, pwd, keystoreOptions) => {
  return AElf.wallet.keyStore.getKeystore(params, pwd, keystoreOptions);
};
const formatRestoreAddress = addressInput => {
  if (!addressInput) {
    return;
  }
  const head = `${prefix}_`;
  const tail = `_${suffix}`;
  return addressInput
    .replace(new RegExp(head, 'g'), '')
    .replace(new RegExp(tail, 'g'), '');
};
const formatAddress = addressInput => {
  if (!addressInput) {
    return;
  }
  addressInput = formatRestoreAddress(addressInput);
  return prefix + '_' + addressInput + '_' + suffix;
};

const webURLAddress = addressInput => {
  if (!addressInput) {
    return;
  }
  addressInput = formatRestoreAddress(addressInput);
  return `${explorerURL}/address/${addressInput}`;
};

const webURLTx = addressInput => {
  if (!addressInput) {
    return;
  }
  addressInput = formatRestoreAddress(addressInput);
  return `${explorerURL}/tx/${addressInput}`;
};

export default {
  checkPassword,
  webURLAddress,
  formatAddress,
  formatRestoreAddress,
  webURLTx,
  getTransactionFee,
  getKeystore,
  unlockKeystore,
};
