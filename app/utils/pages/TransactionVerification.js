import {touchAuth} from '.';
import {VerifyPassword, CommonToast} from '../../components/template';
import reduxUtils from './reduxUtils';
const show = callBack => {
  const {settings} = reduxUtils.getState() || {};
  const {biometrics, payPw} = settings || {};
  console.log(settings, '=====settings');
  if (!payPw || payPw.length !== 6) {
    CommonToast.fail('还没有设置交易密码，请先去设置支付密码');
    return;
  }
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
