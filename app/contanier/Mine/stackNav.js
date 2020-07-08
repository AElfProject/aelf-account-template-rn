import PersonalCenter from './PersonalCenter';
import EditUserName from './EditUserName';
import SecurityCenter from './SecurityCenter';
import PaymentSettings from './SecurityCenter/PaymentSettings';
import ChangePaymentPsw from './SecurityCenter/ChangePaymentPsw';
import SecondChangePaymentPsw from './SecurityCenter/SecondChangePaymentPsw';
import GeneralSettings from './GeneralSettings';
import Language from './GeneralSettings/Language';
import CurrencyUnit from './GeneralSettings/CurrencyUnit';
import NetworkManagement from './GeneralSettings/NetworkManagement';
import Receive from './Receive';
const stackNav = [
  {name: 'PersonalCenter', component: PersonalCenter},
  {name: 'EditUserName', component: EditUserName},
  {name: 'SecurityCenter', component: SecurityCenter},
  {name: 'PaymentSettings', component: PaymentSettings},
  {name: 'ChangePaymentPsw', component: ChangePaymentPsw},
  {name: 'SecondChangePaymentPsw', component: SecondChangePaymentPsw},
  {name: 'GeneralSettings', component: GeneralSettings},
  {name: 'Language', component: Language},
  {name: 'CurrencyUnit', component: CurrencyUnit},
  {name: 'NetworkManagement', component: NetworkManagement},
  {name: 'Receive', component: Receive},
];

export default stackNav;
