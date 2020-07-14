import AElf from 'aelf-sdk';
const checkPassword = (keyStore, pwd) => {
  return AElf.wallet.keyStore.checkPassword(keyStore, pwd);
};

export default {
  checkPassword,
};
