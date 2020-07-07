const advanced = true; // Whether to enable the advanced account function
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/;
const usernameReg = /^[a-zA-Z0-9]+$/;
export {advanced, passwordReg, usernameReg};
