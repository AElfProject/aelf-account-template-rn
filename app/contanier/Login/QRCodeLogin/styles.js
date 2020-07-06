import {StyleSheet} from 'react-native';
import {pTd} from '../../../utils';

export default StyleSheet.create({
  border: {
    flex: 0,
    width: 196,
    height: 2,
    backgroundColor: '#817AFD',
    borderRadius: 50,
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10,
  },
  QRCodeBox: {
    flex: 1,
  },
  scanBox: {
    alignItems: 'center',
    marginTop: pTd(260),
  },
  scanBG: {
    width: 200,
    height: 200,
  },
});
