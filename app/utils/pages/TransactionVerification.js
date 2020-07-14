import {store} from '../../redux';
import {touchAuth} from '.';
import {VerifyPassword} from '../../components/template';
const show = callBack => {
  const {settings} = store.getState() || {};
  const {biometrics} = settings || {};
  if (biometrics) {
    touchAuth()
      .then(() => {
        callBack && callBack(true);
      })
      .catch(() => VerifyPassword.payShow(callBack));
  } else {
    VerifyPassword.payShow(callBack);
  }
};
export default {
  show,
};
