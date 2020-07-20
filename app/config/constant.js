const ADVANCED = true; // Whether to enable the advanced account function
const PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/;
const USERNAME_REG = /^[a-zA-Z0-9]+$/;
const DEFAULT_CURRENCY = 'CNY';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export {ADVANCED, PASSWORD_REG, USERNAME_REG, DEFAULT_CURRENCY, TIME_FORMAT};
