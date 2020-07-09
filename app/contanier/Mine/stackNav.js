import PersonalCenter from './PersonalCenter';
import EditUserName from './PersonalCenter/EditUserName';

import Receive from './Receive';
import Transfer from './Transfer';

import SecurityCenter from './SecurityCenter';
import PaymentSettings from './SecurityCenter/PaymentSettings';
import ChangePaymentPsw from './SecurityCenter/ChangePaymentPsw';
import SecondChangePaymentPsw from './SecurityCenter/SecondChangePaymentPsw';

import GeneralSettings from './GeneralSettings';
import Language from './GeneralSettings/Language';
import CurrencyUnit from './GeneralSettings/CurrencyUnit';
import NetworkManagement from './GeneralSettings/NetworkManagement';

import AccountManagement from './AccountManagement';
import AboutUs from './AboutUs';
import HelpCenter from './HelpCenter';
import TransactionManagement from './TransactionManagement';
import AuthorizeManagement from './AuthorizeManagement';
const stackNav = [
  {name: 'PersonalCenter', component: PersonalCenter},
  {name: 'EditUserName', component: EditUserName},

  {name: 'Receive', component: Receive},
  {name: 'Transfer', component: Transfer},

  {name: 'SecurityCenter', component: SecurityCenter},
  {name: 'PaymentSettings', component: PaymentSettings},
  {name: 'ChangePaymentPsw', component: ChangePaymentPsw},
  {name: 'SecondChangePaymentPsw', component: SecondChangePaymentPsw},

  {name: 'GeneralSettings', component: GeneralSettings},
  {name: 'Language', component: Language},
  {name: 'CurrencyUnit', component: CurrencyUnit},
  {name: 'NetworkManagement', component: NetworkManagement},

  {name: 'AccountManagement', component: AccountManagement},
  {name: 'AboutUs', component: AboutUs},
  {name: 'HelpCenter', component: HelpCenter},
  {name: 'TransactionManagement', component: TransactionManagement},
  {name: 'AuthorizeManagement', component: AuthorizeManagement},
];

export default stackNav;