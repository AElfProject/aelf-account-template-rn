import Regist from './Regist';
import Entrance from './Entrance';
import GenerateQRCode from './GenerateQRCode';
import SetTransactionPsw from './SetTransactionPsw';
const stackNav = [
  { name: 'Regist', component: Regist },
  { name: 'Entrance', component: Entrance },
  { name: 'GenerateQRCode', component: GenerateQRCode },
  { name: 'SetTransactionPsw', component: SetTransactionPsw },
];

export default stackNav;