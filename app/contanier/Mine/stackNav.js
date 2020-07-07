import PersonalCenter from './PersonalCenter';
import EditUserName from './EditUserName';
import SecurityCenter from './SecurityCenter';
import PaymentSettings from './PaymentSettings';
import ChangePaymentPsw from './ChangePaymentPsw';
import SecondChangePaymentPsw from './SecondChangePaymentPsw';
const stackNav = [
  {name: 'PersonalCenter', component: PersonalCenter},
  {name: 'EditUserName', component: EditUserName},
  {name: 'SecurityCenter', component: SecurityCenter},
  {name: 'PaymentSettings', component: PaymentSettings},
  {name: 'ChangePaymentPsw', component: ChangePaymentPsw},
  {name: 'SecondChangePaymentPsw', component: SecondChangePaymentPsw},
];

export default stackNav;
