import config from '../../config';
const {address} = config;
const {prefix, suffix} = address;

const format = addressInput => {
  return prefix + '_' + addressInput + '_' + suffix;
};
const formatRestore = addressInput => {
  const head = `${prefix}_`;
  const tail = `_${suffix}`;
  return addressInput.replace(head, '').replace(tail, '');
};
export {format, formatRestore};
