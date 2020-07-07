import {StyleSheet} from 'react-native';
import {pTd} from '../../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
