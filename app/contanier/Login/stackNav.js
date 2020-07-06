import Regist from './Regist';
import Entrance from './Entrance';
import GenerateQRCode from './GenerateQRCode';
import SetTransactionPsw from './SetTransactionPsw';
import QRCodeLogin from './QRCodeLogin';
import EnterPassword from './EnterPassword';
const stackNav = [
  {name: 'Regist', component: Regist},
  {name: 'Entrance', component: Entrance},
  {name: 'GenerateQRCode', component: GenerateQRCode},
  {name: 'SetTransactionPsw', component: SetTransactionPsw},
  {name: 'QRCodeLogin', component: QRCodeLogin},
  {name: 'EnterPassword', component: EnterPassword},
];

export default stackNav;
