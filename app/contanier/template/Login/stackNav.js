import Registered from './Registered';
import Entrance from './Entrance';
import GenerateQRCode from './GenerateQRCode';
import SetTransactionPw from './SetTransactionPw';
import QRCodeScan from './QRCodeScan';
import EnterPassword from './EnterPassword';
import AdvancedLogin from './AdvancedLogin';
const stackNav = [
  {name: 'Registered', component: Registered},
  {name: 'Entrance', component: Entrance},
  {name: 'GenerateQRCode', component: GenerateQRCode},
  {name: 'SetTransactionPw', component: SetTransactionPw},
  {name: 'QRCodeScan', component: QRCodeScan},
  {name: 'EnterPassword', component: EnterPassword},
  {name: 'AdvancedLogin', component: AdvancedLogin},
];

export default stackNav;
