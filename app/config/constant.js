const ADVANCED = true; // Whether to enable the advanced account function
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/;
const USERNAME_REG = /^[a-zA-Z0-9]+$/;
const DEFAULT_CURRENCY = 'CNY';
const SECURITY_TIME = 300000; //Security lock time 5 minutes by default
//https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
const ISO_COUNTRY_CODE_BLACK_LIST = ['CN'];
export {
  ADVANCED,
  PASSWORD_REG,
  USERNAME_REG,
  DEFAULT_CURRENCY,
  SECURITY_TIME,
  ISO_COUNTRY_CODE_BLACK_LIST,
};
