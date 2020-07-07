import {StyleSheet} from 'react-native';
import {pTd} from '../../../utils';

export default StyleSheet.create({
  input: {
    paddingHorizontal: pTd(20),
    marginTop: pTd(20),
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  tips: {
    padding: pTd(20),
    marginBottom: pTd(30),
    color: '#999',
  },
});
